/* ============================================================
   Torito · DELE B2 Oral Practice — Prompt Bank
   ------------------------------------------------------------
   All content below is ORIGINAL, written for this app. It mirrors
   the real style/difficulty/topics of the Instituto Cervantes
   DELE B2 Prueba de Expresión e Interacción Orales, but reuses
   NO official exam text or data.

   Task structure the content is built around (researched from
   cvc.cervantes.es and an official examenes.cervantes.es sample):
     Tarea 1 — Prepared monologue (~2 min) evaluating advantages/
               disadvantages of several proposed solutions to a
               problem, then conversation with examiner. ~6–7 min.
     Tarea 2 — Describe/imagine a situation from a photograph
               (~2–3 min), then conversation on experiences/
               opinions. ~5–6 min.
     Tarea 3 — Unprepared conversation about survey data (encuesta):
               first guess what the Spanish population answered,
               then compare with the real figures and comment.
               ~3–4 min. Most items now use REAL, cited figures from
               official Spanish sources (CIS / INE); the few with no
               reliable real source for the exact topic keep clearly
               labelled illustrative numbers (`invented: true`).
               See the `source` field per item and the README.
   Preparation: 20 min total for Tareas 1 & 2 only.
   Topic areas used (real B2 themes): trabajo, educación,
   tecnología, medio ambiente, salud, viajes, consumo/dinero,
   medios y redes, relaciones sociales, ciudad y vivienda.
   ============================================================ */

const TOPIC_LABELS = {
  trabajo:    { label: "Trabajo y profesión", icon: "💼" },
  educacion:  { label: "Educación", icon: "🎓" },
  tecnologia: { label: "Tecnología", icon: "📱" },
  medioamb:   { label: "Medio ambiente", icon: "🌍" },
  salud:      { label: "Salud y bienestar", icon: "🩺" },
  viajes:     { label: "Viajes y turismo", icon: "✈️" },
  consumo:    { label: "Consumo y dinero", icon: "🛒" },
  medios:     { label: "Medios y redes", icon: "📰" },
  social:     { label: "Vida social", icon: "👥" },
  ciudad:     { label: "Ciudad y vivienda", icon: "🏙️" }
};

