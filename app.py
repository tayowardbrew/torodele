"""Minimal Flask backend for Torito (DELE B2 oral practice).

The app itself is a static HTML/CSS/JS site. This tiny server exists for ONE
reason: to proxy the Gemini speech-grading call server-side so the API key is
never shipped to the browser. Everything else (onboarding, recording, reading
comprehension, progress) still runs entirely client-side in localStorage.

Run:  python3 app.py        (serves on http://127.0.0.1:5001)
Deps: Flask only (see requirements.txt). Gemini is called via stdlib urllib in
grade.py — no other third-party dependency.

If you prefer to keep this fully static (no server), you can still open
index.html directly from disk; AI grading simply soft-fails to the existing
self-assessment rubric when it can't reach /api/grade.
"""
import os
import json
import time
from flask import Flask, request, jsonify, send_from_directory, abort

import grade

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Simple daily cap on AI-graded calls, independent of the basic-auth layer in
# front of this deploy. Defense in depth: if the URL/password ever leaked,
# this stops a runaway/abusive loop from burning through the Gemini quota.
_RATE_LIMIT_FILE = os.path.join(BASE_DIR, ".rate_limit.json")
_DAILY_CAP = 60


def _check_and_bump_rate_limit():
    """Returns True if under the daily cap (and bumps the counter), False if
    the cap's been hit for today."""
    today = time.strftime("%Y-%m-%d")
    state = {"date": today, "count": 0}
    try:
        with open(_RATE_LIMIT_FILE, "r", encoding="utf-8") as fh:
            saved = json.load(fh)
        if saved.get("date") == today:
            state = saved
    except (FileNotFoundError, json.JSONDecodeError):
        pass
    if state["count"] >= _DAILY_CAP:
        return False
    state["count"] += 1
    with open(_RATE_LIMIT_FILE, "w", encoding="utf-8") as fh:
        json.dump(state, fh)
    return True


def _load_dotenv():
    """Minimal .env loader (no external dependency), identical pattern to the
    sibling networking-CRM project. Reads KEY=VALUE lines from the project-root
    .env into os.environ. The Gemini key lives ONLY in that gitignored file and
    is read server-side; it is never sent to the client."""
    path = os.path.join(BASE_DIR, ".env")
    try:
        with open(path, "r", encoding="utf-8") as fh:
            for line in fh:
                line = line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))
    except FileNotFoundError:
        pass  # No .env -> AI grading soft-fails, self-assessment rubric still works.


_load_dotenv()

app = Flask(__name__)
# Spoken answers are short; cap the upload to keep a stray huge body from hanging.
app.config["MAX_CONTENT_LENGTH"] = 25 * 1024 * 1024  # 25 MB

# Files we are willing to serve from the project root (the static site).
_STATIC_FILES = {
    "index.html", "styles.css", "app.js", "prompts.js", "articles.js",
    "README.md",
}


@app.route("/")
def index():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/<path:filename>")
def static_root(filename):
    """Serve the flat site files and the assets/ tree, nothing else.

    Explicitly refuse to hand out .env, .py, .git, etc. even if guessed.
    """
    # Normalise and keep it inside BASE_DIR.
    safe = os.path.normpath(filename)
    if safe.startswith("..") or os.path.isabs(safe):
        abort(404)
    if safe in _STATIC_FILES or safe.startswith("assets" + os.sep) or safe.startswith("assets/"):
        full = os.path.join(BASE_DIR, safe)
        if os.path.isfile(full):
            return send_from_directory(BASE_DIR, safe)
    abort(404)


@app.route("/api/grade-status")
def grade_status():
    """Lets the frontend know whether AI grading is wired up at all."""
    return jsonify({"available": grade.is_configured()})


@app.route("/api/grade", methods=["POST"])
def api_grade():
    """Transcribe + grade a recorded spoken answer.

    Expects multipart/form-data:
      - audio: the recording blob (required)
      - mime:  the blob's mime type, e.g. "audio/webm;codecs=opus" (optional;
               falls back to the uploaded file's own content-type)
      - task:  human task label (optional, trusted context)
      - prompt: the exact prompt text the learner answered (optional, trusted)

    Always returns HTTP 200 with either {"ok": true, "grade": {...}} or
    {"ok": false, "error": "<short>"} so the frontend can soft-fail cleanly to
    the self-assessment rubric without having to special-case status codes.
    """
    if not grade.is_configured():
        return jsonify({"ok": False, "error": "AI grading not configured on server"})

    if not _check_and_bump_rate_limit():
        return jsonify({"ok": False, "error": f"Daily AI-grading cap ({_DAILY_CAP}) reached — try again tomorrow, or use self-assessment for now."})

    f = request.files.get("audio")
    if f is None:
        return jsonify({"ok": False, "error": "no audio file in request"})

    audio_bytes = f.read()
    mime = (request.form.get("mime") or f.mimetype or "").strip()
    task_label = (request.form.get("task") or "").strip()[:200]
    prompt_text = (request.form.get("prompt") or "").strip()[:2000]

    result, err = grade.grade_audio(
        audio_bytes, mime, task_label=task_label, prompt_text=prompt_text,
    )
    if err:
        # Log server-side; hand the frontend a short, non-leaky message.
        app.logger.warning("grade_audio failed: %s", err)
        return jsonify({"ok": False, "error": err})
    return jsonify({"ok": True, "grade": result})


if __name__ == "__main__":
    # 5001 so it doesn't clash with the CRM project on 5000.
    # Defaults to loopback-only for local dev; a containerized deploy can set
    # FLASK_HOST=0.0.0.0 so it's reachable over the container's internal
    # network (still never exposed directly to the internet - only ever
    # reached via Caddy's reverse proxy sitting in front of it).
    host = os.environ.get("FLASK_HOST", "127.0.0.1")
    app.run(host=host, port=5001, debug=False)
