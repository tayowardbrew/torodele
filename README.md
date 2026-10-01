# Torito · Práctica Oral DELE B2

A warm, friendly, self-contained web app to practise the **DELE B2 oral exam**
(*Prueba de Expresión e Interacción Orales*), guided by **Torito**, a baby-bull
mascot, with a horchata-cup progress motif.

Built for Tayo. No backend, no accounts, no paid APIs.

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
     then discuss. No prep, ~3–4 min.
3. **Record or type** your answer (browser microphone via MediaRecorder — audio
   stays in the browser, never uploaded), then **self-assess** against a
   B2-aligned rubric and save a reflection note.

## Prompt bank

Original prompts across real B2 topic areas: trabajo, educación, tecnología,
medio ambiente, salud, viajes, consumo, medios/redes, vida social, ciudad.
See `prompts.js`.

## Accuracy & important caveats

- The exam **structure and timing** were researched from Instituto Cervantes
  sources (`cvc.cervantes.es`, `examenes.cervantes.es`) and independently
  fact-checked. Confidence: high. Current format dates from the 2013 revision
  and is still current. Note some third-party sites wrongly cite "15 min" prep;
  the official figure is **20 minutes** (for Tareas 1 & 2 only).
- The **survey percentages in Tarea 3 are illustrative/invented** for practice —
  they are NOT from any official survey. The skill (predict, then compare and
  comment) is authentic; the exact numbers are not.
- There is **no AI grading**. Meaningful automated feedback would need a paid
  speech-to-text + language model service. Instead the app uses an honest
  **self-assessment rubric** against B2 criteria after you review your own
  recording. This is the one deliberate simplification.
- All content, copy and assets are original. The app is inspired only in general
  spirit/structure by a referenced site; no third-party code/text/assets reused.

This is an unofficial study aid, not affiliated with Instituto Cervantes.
