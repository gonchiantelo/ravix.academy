# RAVIX — Léeme para IA de código (Antigravity)

> Lee este archivo antes que cualquier otro del proyecto. Su única función es decirte qué documento manda sobre qué, y evitar tres errores concretos que ya se cometieron una vez al mezclar fuentes.

## Qué es RAVIX, en una frase

Academia uruguaya de alto rendimiento para futbolistas juveniles y profesionales, con eje neuro-cognitivo, técnico y físico. No es un club, no es una app de fitness genérica: es un sistema de entrenamiento individualizado que se apoya en sensores lumínicos, video y una biblioteca de tareas clasificadas por nivel.

## Stack Tecnológico — decidido, no propongas alternativas

| Capa | Elección | Notas |
|---|---|---|
| Lenguaje | **TypeScript** | El usuario no tiene experiencia previa con este lenguaje ni con NestJS — explicar cada paso en términos simples, no asumir vocabulario de backend |
| Framework de API | **NestJS** | Empezar con un único módulo: `tareas` (Biblioteca de Tareas). Los módulos `jugadores` y `evaluaciones` se agregan después, como carpetas nuevas — no reestructurar el módulo de tareas para "dejarlo listo" de antemano |
| Base de datos | **PostgreSQL alojado en Supabase** | Ya elegido antes de este documento. Supabase también da Auth y Storage — no se usan todavía, pero están disponibles cuando se necesiten |
| ORM / capa de esquema | **Prisma** | El archivo `schema.prisma` debe reflejar exactamente las tablas de `BIBLIOTECA_TAREAS_ESTRUCTURA.md`. Si hay una diferencia entre el schema de Prisma y el `.md`, es un error a corregir — nunca una "mejora" que el programador decide por su cuenta |
| Control de versiones | **GitHub** | — |
| Despliegue | **Vercel para el frontend/dashboard**, cuando exista. **Para el servidor de NestJS, Vercel no es el ajuste más natural** — ver nota abajo |
| Costo | Todo en capa gratuita para el arranque (Supabase free, Vercel free, GitHub free). Ningún cambio a un plan pago se hace sin que el usuario lo apruebe explícitamente |

**Nota importante sobre el despliegue de NestJS en Vercel:** Vercel está pensado primero para Next.js y funciones que viven unos segundos (serverless); NestJS, por defecto, es un servidor que queda corriendo todo el tiempo. Ambas cosas pueden convivir, pero hay dos caminos y **hay que elegir uno explícitamente con el usuario antes de configurar el despliegue, no después**:
- (a) Adaptar NestJS al modo serverless de Vercel (es posible, pero agrega configuración adicional).
- (b) Desplegar la API de NestJS en una plataforma pensada para servidores Node persistentes con plan gratuito equivalente (Render o Railway son las más usadas para esto), y dejar Vercel exclusivamente para el dashboard web del punto (a) cuando se construya.

No asumas ninguna de las dos por defecto ni la elijas en silencio — preguntale al usuario cuál prefiere antes de tocar la configuración de despliegue.

## Jerarquía de documentos (quién manda sobre qué)

| Documento | Manda sobre | No manda sobre |
|---|---|---|
| `CONTEXTO_RAVIX.md` | Evaluaciones, escala A–F, RPE, perfiles de inscripción, estado del proyecto, qué está confirmado vs. pendiente | El esquema de la biblioteca de tareas de entrenamiento (son entidades separadas por diseño, Sección 0.1 de la biblioteca) |
| `BIBLIOTECA_TAREAS_ESTRUCTURA.md` | El esquema completo de tareas de entrenamiento: pilares, tags, niveles, modificadores, campos de Supabase | Cualquier cosa de evaluación o testing |
| `RAVIX_EVALUACIONES_ESTRUCTURA.md` | El esquema de las evaluaciones confirmadas: Velocidad Lineal 30 m, 30-15 IFT, Velocidad de Reacción (4 niveles) — campos, fórmulas, reglas de comparación histórica | Cualquier cosa de tareas de entrenamiento. No agrega tests que no tengan su propio manual confirmado (Regla 0.3 de ese archivo) |
| `RAVIX_protocolo_testing_y_marco_teorico.md` | Bibliografía y fundamento teórico general | Nunca se usa como fuente de tags ni de campos de la app — es lectura de fondo, no esquema |
| `RAVIX_ADN_manifiesto.md` | El vocabulario y tono con que el cuerpo técnico habla de la metodología (Caos Controlado, Táctica sin Pizarra) | Ningún campo de base de datos. Es discurso, no estructura. No busques "caos_controlado" en ningún schema. |

