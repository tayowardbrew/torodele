/* ============================================================
   Torito · DELE B2 — Banco de lectura (comprensión lectora)
   ------------------------------------------------------------
   Artículos REALES de prensa en español, recogidos de los
   canales RSS públicos y GRATUITOS de los medios citados.
   Para cada artículo se guarda SOLO lo que el propio RSS
   ofrece públicamente (titular + entradilla/resumen corto) y
   un enlace al artículo original. NO se reproduce el cuerpo
   completo de pago de ningún artículo.

   Las preguntas de comprensión se han elaborado ÚNICAMENTE a
   partir del texto del resumen disponible (titular + entradilla),
   para que siempre se puedan responder con lo que aparece aquí.
   Cuando el resumen es corto, se invita a leer el artículo
   completo en el enlace original antes de responder.

   >>> FECHA DE RECOGIDA (ARTICLES_FETCHED_ON): 2026-09-30 <<<
   Para renovar el contenido, vuelve a ejecutar la recogida RSS
   (ver README.md, sección "Reading comprehension / lectura").
   ============================================================ */

const ARTICLES_FETCHED_ON = "2026-09-30";

/* Temas de lectura (reutiliza la paleta de temas B2) */
const READING_TOPIC_LABELS = {
  politica:    { label: "Política y sociedad", icon: "🏛️" },
  economia:    { label: "Economía", icon: "💶" },
  cultura:     { label: "Cultura", icon: "🎭" },
  tecnologia:  { label: "Tecnología", icon: "🤖" },
  ciencia:     { label: "Ciencia", icon: "🔬" },
  medioamb:    { label: "Medio ambiente", icon: "🌍" },
  salud:       { label: "Salud", icon: "🩺" },
  sociedad:    { label: "Sociedad", icon: "👥" }
};

/* Cada artículo:
   id, source, topic, title, excerpt (texto real del RSS),
   url (enlace original), published (fecha del RSS),
   questions: [{ q, options:[...], answer: index, explain }]
   Preguntas de opción múltiple basadas SOLO en el excerpt. */