/* ---------- TAREA 1: valorar propuestas (monólogo + conversación) ---------- */
const TAREA1 = [
  {
    id: "t1-teletrabajo",
    topic: "trabajo",
    title: "El teletrabajo en una empresa",
    situation: "Una empresa quiere mejorar la conciliación entre la vida laboral y personal de su plantilla. Para ello, el comité de dirección ha reunido varias propuestas. Usted debe exponer durante unos dos minutos las ventajas y los inconvenientes de cada una y, después, decir cuáles le parecen más y menos adecuadas y por qué.",
    proposals: [
      "Permitir teletrabajar tres días a la semana.",
      "Reducir la jornada a cuatro días manteniendo el salario.",
      "Flexibilizar la hora de entrada y de salida.",
      "Habilitar una sala de descanso y guardería en la oficina."
    ],
    followups: [
      "¿Cuál de estas medidas implantaría usted primero? ¿Por qué?",
      "¿Cree que el teletrabajo favorece o perjudica el trabajo en equipo?",
      "¿Alguna de estas propuestas podría tener efectos negativos para la empresa?"
    ]
  },
  {
    id: "t1-moviles-aula",
    topic: "educacion",
    title: "Los móviles en el instituto",
    situation: "Un instituto quiere decidir qué hacer con el uso del teléfono móvil durante el horario escolar. Exponga durante unos dos minutos las ventajas e inconvenientes de las siguientes propuestas y, a continuación, indique cuál apoyaría y cuál descartaría.",
    proposals: [
      "Prohibir totalmente el móvil dentro del centro.",
      "Permitirlo solo en los descansos.",
      "Integrarlo como herramienta en algunas clases.",
      "Dejar que cada profesor decida en su asignatura."
    ],
    followups: [
      "¿Qué papel deberían tener las familias en esta decisión?",
      "¿El móvil ayuda o distrae a la hora de aprender?",
      "¿Haría una regla distinta según la edad de los alumnos?"
    ]
  },
  {
    id: "t1-centro-ciudad",
    topic: "ciudad",
    title: "Menos coches en el centro",
    situation: "Un ayuntamiento quiere reducir el tráfico y la contaminación en el centro de la ciudad. Valore durante unos dos minutos las ventajas e inconvenientes de estas propuestas y después diga cuáles le parecen mejores.",
    proposals: [
      "Peatonalizar por completo el casco histórico.",
      "Cobrar una tasa por entrar en coche al centro.",
      "Hacer gratis el transporte público los fines de semana.",
      "Crear más carriles bici y aparcamientos para bicis."
    ],
    followups: [
      "¿A quién podrían perjudicar estas medidas?",
      "¿Usaría usted más el transporte público si fuera gratuito?",
      "¿Qué echaría en falta en esta lista de propuestas?"
    ]
  },
  {
    id: "t1-plastico",
    topic: "medioamb",
    title: "Reducir los plásticos de un solo uso",
    situation: "Una cadena de supermercados quiere reducir drásticamente el plástico de un solo uso. Comente durante unos dos minutos los pros y los contras de cada propuesta y señale cuál implantaría usted.",
    proposals: [
      "Cobrar por todas las bolsas, incluidas las de fruta.",
      "Vender productos a granel sin envase.",
      "Sustituir los envases de plástico por otros de cartón.",
      "Premiar con descuentos a quien traiga sus propios envases."
    ],
    followups: [
      "¿Está dispuesto el consumidor a pagar más por un producto más sostenible?",
      "¿Cuál de estas medidas sería más difícil de aplicar? ¿Por qué?",
      "¿Debería ser una decisión de las empresas o del Gobierno?"
    ]
  },
  {
    id: "t1-vida-sana",
    topic: "salud",
    title: "Fomentar hábitos saludables en el trabajo",
    situation: "Una empresa quiere que su personal lleve una vida más sana. Exponga durante unos dos minutos las ventajas e inconvenientes de las siguientes iniciativas y diga cuáles recomendaría.",
    proposals: [
      "Ofrecer fruta gratis y menús equilibrados en la cantina.",
      "Pagar parte del gimnasio a los empleados.",
      "Organizar pausas activas con estiramientos cada mañana.",
      "Permitir salir una hora antes a quien haga deporte."
    ],
    followups: [
      "¿Debe una empresa preocuparse por la salud de su plantilla?",
      "¿Cuál de estas ideas le motivaría más a usted?",
      "¿Ve algún riesgo en que la empresa controle estos hábitos?"
    ]
  },
  {
    id: "t1-turismo",
    topic: "viajes",
    title: "El turismo masivo en una ciudad",
    situation: "Una ciudad muy visitada quiere controlar los efectos negativos del turismo masivo. Valore durante unos dos minutos las ventajas e inconvenientes de estas medidas y proponga cuál adoptaría.",
    proposals: [
      "Limitar el número de pisos turísticos.",
      "Cobrar una tasa turística más alta.",
      "Restringir el acceso a los monumentos más saturados.",
      "Promocionar barrios y pueblos menos conocidos."
    ],
    followups: [
      "¿El turismo trae más beneficios o más problemas a una ciudad?",
      "¿Cómo afecta el turismo a los vecinos que viven allí?",
      "¿Qué medida le parece más justa para todos?"
    ]
  },
  {
    id: "t1-ahorro",
    topic: "consumo",
    title: "Ayudar a los jóvenes a ahorrar",
    situation: "Una asociación quiere ayudar a los jóvenes a gestionar mejor su dinero. Comente durante unos dos minutos los pros y contras de estas propuestas y diga cuál apoyaría.",
    proposals: [
      "Dar clases de educación financiera en los institutos.",
      "Crear una app pública que avise de los gastos.",
      "Ofrecer cuentas de ahorro sin comisiones para menores de 25.",
      "Hacer campañas contra el consumo impulsivo en redes."
    ],
    followups: [
      "¿Por qué cree que a los jóvenes les cuesta ahorrar hoy en día?",
      "¿Dónde aprendió usted a manejar su dinero?",
      "¿Cuál de estas medidas tendría más efecto a largo plazo?"
    ]
  }
];

