/* ============================================================
   Torito · DELE B2 Oral Practice — App logic
   Self-contained. No backend, no paid APIs.
   Progress persisted in localStorage. Recording via MediaRecorder,
   kept in-browser only (never uploaded).
   ============================================================ */
(function(){
  "use strict";

  const LS_KEY = "torito_dele_b2_v1";
  const $  = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  /* ---------- state ---------- */
  const defaultState = { onboarded:false, level:null, topics:[], streak:0,
                         lastDay:null, sessions:[], seen:{1:[],2:[],3:[]}, read:[] };
  let state = load();

  function load(){
    try{ const s = JSON.parse(localStorage.getItem(LS_KEY));
         return s ? Object.assign({}, defaultState, s) : {...defaultState}; }
    catch(e){ return {...defaultState}; }
  }
  function save(){ localStorage.setItem(LS_KEY, JSON.stringify(state)); }

  /* ---------- screen router ---------- */
  const screens = ["onboarding","home","session","done","reading","article"];
  function show(id){
    screens.forEach(s => $("#"+s).classList.toggle("hidden", s!==id));
    $("#topbar").classList.toggle("hidden", id==="onboarding");
    window.scrollTo({top:0, behavior:"smooth"});
  }

  /* ============================================================
     ONBOARDING
     ============================================================ */
  let onbStep = 0;
  const ONB_STEPS = 4;

  function renderOnbProgress(){
    $("#onbProgress").style.width = ((onbStep)/(ONB_STEPS-1)*100) + "%";
  }
  function gotoStep(n){
    onbStep = n;
    $$(".onb-step").forEach(el => el.classList.toggle("hidden", +el.dataset.step !== n));
    renderOnbProgress();
    window.scrollTo({top:0, behavior:"smooth"});
  }

  function buildTopicChoices(){
    const wrap = $("#topicChoices");
    wrap.innerHTML = "";
    Object.entries(TOPIC_LABELS).forEach(([key, v])=>{
      const b = document.createElement("button");
      b.className = "tag-chip";
      b.dataset.value = key;
      b.innerHTML = `<span>${v.icon}</span><span>${v.label}</span>`;
      b.addEventListener("click", ()=>{
        b.classList.toggle("selected");
      });
      wrap.appendChild(b);
    });
  }

  function initOnboarding(){
    buildTopicChoices();
    gotoStep(0);

    $$("[data-next]").forEach(b => b.addEventListener("click", ()=> gotoStep(onbStep+1)));

    // level choice cards -> advance
    $$("#levelChoices .choice-card").forEach(card=>{
      card.addEventListener("click", ()=>{
        $$("#levelChoices .choice-card").forEach(c=>c.classList.remove("selected"));
        card.classList.add("selected");
        state.level = card.dataset.value;
        setTimeout(()=> gotoStep(2), 250);
      });
    });

    $("#skipOnb").addEventListener("click", finishOnboarding);
    $("#finishOnb").addEventListener("click", ()=>{
      state.topics = $$("#topicChoices .tag-chip.selected").map(c=>c.dataset.value);
      finishOnboarding();
    });
  }

  function finishOnboarding(){
    state.onboarded = true;
    save();
    enterHome();
  }

  /* ============================================================
     HOME
     ============================================================ */
  function enterHome(){
    updateStreakUI();
    const greetMsgs = [
      "¿Lista para hoy? Elige una tarea para empezar.",
      "¡Buenas! Un ratito de práctica y una horchata. ¿Por dónde empezamos?",
      "Cada sesión cuenta. Elige una tarea y vamos poco a poco.",
      "¡Hola de nuevo! Tú marcas el ritmo. ¿Qué practicamos?"
    ];
    $("#homeGreet").innerHTML = `<p>${pick(greetMsgs)}</p>`;
    show("home");
  }

  function updateStreakUI(){
    $("#streakCount").textContent = state.streak || 0;
  }

  function bumpStreak(){
    const today = new Date().toISOString().slice(0,10);
    if(state.lastDay === today) return;            // already counted today
    const yesterday = new Date(Date.now()-86400000).toISOString().slice(0,10);
    state.streak = (state.lastDay === yesterday) ? (state.streak||0)+1 : 1;
    state.lastDay = today;
    save(); updateStreakUI();
  }

  /* ============================================================
     SESSION
     ============================================================ */
  let cur = null;        // {task, item}
  let simQueue = null;   // array of tasks for full simulacro

  function startTask(task){
    const item = pickPrompt(task);
    cur = { task, item };
    renderPrompt();
    show("session");
  }

  function pickPrompt(task){
    const bank = PROMPTS[task];
    let pool = bank;
    // prefer user's chosen topics, and unseen items
    if(state.topics && state.topics.length){
      const t = bank.filter(p => state.topics.includes(p.topic));
      if(t.length) pool = t;
    }
    const unseen = pool.filter(p => !state.seen[task].includes(p.id));
    const chosen = pick(unseen.length ? unseen : pool);
    state.seen[task].push(chosen.id);
    if(state.seen[task].length >= bank.length) state.seen[task] = []; // reset cycle
    save();
    return chosen;
  }

  const TASK_META = {
    1:{label:"Tarea 1 · Valorar propuestas", prep:20*60, speak:"6–7 min", hasPrep:true},
    2:{label:"Tarea 2 · Describir una fotografía", prep:20*60, speak:"5–6 min", hasPrep:true},
    3:{label:"Tarea 3 · Comentar una encuesta", prep:0, speak:"3–4 min", hasPrep:false}
  };

  function renderPrompt(){
    const {task, item} = cur;
    const meta = TASK_META[task];
    $("#sessTaskLabel").textContent = meta.label;
    $("#sessPhase").textContent = simQueue ? `Simulacro · tarea ${simQueue.indexOf(task)+1} de 3` : "";
    $("#promptTitle").textContent = item.title;

    let html = "";
    if(task===1){
      html += `<p>${item.situation}</p>`;
      html += `<div class="label">Propuestas</div><ul class="prop-list">`;
      item.proposals.forEach(p => html += `<li>${p}</li>`);
      html += `</ul>`;
      html += `<div class="label">Después, el entrevistador puede preguntarle</div><ul>`;
      item.followups.forEach(f => html += `<li>${f}</li>`);
      html += `</ul>`;
    } else if(task===2){
      html += `<p>${item.scene}</p>`;
      html += `<div class="label">Puntos para guiar su descripción</div><ul>`;
      item.guide.forEach(g => html += `<li>${g}</li>`);
      html += `</ul>`;
      html += `<div class="label">Luego conversará sobre</div><ul>`;
      item.followups.forEach(f => html += `<li>${f}</li>`);
      html += `</ul>`;
    } else {
      html += `<p>${item.intro}</p>`;
      html += `<div class="label">${item.question}</div>`;
      if(item.pctLabel){
        html += `<p class="survey-pct-label">${item.pctLabel}</p>`;
      }
      html += `<table class="survey" id="surveyTable">`;
      item.options.forEach((o,i)=>{
        const barW = Math.min(100, Number(o.pct) || 0);
        html += `<tr class="hidden-pct" data-i="${i}">
                   <td>${o.text}<div class="bar" style="opacity:0"><i style="width:${barW}%"></i></div></td>
                   <td class="pct">${o.pct}%</td>
                 </tr>`;
      });
      html += `</table>`;
      html += `<p class="rec-note">Primero, intenta adivinar qué respondió la mayoría. Cuando quieras, pulsa «Revelar los datos».</p>`;
      html += `<button class="btn-ghost" id="revealBtn">Revelar los datos</button>`;
      html += `<div class="label" style="margin-top:14px">Comente con el entrevistador</div><ul>`;
      item.discuss.forEach(d => html += `<li>${d}</li>`);
      html += `</ul>`;
      if(item.source){
        html += `<p class="survey-source">📊 <strong>Fuente de los datos:</strong> ${item.source}</p>`;
      } else if(item.invented){
        html += `<p class="rec-note">Nota: estos porcentajes son ilustrativos (inventados para practicar), no de una encuesta oficial. No se encontró un dato oficial fiable para este tema concreto.</p>`;
      }
    }
    $("#promptBody").innerHTML = html;

    if(task===3){
      const rev = $("#revealBtn");
      if(rev) rev.addEventListener("click", ()=>{
        $$("#surveyTable tr").forEach(tr=>{
          tr.classList.remove("hidden-pct");
          const bar = tr.querySelector(".bar"); if(bar) bar.style.opacity = 1;
        });
        rev.remove();
      });
    }

    setupTimer();
  }

  /* ---------- timer ---------- */
  let timerInt = null, timeLeft = 0;

  function setupTimer(){
    clearInterval(timerInt);
    const meta = TASK_META[cur.task];
    $("#respondZone").classList.add("hidden");
    $("#rubricZone").classList.add("hidden");
    $("#timerZone").classList.remove("hidden");
    $("#timerSkip").classList.add("hidden");
    $("#timerStart").classList.remove("hidden");
    $("#timerDisplay").classList.remove("warning");

    if(meta.hasPrep){
      timeLeft = meta.prep;
      $("#timerLabel").textContent = "Tiempo de preparación";
      $("#timerDisplay").textContent = fmt(timeLeft);
      $("#timerStart").textContent = "Empezar preparación (20 min)";
      $("#timerHint").textContent = "En el examen real dispones de 20 minutos para preparar las Tareas 1 y 2. Toma notas y un esquema; no podrás limitarte a leerlas.";
    } else {
      $("#timerLabel").textContent = "Esta tarea no tiene preparación";
      $("#timerDisplay").textContent = "⚡";
      $("#timerStart").textContent = "Empezar a hablar";
      $("#timerHint").textContent = "La Tarea 3 es espontánea: se conversa directamente con el entrevistador.";
    }
  }

  function startTimer(){
    const meta = TASK_META[cur.task];
    if(!meta.hasPrep){ goToRespond(); return; }
    $("#timerStart").classList.add("hidden");
    $("#timerSkip").classList.remove("hidden");
    timerInt = setInterval(()=>{
      timeLeft--;
      $("#timerDisplay").textContent = fmt(timeLeft);
      if(timeLeft <= 60) $("#timerDisplay").classList.add("warning");
      if(timeLeft <= 0){ clearInterval(timerInt); goToRespond(); }
    }, 1000);
  }

  function goToRespond(){
    clearInterval(timerInt);
    $("#timerZone").classList.add("hidden");
    $("#respondZone").classList.remove("hidden");
    const meta = TASK_META[cur.task];
    $("#recNote").textContent = `Habla unos ${meta.speak}, como en el examen. La grabación se queda solo en tu navegador; no se sube a ningún sitio.`;
    resetRecorder();
    window.scrollTo({top:0, behavior:"smooth"});
  }

  /* ---------- recorder (MediaRecorder) ---------- */
  let mediaRec = null, chunks = [], recInt = null, recSecs = 0, stream = null;

  function resetRecorder(){
    stopStream();
    chunks = []; recSecs = 0;
    $("#recTimer").textContent = "00:00";
    const pb = $("#playback"); pb.classList.add("hidden"); pb.removeAttribute("src");
    const btn = $("#recBtn");
    btn.classList.remove("recording");
    btn.disabled = false;
    btn.innerHTML = `<span class="rec-dot"></span> Grabar`;
    $("#typeArea").value = "";
  }
  function stopStream(){ if(stream){ stream.getTracks().forEach(t=>t.stop()); stream=null; } }

  async function toggleRecord(){
    const btn = $("#recBtn");
    if(mediaRec && mediaRec.state === "recording"){
      mediaRec.stop();
      return;
    }
    if(!navigator.mediaDevices || !window.MediaRecorder){
      $("#recNote").textContent = "Tu navegador no permite grabar audio aquí. Usa el campo de texto de abajo para practicar.";
      btn.disabled = true;
      return;
    }
    try{
      stream = await navigator.mediaDevices.getUserMedia({audio:true});
    }catch(e){
      $("#recNote").textContent = "No se pudo acceder al micrófono (permiso denegado). Puedes escribir tu respuesta en el campo de abajo.";
      return;
    }
    chunks = [];
    mediaRec = new MediaRecorder(stream);
    mediaRec.ondataavailable = e => { if(e.data.size) chunks.push(e.data); };
    mediaRec.onstop = ()=>{
      clearInterval(recInt);
      stopStream();
      const blob = new Blob(chunks, {type: mediaRec.mimeType || "audio/webm"});
      const url = URL.createObjectURL(blob);
      const pb = $("#playback");
      pb.src = url; pb.classList.remove("hidden");
      btn.classList.remove("recording");
      btn.innerHTML = `<span class="rec-dot"></span> Grabar de nuevo`;
    };
    mediaRec.start();
    recSecs = 0; $("#recTimer").textContent = "00:00";
    recInt = setInterval(()=>{ recSecs++; $("#recTimer").textContent = fmt(recSecs); }, 1000);
    btn.classList.add("recording");
    btn.innerHTML = `<span class="rec-dot"></span> Detener`;
  }

  /* ---------- rubric (self-assessment, B2-aligned) ---------- */
  const RUBRIC = [
    {k:"coherencia", t:"Coherencia y desarrollo",
     d:"¿Organicé bien las ideas, con introducción, desarrollo y conclusión?"},
    {k:"fluidez", t:"Fluidez",
     d:"¿Hablé con un ritmo natural, sin pausas largas ni demasiadas dudas?"},
    {k:"amplitud", t:"Riqueza y precisión del vocabulario",
     d:"¿Usé vocabulario variado y preciso, propio del nivel B2?"},
    {k:"gramatica", t:"Corrección gramatical",
     d:"¿Controlé los tiempos verbales, el subjuntivo y las estructuras complejas?"},
    {k:"conectores", t:"Conectores y cohesión",
     d:"¿Enlacé las ideas con conectores (sin embargo, por lo tanto, aunque…)?"},
    {k:"interaccion", t:"Interacción y argumentación",
     d:"¿Expresé y defendí mi opinión, matizando y respondiendo a repreguntas?"}
  ];
  let rubricScores = {};

  function buildRubric(){
    rubricScores = {};
    const wrap = $("#rubricList"); wrap.innerHTML = "";
    RUBRIC.forEach(c=>{
      const div = document.createElement("div");
      div.className = "rubric-item";
      div.innerHTML = `<div class="crit-title">${c.t}</div>
                       <div class="crit-desc">${c.d}</div>
                       <div class="rubric-opts" data-k="${c.k}">
                         <button data-v="1">Mejorable</button>
                         <button data-v="2">Casi</button>
                         <button data-v="3">¡Bien!</button>
                       </div>`;
      wrap.appendChild(div);
    });
    $$(".rubric-opts button").forEach(b=>{
      b.addEventListener("click", ()=>{
        const k = b.parentElement.dataset.k;
        $$("button", b.parentElement).forEach(x=>x.classList.remove("sel"));
        b.classList.add("sel");
        rubricScores[k] = +b.dataset.v;
        updateRubricScore();
      });
    });
    $("#reflectArea").value = "";
    updateRubricScore();
  }

  function updateRubricScore(){
    const vals = Object.values(rubricScores);
    const el = $("#rubricScore");
    if(!vals.length){ el.textContent = "Marca cada criterio para ver tu valoración."; return; }
    const sum = vals.reduce((a,b)=>a+b,0);
    const max = RUBRIC.length*3;
    const pct = Math.round(sum/max*100);
    let msg;
    if(vals.length < RUBRIC.length) msg = `Llevas ${vals.length}/${RUBRIC.length} criterios…`;
    else if(pct>=85) msg = `🥤 ¡Excelente! ${pct}% — Torito está orgulloso.`;
    else if(pct>=65) msg = `👍 Buen trabajo: ${pct}%. Vas por muy buen camino.`;
    else msg = `💪 ${pct}%. Cada intento suma; mira tu nota y vuelve a probar.`;
    el.textContent = msg;
  }

  function goToRubric(){
    $("#respondZone").classList.add("hidden");
    $("#rubricZone").classList.remove("hidden");
    buildRubric();
    window.scrollTo({top:0, behavior:"smooth"});
  }

  function saveSession(){
    const vals = Object.values(rubricScores);
    const sum = vals.reduce((a,b)=>a+b,0);
    state.sessions.push({
      date: new Date().toISOString(),
      task: cur.task,
      promptId: cur.item.id,
      score: vals.length ? Math.round(sum/(RUBRIC.length*3)*100) : null,
      note: $("#reflectArea").value.trim() || null
    });
    bumpStreak();
    save();
    stopStream();

    // simulacro: advance to next task
    if(simQueue){
      const idx = simQueue.indexOf(cur.task);
      if(idx < simQueue.length-1){ startTask(simQueue[idx+1]); return; }
      simQueue = null;
    }
    showDone();
  }

  /* ============================================================
     DONE
     ============================================================ */
  function showDone(){
    const total = state.sessions.length;
    const msgs = [
      "¡Buen trabajo hoy! 🐂 Un pasito más cerca del B2.",
      "¡Lo has hecho genial! Descansa y tómate tu horchata. 🥤",
      "Práctica terminada. La constancia es tu mejor amiga. ¡Hasta la próxima!",
      "¡Olé! Cada sesión te acerca al examen. 🎉"
    ];
    $("#doneMsg").innerHTML = `<p>${pick(msgs)}</p>`;
    const last = state.sessions.slice(-5).filter(s=>s.score!=null);
    const avg = last.length ? Math.round(last.reduce((a,b)=>a+b.score,0)/last.length) : null;
    $("#doneStats").innerHTML =
      `Sesiones totales: <strong>${total}</strong> · Racha: <strong>${state.streak||0}</strong> 🥤` +
      (avg!=null ? `<br>Media de tus últimas valoraciones: <strong>${avg}%</strong>` : "");
    show("done");
  }

  /* ============================================================
     READING COMPREHENSION (noticias reales)
     ============================================================ */
  let readingFilterTopic = "all";
  let curArticle = null;

  function enterReading(){
    buildReadingFilter();
    renderArticleList();
    const asof = $("#readingAsof");
    if(asof){
      asof.innerHTML = `Noticias reales recogidas de los canales RSS públicos de los medios citados el ` +
        `<strong>${fmtDate(ARTICLES_FETCHED_ON)}</strong>. Para noticias más recientes, vuelve a ` +
        `recoger el contenido (ver README).`;
    }
    show("reading");
  }

  function articlesForFilter(){
    return readingFilterTopic === "all"
      ? ARTICLES
      : ARTICLES.filter(a => a.topic === readingFilterTopic);
  }

  function buildReadingFilter(){
    const wrap = $("#readingFilter");
    if(!wrap) return;
    // topics actually present in the data, in a stable order
    const present = [];
    Object.keys(READING_TOPIC_LABELS).forEach(k=>{
      if(ARTICLES.some(a=>a.topic===k)) present.push(k);
    });
    let html = `<button class="filter-chip${readingFilterTopic==="all"?" selected":""}" data-topic="all">Todas</button>`;
    present.forEach(k=>{
      const v = READING_TOPIC_LABELS[k];
      html += `<button class="filter-chip${readingFilterTopic===k?" selected":""}" data-topic="${k}">${v.icon} ${v.label}</button>`;
    });
    wrap.innerHTML = html;
    $$(".filter-chip", wrap).forEach(b=>{
      b.addEventListener("click", ()=>{
        readingFilterTopic = b.dataset.topic;
        buildReadingFilter();
        renderArticleList();
      });
    });
  }

  function renderArticleList(){
    const list = $("#articleList");
    if(!list) return;
    const items = articlesForFilter();
    $("#readCountLabel").textContent = `${items.length} ${items.length===1?"noticia":"noticias"}`;
    list.innerHTML = "";
    items.forEach(a=>{
      const v = READING_TOPIC_LABELS[a.topic] || {icon:"📰", label:a.topic};
      const done = (state.read && state.read.includes(a.id));
      const card = document.createElement("button");
      card.className = "article-item";
      card.innerHTML =
        `<span class="article-item-top">
           <span class="article-topic-tag">${v.icon} ${v.label}</span>
           <span class="article-item-src">${a.source}</span>
           ${done ? `<span class="article-done" title="Ya leída">✓</span>` : ``}
         </span>
         <span class="article-item-title">${a.title}</span>
         <span class="article-item-q">${a.questions.length} ${a.questions.length===1?"pregunta":"preguntas"} · 📅 ${fmtDate(a.published)}</span>`;
      card.addEventListener("click", ()=> openArticle(a));
      list.appendChild(card);
    });
  }

  function openArticle(a){
    curArticle = a;
    const v = READING_TOPIC_LABELS[a.topic] || {icon:"📰", label:a.topic};
    $("#articleTopicLabel").textContent = `${v.icon} ${v.label}`;
    $("#articleSource").textContent = `${a.source} · ${fmtDate(a.published)}`;
    $("#articleTitle").textContent = a.title;
    $("#articleExcerpt").textContent = a.excerpt;
    const link = $("#articleLink");
    link.href = a.url;
    const shortNote = $("#articleShortNote");
    if(a.excerpt.length < 90){
      shortNote.textContent = "El resumen es breve: para responder con seguridad, te recomendamos leer el artículo completo en el enlace de arriba.";
      shortNote.classList.remove("hidden");
    } else {
      shortNote.classList.add("hidden");
    }
    renderQuestions(a);
    show("article");
  }

  function renderQuestions(a){
    const wrap = $("#questionList");
    wrap.innerHTML = "";
    a.questions.forEach((item, qi)=>{
      const q = document.createElement("div");
      q.className = "q-item";
      let opts = "";
      item.options.forEach((opt, oi)=>{
        opts += `<button class="q-opt" data-q="${qi}" data-o="${oi}">${opt}</button>`;
      });
      q.innerHTML = `<div class="q-text">${qi+1}. ${item.q}</div>
                     <div class="q-opts" data-q="${qi}">${opts}</div>
                     <div class="q-explain hidden" data-q="${qi}"></div>`;
      wrap.appendChild(q);
    });
    readingAnswers = {};
    $$(".q-opt", wrap).forEach(b=>{
      b.addEventListener("click", ()=>{
        if(wrap.dataset.checked) return;         // locked after checking
        const qi = b.dataset.q;
        $$(`.q-opt[data-q="${qi}"]`, wrap).forEach(x=>x.classList.remove("sel"));
        b.classList.add("sel");
        readingAnswers[qi] = +b.dataset.o;
      });
    });
    wrap.removeAttribute("data-checked");
    $("#readingScore").textContent = "";
    $("#checkAnswers").classList.remove("hidden");
    $("#nextArticle").classList.add("hidden");
  }

  let readingAnswers = {};

  function checkReadingAnswers(){
    const a = curArticle;
    const wrap = $("#questionList");
    let correct = 0;
    a.questions.forEach((item, qi)=>{
      const chosen = readingAnswers[qi];
      $$(`.q-opt[data-q="${qi}"]`, wrap).forEach(b=>{
        const oi = +b.dataset.o;
        b.classList.add("locked");
        if(oi === item.answer) b.classList.add("correct");
        else if(oi === chosen) b.classList.add("wrong");
      });
      if(chosen === item.answer) correct++;
      const ex = wrap.querySelector(`.q-explain[data-q="${qi}"]`);
      if(ex){
        const got = chosen === item.answer;
        ex.innerHTML = `${got ? "✅ ¡Correcto!" : "❌ No exactamente."} ${item.explain || ""}`;
        ex.classList.remove("hidden");
      }
    });
    wrap.dataset.checked = "1";
    const total = a.questions.length;
    const pct = Math.round(correct/total*100);
    let msg;
    if(pct===100) msg = `🥤 ¡Perfecto! ${correct}/${total}. Torito está orgulloso.`;
    else if(pct>=60) msg = `👍 ${correct}/${total} correctas (${pct}%). ¡Muy bien!`;
    else msg = `💪 ${correct}/${total} correctas (${pct}%). Relee el texto y vuelve a intentarlo.`;
    $("#readingScore").textContent = msg;

    // mark as read + log a lightweight session, bump streak
    if(!state.read) state.read = [];
    if(!state.read.includes(a.id)) state.read.push(a.id);
    state.sessions.push({
      date: new Date().toISOString(),
      task: "reading",
      promptId: a.id,
      score: pct,
      note: null
    });
    bumpStreak();
    save();

    $("#checkAnswers").classList.add("hidden");
    $("#nextArticle").classList.remove("hidden");
    window.scrollTo({top:0, behavior:"smooth"});
  }

  function nextArticle(){
    const items = articlesForFilter();
    const unread = items.filter(x => !(state.read||[]).includes(x.id) && x.id !== curArticle.id);
    const pool = unread.length ? unread : items.filter(x=>x.id!==curArticle.id);
    if(pool.length) openArticle(pick(pool));
    else enterReading();
  }

  /* ============================================================
     HELPERS
     ============================================================ */
  function fmtDate(iso){
    // iso = "YYYY-MM-DD" -> "30 sep 2026" (es)
    if(!iso) return "";
    const [y,m,d] = iso.split("-").map(Number);
    const months = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
    return `${d} ${months[(m||1)-1]} ${y}`;
  }

  function fmt(s){ s=Math.max(0,s); const m=Math.floor(s/60), x=s%60;
                   return String(m).padStart(2,"0")+":"+String(x).padStart(2,"0"); }
  function pick(a){ return a[Math.floor(Math.random()*a.length)]; }

  /* ============================================================
     WIRE-UP
     ============================================================ */
  function init(){
    initOnboarding();

    $$(".task-card[data-task]").forEach(c => c.addEventListener("click", ()=>{
      simQueue = null; startTask(+c.dataset.task);
    }));
    $("#simModeBtn").addEventListener("click", ()=>{
      simQueue = [1,2,3]; startTask(1);
    });
    $("#readingCard").addEventListener("click", enterReading);
    $("#readBackHome").addEventListener("click", enterHome);
    $("#articleBack").addEventListener("click", enterReading);
    $("#checkAnswers").addEventListener("click", checkReadingAnswers);
    $("#nextArticle").addEventListener("click", nextArticle);
    $("#backHome").addEventListener("click", ()=>{ simQueue=null; clearInterval(timerInt); stopStream(); enterHome(); });
    $("#timerStart").addEventListener("click", startTimer);
    $("#timerSkip").addEventListener("click", goToRespond);
    $("#recBtn").addEventListener("click", toggleRecord);
    $("#toRubric").addEventListener("click", goToRubric);
    $("#saveSession").addEventListener("click", saveSession);
    $("#againBtn").addEventListener("click", ()=> startTask(cur.task));
    $("#doneHome").addEventListener("click", enterHome);
    $("#resetBtn").addEventListener("click", ()=>{
      if(confirm("¿Seguro que quieres borrar tu progreso (racha, sesiones y preferencias)?")){
        localStorage.removeItem(LS_KEY);
        state = {...defaultState};
        onbStep=0; gotoStep(0); show("onboarding");
      }
    });

    if(state.onboarded) enterHome();
    else { show("onboarding"); }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