const ARTICLES = [
  {
    id: "a-mariposas",
    source: "El País",
    topic: "ciencia",
    title: "El secreto de las alas de las mariposas: cuanto más llamativas, más difícil es cazarlas",
    excerpt: "La viveza de sus colores y patrones crea ilusiones ópticas que confunden a sus posibles depredadores y por eso no tienen apenas en comparación con las polillas.",
    url: "https://elpais.com/ciencia/2026-09-30/el-secreto-de-las-alas-de-las-mariposas-cuanto-mas-llamativas-mas-dificil-es-cazarlas.html",
    published: "2026-09-30",
    questions: [
      {
        q: "Según el texto, ¿qué efecto tienen los colores vivos de las mariposas?",
        options: [
          "Atraen a más depredadores",
          "Crean ilusiones ópticas que confunden a los depredadores",
          "No tienen ningún efecto",
          "Hacen que vuelen más rápido"
        ],
        answer: 1,
        explain: "El texto dice que la viveza de sus colores crea ilusiones ópticas que confunden a sus posibles depredadores."
      },
      {
        q: "El titular afirma que, cuanto más llamativas son las mariposas, resulta…",
        options: [
          "más fácil cazarlas",
          "más difícil cazarlas",
          "más corta su vida",
          "menos atractivo su vuelo"
        ],
        answer: 1,
        explain: "El titular dice literalmente: «cuanto más llamativas, más difícil es cazarlas»."
      }
    ]
  },
  {
    id: "a-dinosaurio",
    source: "El País",
    topic: "ciencia",
    title: "Una nueva especie de dinosaurio plumífero sugiere que distintas especies conquistaron el vuelo por separado",
    excerpt: "El hallazgo del ‘Norellraptor barsboldi’ añade pruebas para reforzar la teoría de que la capacidad de volar surgió de forma independiente en las aves primitivas y otros dinosaurios.",
    url: "https://elpais.com/ciencia/2026-09-29/una-nueva-especie-de-dinosaurio-plumifero-sugiere-que-distintas-especies-conquistaron-el-vuelo-por-separado.html",
    published: "2026-09-29",
    questions: [
      {
        q: "¿Qué teoría refuerza el hallazgo descrito en el texto?",
        options: [
          "Que el vuelo surgió de forma independiente en distintas especies",
          "Que las aves nunca llegaron a volar",
          "Que todos los dinosaurios eran plumíferos",
          "Que el vuelo surgió una sola vez"
        ],
        answer: 0,
        explain: "El texto indica que la capacidad de volar surgió de forma independiente en las aves primitivas y en otros dinosaurios."
      },
      {
        q: "¿Cómo se llama la nueva especie mencionada?",
        options: [
          "Starship barsboldi",
          "Norellraptor barsboldi",
          "Jeanerpeton mazonensis",
          "Tyrannosaurus rex"
        ],
        answer: 1,
        explain: "El texto nombra al ‘Norellraptor barsboldi’."
      }
    ]
  },
  {
    id: "a-ia-openai",
    source: "El País",
    topic: "tecnologia",
    title: "OpenAI retrasa su nueva IA tras reconocer que no ha realizado los controles de calidad pertinentes",
    excerpt: "La compañía de Sam Altman asegura que no se han corregido los fallos de su nuevo modelo y Anthropic hace lo propio al advertir de peligros “existenciales” en su folleto de la salida a Bolsa.",
    url: "https://elpais.com/tecnologia/2026-09-29/openai-retrasa-su-nueva-ia-por-problemas-de-seguridad-y-anthropic-alerta-de-riesgos-catastroficos-para-la-humanidad.html",
    published: "2026-09-29",
    questions: [
      {
        q: "¿Por qué retrasa OpenAI su nueva IA, según el texto?",
        options: [
          "Por falta de dinero",
          "Porque no ha realizado los controles de calidad pertinentes",
          "Por una orden del Gobierno",
          "Porque no tiene usuarios"
        ],
        answer: 1,
        explain: "El titular dice que retrasa su IA «tras reconocer que no ha realizado los controles de calidad pertinentes»."
      },
      {
        q: "¿Qué advertencia hace Anthropic en su folleto de salida a Bolsa?",
        options: [
          "Que su modelo es perfecto",
          "Que advierte de peligros “existenciales”",
          "Que abandonará la inteligencia artificial",
          "Que bajará los precios"
        ],
        answer: 1,
        explain: "El texto dice que Anthropic advierte de peligros “existenciales” en su folleto de la salida a Bolsa."
      },
      {
        q: "¿Quién dirige la compañía que retrasa su nueva IA?",
        options: ["Dario Amodei", "Elon Musk", "Sam Altman", "Mark Fisher"],
        answer: 2,
        explain: "El texto se refiere a «la compañía de Sam Altman»."
      }
    ]
  },
  {
    id: "a-ozono",
    source: "El País",
    topic: "medioamb",
    title: "Las rutas migratorias de la contaminación: así se saltan las fronteras el ozono, el polvo sahariano y el humo de los incendios",
    excerpt: "Copernicus desgrana por primera vez la polución transfronteriza que recorre miles de kilómetros y está alimentada por las emisiones y el calor. El estudio ubica a España en la zona más problemática dentro de Europa.",
    url: "https://elpais.com/clima-y-medio-ambiente/2026-09-30/las-rutas-migratorias-de-la-contaminacion.html",
    published: "2026-09-30",
    questions: [
      {
        q: "¿Qué analiza Copernicus en este estudio?",
        options: [
          "La contaminación que cruza fronteras y recorre miles de kilómetros",
          "El tráfico de las grandes ciudades",
          "La calidad del agua potable",
          "El ruido en los aeropuertos"
        ],
        answer: 0,
        explain: "El texto habla de la polución transfronteriza que recorre miles de kilómetros."
      },
      {
        q: "¿En qué posición sitúa el estudio a España dentro de Europa?",
        options: [
          "En la zona menos afectada",
          "En la media europea",
          "En la zona más problemática",
          "Fuera del estudio"
        ],
        answer: 2,
        explain: "El texto dice que el estudio ubica a España en la zona más problemática dentro de Europa."
      }
    ]
  },
  {
    id: "a-solar",
    source: "El País",
    topic: "medioamb",
    title: "La revolución solar se atasca en las ciudades: faltan tejados y sobran barreras",
    excerpt: "Un estudio en Barcelona muestra la necesidad de rediseñar las ayudas y promover fórmulas compartidas para extender las ventajas del autoconsumo más allá de los barrios acomodados.",
    url: "https://elpais.com/clima-y-medio-ambiente/2026-09-30/la-revolucion-solar-se-atasca-en-las-ciudades.html",
    published: "2026-09-30",
    questions: [
      {
        q: "Según el estudio en Barcelona, ¿qué hace falta para extender el autoconsumo solar?",
        options: [
          "Prohibir las placas solares",
          "Rediseñar las ayudas y promover fórmulas compartidas",
          "Subir el precio de la electricidad",
          "Construir más centrales de gas"
        ],
        answer: 1,
        explain: "El texto menciona la necesidad de rediseñar las ayudas y promover fórmulas compartidas."
      },
      {
        q: "El titular sugiere que la energía solar en las ciudades…",
        options: [
          "avanza sin problemas",
          "se atasca por falta de tejados y exceso de barreras",
          "ya llega a todos los barrios por igual",
          "ha sido prohibida"
        ],
        answer: 1,
        explain: "El titular dice: «se atasca en las ciudades: faltan tejados y sobran barreras»."
      }
    ]
  },
  {
    id: "a-vivienda-decretos",
    source: "El País",
    topic: "economia",
    title: "Las claves de los decretos de vivienda: frenazo a los desahucios y castigos a los fondos buitre",
    excerpt: "El Gobierno plantea una batería de medidas que incluyen bonificaciones a los caseros, ayudas a los inquilinos y préstamos al 0% para la compra de la primera casa.",
    url: "https://elpais.com/economia/vivienda/2026-09-30/las-claves-de-los-decretos-de-vivienda.html",
    published: "2026-09-30",
    questions: [
      {
        q: "¿Cuál de estas medidas incluyen los decretos de vivienda, según el texto?",
        options: [
          "Préstamos al 0% para comprar la primera casa",
          "La subida obligatoria de todos los alquileres",
          "La prohibición de alquilar viviendas",
          "La venta de viviendas a fondos extranjeros"
        ],
        answer: 0,
        explain: "El texto cita préstamos al 0% para la compra de la primera casa, entre otras medidas."
      },
      {
        q: "¿A quién pretende castigar el Gobierno con estos decretos?",
        options: [
          "A los inquilinos",
          "A los fondos buitre",
          "A los jóvenes",
          "A los bancos públicos"
        ],
        answer: 1,
        explain: "El titular habla de «castigos a los fondos buitre»."
      }
    ]
  },
  {
    id: "a-euribor",
    source: "El País",
    topic: "economia",
    title: "El euríbor se dispara en septiembre hasta un 3,24% y marca su nivel más alto desde 2024",
    excerpt: "Su subida encarecerá las hipotecas variables en 85 euros al mes para préstamos de 150.000 euros. Se trata del mayor incremento interanual en casi dos años.",
    url: "https://elpais.com/economia/2026-09-30/el-euribor-se-dispara-en-septiembre.html",
    published: "2026-09-30",
    questions: [
      {
        q: "¿A cuánto ha subido el euríbor en septiembre, según el texto?",
        options: ["3,24%", "0,85%", "15%", "2024%"],
        answer: 0,
        explain: "El texto indica que el euríbor sube hasta un 3,24%."
      },
      {
        q: "¿Qué consecuencia tiene esta subida para una hipoteca variable de 150.000 euros?",
        options: [
          "La abarata 85 euros al mes",
          "La encarece 85 euros al mes",
          "No tiene ningún efecto",
          "La reduce a la mitad"
        ],
        answer: 1,
        explain: "El texto dice que encarecerá las hipotecas variables en 85 euros al mes para préstamos de 150.000 euros."
      }
    ]
  },
  {
    id: "a-almodovar",
    source: "El País",
    topic: "cultura",
    title: "Pedro Almodóvar y Javier Cercas, oficial y caballero de la Legión de Honor francesa",
    excerpt: "Macron condecora en Madrid al cineasta y al escritor por su contribución a la cultura y a la idea de Europa.",
    url: "https://elpais.com/cultura/2026-09-30/pedro-almodovar-y-javier-cercas-oficial-y-caballero-de-la-legion-de-honor-francesa.html",
    published: "2026-09-30",
    questions: [
      {
        q: "¿Quién condecora a Almodóvar y a Cercas, según el texto?",
        options: ["El rey de España", "Macron", "El Instituto Cervantes", "La Academia de Cine"],
        answer: 1,
        explain: "El texto dice que Macron los condecora en Madrid."
      },
      {
        q: "¿Por qué reciben esta distinción?",
        options: [
          "Por su contribución a la cultura y a la idea de Europa",
          "Por motivos políticos",
          "Por una obra benéfica",
          "Por un descubrimiento científico"
        ],
        answer: 0,
        explain: "El texto señala que es por su contribución a la cultura y a la idea de Europa."
      }
    ]
  },
  {
    id: "a-fp",
    source: "El País",
    topic: "sociedad",
    title: "La FP se ha hecho mayor: es hora de cambiarla por dentro",
    excerpt: "Esther Monterrubio, secretaria general de FP; Luis García, presidente de FPEmpresa; y Mónica Moso, de la Fundación CaixaBank Dualiza, analizan para EL PAÍS los retos de una FP que supera ya los 1,2 millones de alumnos.",
    url: "https://elpais.com/economia/formacion/2026-09-30/la-fp-se-ha-hecho-mayor.html",
    published: "2026-09-30",
    questions: [
      {
        q: "¿Cuántos alumnos supera ya la Formación Profesional (FP), según el texto?",
        options: ["1,2 millones", "120.000", "50.000", "12 millones"],
        answer: 0,
        explain: "El texto dice que la FP supera ya los 1,2 millones de alumnos."
      },
      {
        q: "¿Qué defiende el titular que hay que hacer con la FP?",
        options: [
          "Eliminarla",
          "Cambiarla por dentro",
          "Reducir sus plazas",
          "Dejarla como está"
        ],
        answer: 1,
        explain: "El titular dice: «es hora de cambiarla por dentro»."
      }
    ]
  },
  {
    id: "a-fecundidad",
    source: "El País",
    topic: "sociedad",
    title: "Más de un tercio de las mujeres con hijos tiene menos de los que querrían: “Las condiciones óptimas llegan muy tarde”",
    excerpt: "Sube hasta el 15,5% el porcentaje de mujeres que no desea tener niños, y se dobla en la franja de 35 a 39 años, según la encuesta de fecundidad del INE.",
    url: "https://elpais.com/sociedad/2026-09-30/mas-de-un-tercio-de-las-mujeres-con-hijos-tiene-menos-de-los-que-querrian.html",
    published: "2026-09-30",
    questions: [
      {
        q: "Según la encuesta del INE citada, ¿qué porcentaje de mujeres no desea tener niños?",
        options: ["15,5%", "35%", "39%", "50%"],
        answer: 0,
        explain: "El texto indica que sube hasta el 15,5% el porcentaje de mujeres que no desea tener niños."
      },
      {
        q: "¿Qué organismo ha realizado la encuesta de fecundidad mencionada?",
        options: ["El CIS", "El INE", "Copernicus", "Eurostat"],
        answer: 1,
        explain: "El texto cita «la encuesta de fecundidad del INE»."
      }
    ]
  },
  {
    id: "a-cancer",
    source: "El País",
    topic: "salud",
    title: "Uno de cada ocho tumores en el mundo se atribuye a infecciones que se pueden prevenir",
    excerpt: "La mayoría de los casos se da en los países con menos recursos. La bacteria ‘Helicobacter pylori’ y el virus del papiloma son los patógenos que causan más diagnósticos de cáncer.",
    url: "https://elpais.com/salud-y-bienestar/2026-09-30/uno-de-cada-ocho-tumores-en-el-mundo-se-atribuye-a-infecciones.html",
    published: "2026-09-30",
    questions: [
      {
        q: "Según el texto, ¿qué proporción de tumores se atribuye a infecciones prevenibles?",
        options: ["Uno de cada ocho", "La mitad", "Uno de cada dos", "Todos"],
        answer: 0,
        explain: "El titular dice: «Uno de cada ocho tumores… se atribuye a infecciones que se pueden prevenir»."
      },
      {
        q: "¿Dónde se da la mayoría de estos casos?",
        options: [
          "En los países más ricos",
          "En los países con menos recursos",
          "Solo en Europa",
          "Solo en las grandes ciudades"
        ],
        answer: 1,
        explain: "El texto afirma que la mayoría de los casos se da en los países con menos recursos."
      },
      {
        q: "¿Qué dos patógenos causan más diagnósticos de cáncer, según el texto?",
        options: [
          "El Helicobacter pylori y el virus del papiloma",
          "La gripe y el resfriado",
          "El sarampión y la viruela",
          "El VIH y la malaria"
        ],
        answer: 0,
        explain: "El texto cita la bacteria ‘Helicobacter pylori’ y el virus del papiloma."
      }
    ]
  }
];