/* ---------- TAREA 2: describir una fotografía ---------- */
const TAREA2 = [
  {
    id: "t2-reunion",
    topic: "trabajo",
    title: "Una reunión de trabajo",
    scene: "Imagine una fotografía: un grupo de personas sentadas alrededor de una mesa en una oficina. Algunas miran una pantalla, otra parece estar hablando y gesticulando.",
    guide: [
      "¿Quiénes cree que son estas personas y qué relación tienen?",
      "¿Dónde están y qué están haciendo exactamente?",
      "¿Cómo cree que se sienten? ¿Por qué?",
      "¿Qué cree que ha pasado antes y qué pasará después?"
    ],
    followups: [
      "¿Le gustan a usted las reuniones de trabajo? ¿Por qué?",
      "¿Cómo sería para usted una reunión ideal?",
      "Cuénteme una reunión, de trabajo o de estudios, que recuerde especialmente."
    ]
  },
  {
    id: "t2-mercado",
    topic: "consumo",
    title: "En el mercado",
    scene: "Imagine una fotografía: un mercado al aire libre con puestos de fruta y verdura. Una persona mayor habla con un vendedor mientras sostiene una bolsa.",
    guide: [
      "Describa el lugar y las personas que ve.",
      "¿De qué cree que están hablando?",
      "¿Qué ambiente se respira en la escena?",
      "¿Qué cree que comprará esta persona y por qué?"
    ],
    followups: [
      "¿Prefiere usted comprar en mercados o en supermercados? ¿Por qué?",
      "¿Han cambiado sus hábitos de compra en los últimos años?",
      "¿Qué ventajas tiene comprar productos locales?"
    ]
  },
  {
    id: "t2-aeropuerto",
    topic: "viajes",
    title: "En el aeropuerto",
    scene: "Imagine una fotografía: una persona joven en la zona de embarque de un aeropuerto, con una maleta y mirando el panel de salidas. Parece pensativa.",
    guide: [
      "¿Quién es esta persona y adónde cree que va?",
      "¿Viaja por placer, por trabajo o por otro motivo?",
      "¿Cómo cree que se siente en este momento?",
      "¿Qué cree que hará al llegar a su destino?"
    ],
    followups: [
      "¿Le gusta a usted viajar en avión? ¿Por qué?",
      "Cuénteme un viaje que le marcara.",
      "¿Prefiere planear los viajes al detalle o improvisar?"
    ]
  },
  {
    id: "t2-clase",
    topic: "educacion",
    title: "Un aula de adultos",
    scene: "Imagine una fotografía: un grupo de adultos de distintas edades en una clase. Una profesora señala algo en la pizarra y los demás toman notas.",
    guide: [
      "Describa a las personas de la imagen.",
      "¿Qué cree que están estudiando y por qué?",
      "¿Qué les habrá llevado a volver a estudiar?",
      "¿Cómo se sienten, en su opinión?"
    ],
    followups: [
      "¿Ha estudiado usted algo siendo ya adulto? ¿Qué?",
      "¿Cree que nunca es tarde para aprender?",
      "¿Qué le gustaría aprender si tuviera más tiempo?"
    ]
  },
  {
    id: "t2-parque",
    topic: "social",
    title: "Una tarde en el parque",
    scene: "Imagine una fotografía: un parque un día soleado. Varias personas pasean, un grupo de amigos charla sentado en la hierba y alguien pasea a un perro.",
    guide: [
      "Describa la escena y a las personas que aparecen.",
      "¿Qué relación cree que hay entre ellas?",
      "¿De qué cree que están hablando los amigos?",
      "¿Qué momento del día y qué época del año le parece que es?"
    ],
    followups: [
      "¿Cómo le gusta a usted pasar su tiempo libre?",
      "¿Es importante tener espacios verdes en la ciudad? ¿Por qué?",
      "¿Prefiere los planes al aire libre o en casa?"
    ]
  },
  {
    id: "t2-movil-cena",
    topic: "tecnologia",
    title: "Cena con móviles",
    scene: "Imagine una fotografía: varias personas sentadas a la mesa de un restaurante. La mayoría mira su teléfono móvil en lugar de hablar entre ellas.",
    guide: [
      "Describa lo que ve en la imagen.",
      "¿Qué relación cree que tienen estas personas?",
      "¿Por qué cree que están mirando el móvil?",
      "¿Cómo cree que se siente la persona que no mira el teléfono?"
    ],
    followups: [
      "¿Cree que el móvil nos aleja de las personas cercanas?",
      "¿Pone usted límites al uso del teléfono? ¿Cuáles?",
      "¿Cómo era quedar con amigos antes de los móviles?"
    ]
  },
  {
    id: "t2-hospital",
    topic: "salud",
    title: "En la sala de espera",
    scene: "Imagine una fotografía: la sala de espera de un centro de salud. Varias personas esperan sentadas; una consulta su móvil, otra lee y otra mira el reloj.",
    guide: [
      "Describa el lugar y a las personas.",
      "¿Por qué cree que está allí cada una?",
      "¿Cómo cree que se sienten mientras esperan?",
      "¿Qué cree que pasará cuando las llamen?"
    ],
    followups: [
      "¿Qué opina de los tiempos de espera en la sanidad?",
      "¿Cuida usted su salud de forma preventiva?",
      "¿Qué cambiaría del sistema sanitario que conoce?"
    ]
  }
];