Si dos documentos parecen decir cosas distintas sobre lo mismo, gana el de la columna "Manda sobre" correspondiente al tema — nunca el más reciente ni el más detallado.

## Seis errores ya cometidos — no los repitas

**1. No dupliques un concepto con dos códigos.**
Antes de crear un tag nuevo, buscá en `BIBLIOTECA_TAREAS_ESTRUCTURA.md` Sección 2 (el diccionario completo) si ya existe. Ejemplo real: "control orientado bajo presión" y `TEC-COP` ("Control orientado y perfilado corporal") son el mismo concepto. Si generás un `TEC-COP-2` o un `TEC-CTRL-PRESION`, la mitad de las tareas van a quedar etiquetadas con uno y la mitad con el otro, y ningún filtro del dashboard las va a agrupar juntas.

**2. No crees una tabla o columna nueva para algo que ya existe en otro formato.**
La "estructura de oposición" (1v1 / 2v2-3v3 / 11v11, vocabulario de Ardá y Casal) **no es una tabla nueva**. Ya está capturada por los campos `resolucion_numerica` y `formato_numerico` de la Sección 6.5. Si te piden implementar un filtro por "microestructura/mesoestructura", el filtro se construye leyendo `formato_numerico` (contando jugadores), no agregando una columna `estructura_oposicion`.

**3. No confundas "Micro/Macro" de `densidad_espacial` con "microestructura/macroestructura" de Ardá y Casal.**
Son dos ejes distintos que coexisten en la misma tarea:
- `densidad_espacial` (Sección 6.5) = tamaño del espacio en m² por jugador. Afecta demanda física.
- Micro/meso/macroestructura (Sección 2.5) = cantidad de jugadores en oposición (1v1, 2v2/3v3, 11v11). Afecta demanda táctica.

Un 3v3 (mesoestructura) puede jugarse en densidad Micro o Macro. Si tu código usa la misma variable o el mismo enum para ambos ejes, vas a producir combinaciones sin sentido (ej. "macroestructura" con 6 jugadores).

**4. No uses una evaluación para asignar una tarea automáticamente.**
`RAVIX_EVALUACIONES_ESTRUCTURA.md` y `BIBLIOTECA_TAREAS_ESTRUCTURA.md` comparten `jugador_id` y nada más — a propósito. Un resultado de test bajo no debe escribir ni sugerir con certeza una fila en la tabla de tareas asignadas sin que el entrenador la confirme (Regla 0.2 de la biblioteca, Regla 6 del archivo de evaluaciones). Si te piden un panel de "sugeridas para este jugador", es una consulta de lectura que cruza ambas tablas con un filtro simple — nunca una escritura automática.

**5. No cites el contenido de un archivo de memoria — releelo antes de dar por cierto algo que dice.**
Ejemplo real ya ocurrido: al crear el modelo de sub-pilares, dijiste que `BIBLIOTECA_TAREAS_ESTRUCTURA.md` "solo tenía 3 pilares" y agregaste el cuarto (Cognitivo y Emocional) "porque seguramente esa es la estructura definitiva". El documento tenía los 4 pilares desde la Sección 1, sin ambigüedad — el error fue trabajar con una versión vieja o parcial en la memoria de la conversación en vez de volver a abrir el archivo real. **Si algo que creés recordar de un documento no coincide con lo que se te pide, no lo resuelvas adivinando cuál versión es la correcta: volvé a abrir el archivo y citá lo que dice ahora, o si seguís sin poder confirmarlo, decilo explícitamente y preguntá antes de continuar.**

**6. Un campo que representa una relación (lista de códigos) no se pasa directo a Prisma — hay que transformarlo.**
Ejemplo real ya ocurrido: `modificadores_avanzados` llega del cliente como `["MOD-COG-MUL"]` (array de strings), pero Prisma para una relación muchos-a-muchos espera `{ connect: [{ codigo: "MOD-COG-MUL" }] }`. Pasarlo tal cual rompe la creación. Cualquier campo del DTO que en la Biblioteca esté descripto como "lista de códigos" que conecta con otra tabla (tags, modificadores, y cualquiera que se agregue después) necesita esta transformación explícita en el service — nunca asumas que Prisma lo va a interpretar solo.

## Checklist antes de generar cualquier migración o modelo de datos

