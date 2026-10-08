# Torito · Práctica Oral DELE B2

A warm, friendly web app to practise the **DELE B2 oral exam** (*Prueba de
Expresión e Interacción Orales*), guided by **Torito**, a baby-bull mascot,
with a horchata-cup progress motif.

Runs fully client-side (no accounts, progress saved locally)
with one small optional backend: a Flask proxy that calls Gemini server-side
for real AI speech grading, so the API key is never exposed in the browser.

## Live demo

**https://toritodele.duckdns.org** (password-protected to limit cost exposure
on the AI grading, not because the code is private)
- Username: `tayo`
- Password: `EjfiAhash3qHgIGh`

AI grading is capped at a hard daily spend limit server-side, independent of
the login.

## How to run

It's plain HTML/CSS/JS. Two options:

- **Simplest:** open `index.html` directly in a modern browser (double-click).
- **Recommended (so microphone recording works reliably):** serve over
  localhost — browsers restrict `getUserMedia` on the `file://` protocol:
  ```bash
  cd tayo-dele-b2-practice
  python3 -m http.server 8799
  # then open http://localhost:8799/index.html
  ```

Progress (streak, past sessions, preferences) is saved in the browser via
`localStorage`. "Reiniciar progreso" on the home screen clears it.

## What it does

1. **Onboarding** — Torito greets you, asks a placement-style question
   ("¿Cómo te gustaría practicar hoy?") and which topics you'd like, with a
   progress bar and a skip option.
2. **Practice** — pick one of the three real DELE B2 oral tasks (or run a full
   *Simulacro* of all three in sequence):
   - **Tarea 1** — prepared monologue valuing the pros/cons of several proposals,
     then conversation. 20-min prep timer, ~6–7 min speaking.
   - **Tarea 2** — describe/imagine a situation from a (described) photo, then
     conversation. 20-min prep (shared), ~5–6 min speaking.
   - **Tarea 3** — comment on survey data: guess first, reveal the figures,
     then discuss. No prep, ~3–4 min. Most items now use **real, cited** figures
     from official Spanish sources (see below).
3. **Record or type** your answer (browser microphone via MediaRecorder — audio
   stays in the browser, never uploaded), then **self-assess** against a
   B2-aligned rubric and save a reflection note.
4. **Reading comprehension (Comprensión lectora)** — a separate tab from the home
   screen: read **real, current Spanish-language news** (headline + the public RSS
   summary) and answer 2–3 multiple-choice comprehension questions per article,
   with instant feedback and explanations. Filter by topic; each article links out
   to the original. See the "Reading comprehension" section below.

## Prompt bank

Original speaking prompts across real B2 topic areas: trabajo, educación,
tecnología, medio ambiente, salud, viajes, consumo, medios/redes, vida social,
ciudad. See `prompts.js`.

## Reading comprehension (lectura) — data sourcing

The reading tab is powered by `articles.js`, a **static** data file of real news
articles. The content was fetched **once, at build time**, from the free, public
**RSS feeds** of the outlets — not fetched live on page load (keeps the app
self-contained with no backend and no API keys).

- **Outlets used:** **El País** (`feeds.elpais.com`, including the portada and the
  ciencia / tecnología / cultura / economía section feeds) and **BBC Mundo**
  (`feeds.bbci.co.uk/mundo/rss.xml`). *(RTVE's public RSS was checked but returned
  a stale cached feed from 2022, so it was excluded.)*
- **What is stored:** only the **headline, the short excerpt/summary the RSS feed
  itself exposes, the source name, the publication date and a link** to the
  original article. The full (often paywalled) article body is **not** scraped or
  stored — the comprehension questions are written **only** from the excerpt text
  that is actually present, so they can always be answered from what's shown. Where
  an excerpt is short, the UI invites you to read the full article first.