/* ---------- TAREA 3: comentar una encuesta ----------
   Where a real, citable figure from an official Spanish source
   (CIS / INE) was found, the item uses it and carries a `source`
   citation shown in the app. Where no confident real figure was
   found for the exact topic, the item keeps ILLUSTRATIVE (invented)
   numbers and is flagged with `invented: true`. The exercise trains
   the same real skill either way: guess first, then compare & comment.
   The `pctLabel` field describes what the percentage means, because
   real surveys use different structures (reason for a trip, % who do
   something "habitually", % who did an activity, etc.) and these do
   NOT always add up to 100. */
const TAREA3 = [
  {
    id: "t3-redes",
    topic: "medios",
    title: "El uso de las redes sociales",
    intro: "Esta encuesta mide cuánta gente ha participado en redes sociales (Instagram, Facebook, YouTube, etc.) en los últimos tres meses. Las cifras son porcentajes de cada grupo de población, por lo que no suman 100. Imagine primero qué grupos usan más las redes y luego comente los datos.",
    question: "¿Qué porcentaje de cada grupo ha usado redes sociales en los últimos tres meses?",
    pctLabel: "% de cada grupo que ha participado en redes sociales",
    source: "INE · Encuesta sobre Equipamiento y Uso de TIC en los Hogares, oleada de 2022 (nota de prensa del 29 de noviembre de 2022). Datos reales; población de 16 a 74 años. Es la última cifra INE claramente verificable sobre «redes sociales».",
    options: [
      { text: "Jóvenes de 16 a 24 años", pct: 92.6 },
      { text: "Mujeres (16-74 años)", pct: 65.5 },
      { text: "Población general (16-74 años)", pct: 63.2 },
      { text: "Hombres (16-74 años)", pct: 60.9 }
    ],
    discuss: [
      "¿Le sorprende lo alto que es el uso entre los jóvenes frente a la población general?",
      "¿Por qué cree que las mujeres usan las redes algo más que los hombres, según el dato?",
      "¿Usa usted las redes más o menos que la media de la población?"
    ]
  },
  {
    id: "t3-vacaciones",
    topic: "viajes",
    title: "Por qué viajamos",
    intro: "Esta encuesta pregunta por el motivo principal de los viajes de los españoles. Imagine primero qué habrá respondido la mayoría y luego comente los resultados reales.",
    question: "¿Cuál es el motivo principal de sus viajes?",
    pctLabel: "% de los viajes de los residentes en España",
    source: "INE · Encuesta de Turismo de Residentes (FAMILITUR), 4.º trimestre de 2024 (publicada el 26 de marzo de 2025). Datos reales del motivo principal del viaje.",
    options: [
      { text: "Ocio, recreo y vacaciones", pct: 43.4 },
      { text: "Visitas a familiares o amigos", pct: 39.6 },
      { text: "Negocios y motivos profesionales", pct: 10.3 },
      { text: "Otros motivos", pct: 6.7 }
    ],
    discuss: [
      "¿Le sorprende el peso que tienen las visitas a familiares y amigos?",
      "¿Por qué cree que viajamos tanto para ver a la familia?",
      "¿Cuál suele ser el motivo principal de sus propios viajes?"
    ]
  },
  {
    id: "t3-trabajo-ideal",
    topic: "trabajo",
    title: "Qué valoramos en un trabajo",
    intro: "Esta encuesta trata sobre lo que más se valora en un trabajo. Diga primero qué cree que respondió la mayoría y después compárelo con los datos.",
    question: "¿Qué es lo más importante a la hora de valorar un trabajo?",
    pctLabel: "% que lo eligió como lo más importante",
    source: "CIS · Datos de opinión nº 22 (trabajo realizado en 1999). Dato real, aunque antiguo: tenlo en cuenta al comentarlo.",
    options: [
      { text: "La seguridad y la estabilidad en el empleo", pct: 89 },
      { text: "Unos ingresos elevados", pct: 8 },
      { text: "El prestigio social del trabajo", pct: 2 },
      { text: "El poder o la autoridad que da el puesto", pct: 1 }
    ],
    discuss: [
      "¿Le sorprende el enorme peso de la seguridad frente al salario?",
      "El dato es de 1999: ¿cree que hoy la respuesta sería distinta? ¿Por qué?",
      "¿Qué valora usted más en un empleo?"
    ]
  },
  {
    id: "t3-medioamb",
    topic: "medioamb",
    title: "Hábitos para cuidar el medio ambiente",
    intro: "Esta encuesta pregunta por los hábitos para cuidar el medio ambiente. En este caso, el porcentaje indica cuánta gente dice hacer cada cosa «habitualmente», por lo que las cifras no suman 100. Imagine qué habrá contestado la mayoría y luego comente los datos.",
    question: "¿Qué hace usted habitualmente para cuidar el medio ambiente?",
    pctLabel: "% que dice hacerlo «habitualmente»",
    source: "CIS · Estudio nº 3121, Barómetro de diciembre de 2015. Datos reales (porcentaje que declara hacer cada hábito «habitualmente»); por eso no suman 100.",
    options: [
      { text: "Separar la basura por tipos para reciclar", pct: 70.8 },
      { text: "Usar bombillas de bajo consumo", pct: 70.0 },
      { text: "Desplazarse a pie o en bici por el barrio", pct: 58.9 },
      { text: "Comprar productos ecológicos", pct: 17.1 }
    ],
    discuss: [
      "¿Por qué cree que reciclar es mucho más habitual que comprar productos ecológicos?",
      "¿Coincide lo que hace usted con lo más habitual?",
      "¿Cree que estos gestos individuales son suficientes?"
    ]
  },
  {
    id: "t3-tiempo-libre",
    topic: "social",
    title: "Qué hacemos en el tiempo libre",
    intro: "Esta encuesta trata sobre las actividades a las que la gente dedica su tiempo. Aquí el porcentaje indica cuánta gente realiza cada actividad en un día, por lo que las cifras no suman 100. Prediga la respuesta mayoritaria y después comente los resultados.",
    question: "¿A qué actividades dedica la gente su tiempo cada día?",
    pctLabel: "% que realiza la actividad en un día",
    source: "INE · Encuesta de Empleo del Tiempo 2009-2010. Datos reales (porcentaje de personas que realiza cada actividad en el transcurso del día); no suman 100. Nota: el dato de «medios de comunicación» en conjunto es del 93,5%; el 88-89% corresponde específicamente a ver la televisión.",
    options: [
      { text: "Ver la televisión", pct: 88.9 },
      { text: "Vida social y diversión", pct: 57.7 },
      { text: "Deporte y actividades al aire libre", pct: 39.8 },
      { text: "Aficiones, juegos e informática", pct: 29.7 }
    ],
    discuss: [
      "¿Le sorprende que casi todo el mundo vea la televisión a diario?",
      "¿Su forma de pasar el tiempo libre es como la de la mayoría?",
      "¿Cree que estos datos habrían cambiado mucho hoy en día?"
    ]
  },
  {
    id: "t3-salud",
    topic: "salud",
    title: "La salud mental de los españoles",
    intro: "Esta encuesta pregunta si, en los últimos doce meses, la gente ha tenido que consultar a un profesional sanitario por un problema de salud mental o un malestar psicológico o emocional. Imagine primero qué proporción de la población habrá dicho que sí y luego comente los datos.",
    question: "En los últimos 12 meses, ¿ha consultado a un profesional por un problema de salud mental o emocional?",
    pctLabel: "% de la población",
    source: "CIS · Barómetro Sanitario 2024 (para el Ministerio de Sanidad), estudio nº 8824 (total de oleadas, pregunta 8). Datos reales (N=7.623).",
    options: [
      { text: "No", pct: 81.7 },
      { text: "Sí", pct: 18.2 }
    ],
    discuss: [
      "¿Le sorprende que casi uno de cada cinco haya necesitado consultar por salud mental?",
      "¿Por qué cree que la salud mental se ha vuelto un tema tan presente hoy en día?",
      "¿Cree que la gente pide ayuda con facilidad o todavía hay tabú?"
    ]
  }
];

const PROMPTS = { 1: TAREA1, 2: TAREA2, 3: TAREA3 };