1. ¿El campo que estoy por crear ya existe en `BIBLIOTECA_TAREAS_ESTRUCTURA.md` con otro nombre? → buscar antes de crear.
2. ¿Estoy mezclando datos de evaluación (tests, escala A–F) con datos de entrenamiento (tareas)? → son tablas separadas, sin relación automática (Regla arquitectónica 0.1 y 0.2 de la biblioteca).
3. ¿Estoy tomando un concepto del manifiesto ADN (Caos Controlado, Táctica sin Pizarra) y tratando de convertirlo en un campo de base de datos? → no corresponde; es vocabulario, se usa en `objetivo_principal` o `consigna_al_jugador` como texto libre, nunca como enum.
4. ¿El total de campos obligatorios por tarea sigue siendo 19 (Sección 10.4 de la biblioteca)? → si tu esquema tiene más, probablemente duplicaste algo.
5. ¿Algún `formato_numerico` de ejemplo o semilla (`seed data`) supera 5 jugadores en total? → el techo de grupo vigente de RAVIX Academy es 5 jugadores por entrenador (ficha comercial). No generes datos de ejemplo con "3v3+1", "4v4+2" ni ningún formato de la bibliografía genérica de fútbol que exceda ese número — ver `BIBLIOTECA_TAREAS_ESTRUCTURA.md` Sección 2.6 para la tabla de formatos válidos. Toda tarea debe funcionar primero con 1 jugador solo y con 2, que es la inscripción real al lanzamiento.
6. ¿Estoy por implementar un test de evaluación que no tiene manual confirmado en `RAVIX_EVALUACIONES_ESTRUCTURA.md`? → no lo implementes por analogía con los tres que sí están confirmados (Velocidad Lineal, 30-15 IFT, Velocidad de Reacción). Cada test tiene su propio manual con sus propias fórmulas; no se generalizan entre tests.
7. ¿Un campo de `RAVIX_EVALUACIONES_ESTRUCTURA.md` Sección 5 (decisiones pendientes) está a punto de fijarse con un valor por defecto en el código? → no. Esos cinco puntos están marcados como abiertos por el propio manual del test; hay que preguntarle al usuario antes de fijar un criterio.
8. ¿Estoy por configurar cómo se despliega el servidor de NestJS? → ver la nota sobre Vercel vs. Render/Railway en "Stack Tecnológico". No elegir en silencio; preguntar primero.
9. ¿Estoy explicando algo de NestJS, Prisma o TypeScript dando por sentado que el usuario sabe backend? → no. El usuario no tiene experiencia previa en este lenguaje ni en este framework — explicar en pasos concretos y sin jerga, o el usuario no va a poder validar si lo que se hizo está bien.
10. ¿Estoy por afirmar qué dice un archivo del proyecto sin haberlo vuelto a abrir en este mismo paso? → reabrilo y citá lo que dice ahora. No completes de memoria ni "por seguramente es así" — eso ya generó un error real (ver punto 5 de la sección anterior).

## Estado del proyecto al 19/09/2026

- Stack de la API cerrado hoy: TypeScript + NestJS + Prisma + PostgreSQL (Supabase) + GitHub. Despliegue sin decidir todavía (ver nota en "Stack Tecnológico"). Se arranca por la API de la Biblioteca de Tareas únicamente — jugadores y evaluaciones quedan para después, como módulos nuevos, no como parte de este primer entregable.
- Registro inicial de datos (mientras no haya API): sin decidir (Google Sheets, Forms u otra herramienta — ver `CONTEXTO_RAVIX.md` Sección 4).
- La Biblioteca de Tareas y las Evaluaciones (Velocidad Lineal, 30-15 IFT, Velocidad de Reacción) son las dos piezas cuyo esquema está cerrado. El resto de la app (perfiles, RPE, planes Core/Pro) sigue en definición habilidad por habilidad con el usuario — no asumas campos que no estén explícitamente confirmados en `CONTEXTO_RAVIX.md`.
- Datos comerciales confirmados por la ficha "RAVIX Academy" (material de venta, no un documento de esquema de datos): inicio de clases el lunes 5 de octubre; sesiones de 60' una vez por semana; grupos de máximo 4–5 jugadores por entrenador; ciclo de 12 semanas con evaluación en semana 0 y re-test en semana 12; dos planes, Core ($4.000 UYU/mes) y Pro ($6.500 UYU/mes, incluye seguimiento psicológico directo y videoanálisis de partidos oficiales); equipo formado por Andrés Gómez (director técnico y psicólogo) y Gonzalo Antelo (director técnico y tecnología). Esta ficha es la fuente del techo de 5 jugadores usado en la Sección 2.6 de la biblioteca — si ese número cambia comercialmente, hay que actualizar ambos documentos a la vez.