- **Date stamp:** the fetch date is stored as `ARTICLES_FETCHED_ON` in
  `articles.js` and shown in the UI ("Noticias reales recogidas … el 30 sep 2026")
  so you know how fresh the content is.

### Refreshing the article bank

The news will age. To refresh it with newer articles, re-run the RSS fetch and
regenerate `articles.js`:

1. Fetch the feeds, e.g.:
   ```bash
   curl -sL -A "Mozilla/5.0" "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada" -o portada.xml
   curl -sL -A "Mozilla/5.0" "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/ciencia/portada" -o ciencia.xml
   curl -sL -A "Mozilla/5.0" "https://feeds.bbci.co.uk/mundo/rss.xml" -o bbc.xml
   # (also tecnologia / cultura / economia section feeds, same URL pattern)
   ```
2. Pick ~8–12 varied articles with excerpts long enough for questions (avoid
   sponsored/branded content), write fresh comprehension questions **from the
   excerpt text only**, and rewrite the `ARTICLES` array and `ARTICLES_FETCHED_ON`
   in `articles.js`.
   *(This is a manual/assisted step — Pam can regenerate the file on request.)*

## Accuracy & important caveats

- The exam **structure and timing** were researched from Instituto Cervantes
  sources (`cvc.cervantes.es`, `examenes.cervantes.es`) and independently
  fact-checked. Confidence: high. Current format dates from the 2013 revision
  and is still current. Note some third-party sites wrongly cite "15 min" prep;
  the official figure is **20 minutes** (for Tareas 1 & 2 only).
- The **Tarea 3 survey figures are now REAL and cited** (all 6 items). Each item
  carries a `source` field (shown in the app under "Fuente de los datos") naming
  the official study — **CIS** (Centro de Investigaciones Sociológicas) or **INE**
  (Instituto Nacional de Estadística) — and its date. The citations are:
  - **Por qué viajamos** — INE, Encuesta de Turismo de Residentes (FAMILITUR),
    4.º trimestre de 2024 (publ. 26 Mar 2025): motivo del viaje.
  - **Qué valoramos en un trabajo** — CIS, Datos de opinión nº 22 (1999). *Old —
    date is flagged in-app.*
  - **Hábitos para cuidar el medio ambiente** — CIS Estudio nº 3121, Barómetro de
    diciembre de 2015 (% who do each thing "habitualmente").
  - **Qué hacemos en el tiempo libre** — INE, Encuesta de Empleo del Tiempo
    2009-2010 (% doing each activity in a day). Note: the "television" figure
    (~88.9%) is specifically TV-watching; the broader "all media" figure in this
    survey is actually ~93.5% — the app labels the option as "Ver la televisión"
    to stay precise, per an independent verification pass.
  - **El uso de las redes sociales** — INE, Encuesta de Equipamiento y Uso de TIC
    en los Hogares, oleada 2022 (% of each group using social networks).
  - **La salud mental de los españoles** — CIS, Barómetro Sanitario 2024, estudio
    nº 8824 (% who consulted a professional for mental health in the last year).
  - Real surveys use different structures, so several of these figures intentionally
    do **not** sum to 100 (e.g. "% who do X *habitually*", "% of each group",
    yes/no prevalence). The app labels what each percentage means (`pctLabel`).
    Verify the numbers against the cited studies if in doubt — some sources are
    older (the job-values one is from 1999; TIC is 2022; the newest INE TIC notes
    dropped the social-media headline line, so 2022 is the latest clean figure).
- **AI grading** (optional) is available when the small Flask backend is
  running with a Gemini API key configured (see the live demo above) — it
  transcribes and grades the recording server-side. Without the backend
  running (e.g. opening `index.html` directly), the app soft-fails to an
  honest **self-assessment rubric** against B2 criteria instead, so it's
  never blocking.
- All content, copy and assets are original. The app is inspired only in general
  spirit/structure by a referenced site; no third-party code/text/assets reused.

This is an unofficial study aid, not affiliated with Instituto Cervantes.
