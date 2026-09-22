# Ravix Training — Contexto unificado

Actualización: 18 de septiembre de 2026. Versión 1.1.

## 1. Función y autoridad de este archivo

Este archivo reúne el contexto de Ravix Training y resuelve las diferencias entre los materiales fundacionales y las decisiones tomadas en el proyecto. Es la referencia principal para continuar el trabajo desde esta fecha.

El usuario confirmó que los criterios y métodos de evaluación se gestionan aquí, uno por uno, y autorizó unificar el RPE según el criterio técnico considerado correcto. Esta autorización permite resolver el protocolo de RPE; no permite dar por aprobados los demás tests del documento fundacional.

Estados utilizados:

- **Confirmado:** decisión expresa del usuario registrada en el proyecto.
- **Criterio unificado:** regla de trabajo establecida en esta revisión dentro de la autorización recibida.
- **Propuesta:** contenido útil de los documentos previos que aún requiere definición o validación.
- **Antecedente declarado:** información comercial u operativa de las fuentes, sin comprobación actual de su ejecución.
- **Pendiente:** cuestión que todavía no tiene una respuesta acordada.

Fuentes locales:

- `Contexto/CONTEXTO_RAVIX.md`: contexto fundacional y protocolo ampliado del 17 de septiembre de 2026.
- `Contexto/RAVIX_protocolo_testing_y_marco_teorico.md.pdf`: protocolo y marco teórico, versión 1.0, de 13 páginas.
- `Skills/ravix-evaluaciones/SKILL.md`: decisiones de perfiles, evaluaciones, historial y aplicación.
- `Materiales/Excel base.xlsx`: plantillas y escala originales.
- `Materiales/Ravix _ Inscripción y evaluación inicial (Respuestas).xlsx` y `Materiales/Bastian.pdf`: inscripción y datos de prueba.
- `Evaluaciones/Tutorial_Test_Resistencia_30-15_IFT.pdf`: tutorial de aplicación del 30-15.
- Conversaciones del proyecto sobre PC/tablet, historial, métodos y la presente unificación.

Los archivos anteriores se conservan como antecedentes. Sus reglas incompatibles con este archivo no deben aplicarse como decisiones vigentes. Una especificación escrita no demuestra que la aplicación esté implementada.

## 2. Identidad y orientación

Ravix Training es un proyecto uruguayo de entrenamiento individualizado de futbolistas, con integración de aspectos físicos, técnicos, tácticos, perceptivos y psicológicos. El contexto fundacional atribuye a Gonzalo la dirección técnica y tecnológica y a Andrés el trabajo de psicología deportiva.

**Orientación unificada:** trabajar la relación entre percepción, decisión y acción dentro de situaciones que conserven información relevante del fútbol. La tecnología sirve para medir y apoyar el entrenamiento. La transferencia debe observarse también en tareas de juego.

Los cuatro ejes del contexto fundacional son técnica bajo presión, percepción y escaneo, decisión y autorregulación psicológica. Son compatibles con las áreas de las plantillas existentes; no sustituyen sus criterios ni crean automáticamente nuevas evaluaciones obligatorias.

El servicio complementa la actividad del jugador en su club. Al programar tareas, considerar entrenamientos, partidos, recuperación y objetivos individuales. Separar carga física y demanda mental ayuda a describir la sesión, pero una carga física baja no garantiza ausencia de fatiga o impacto competitivo.

## 3. Servicio y situación operativa

**Antecedentes declarados al 17 de septiembre de 2026:**

- Programa de 12 semanas, con diagnóstico de dos sesiones, 24 entrenamientos, videoanálisis mensual y re-test final.
- Tres bloques: semanas 1–4 de base perceptiva, 5–8 de decisión contextualizada y 9–12 de transferencia y re-test.
- Servicio Core grupal a 4.000 UYU mensuales; servicio Pro con individual quincenal y análisis ampliado, precio pendiente.
- Público: juveniles, futbolistas de formativas y adultos competitivos con objetivos de desarrollo.
- Dos alumnos descritos en el contexto, sin convertir esas descripciones en registros iniciales de la aplicación.
- Negociación con Terremoto FC para uso de instalaciones y entrenamiento de jugadores designados por el club. No dar el acuerdo por cerrado.
- Cuatro sensores e iPhone 12 Pro declarados disponibles. Cámara de bolsillo en tránsito; tablet y otros materiales por adquirir en esa fecha.

El cronograma de «15 días para el lanzamiento», los viajes y los plazos de compra pertenecen al documento original. No recalcularlos ni presentarlos como compromisos actuales sin actualización del equipo.

**Pendiente:** confirmar calendario, cupos, precios vigentes, inclusión o no de diagnósticos y re-tests dentro de las 24 sesiones, y entregables para jugadores y familias.

Las afirmaciones sobre ausencia de competidores, nichos desatendidos y ventajas comerciales son hipótesis de posicionamiento, no resultados de investigación de mercado.

## 4. Aplicación y funcionamiento offline

**Confirmado:**

- Prioridad de una aplicación Windows distribuida como `.exe`.
- Futura versión Android `.apk` para tablet que conserve las funciones.
- Funcionamiento e intercambio bidireccional mediante archivos offline.
- Conservar perfiles, evaluaciones y los usuarios internos que finalmente se definan durante el intercambio.
- Uso interno inicial. La nube gratuita queda como posibilidad por estudiar.
- Tecnología, arquitectura y estrategia detallada de resolución de conflictos pendientes.

**Pendiente por decisión expresa del usuario:** cómo comenzaremos a registrar los datos. No está elegido si usaremos Google Sheets, Google Forms, otra herramienta o directamente la aplicación. Tampoco está definida una etapa previa ni una secuencia de migración. Esta cuestión incluye evaluaciones, RPE y cualquier otro registro inicial.

Los requisitos de la futura aplicación se mantienen como objetivo de desarrollo; no determinan la herramienta con la que empezaremos a trabajar. La ruta Forms/Sheets → PWA del contexto anterior es un antecedente de propuesta, sin elección vigente.

Identificadores estables, procedencia y revisiones de registros son bases recomendadas para el intercambio. `updated_at` por sí solo no resuelve modificaciones simultáneas. No elegir automáticamente la versión más reciente ni sobrescribir el historial sin definir el comportamiento.

## 5. Perfiles e inscripción

**Confirmado:** guardar todas las respuestas del formulario, permitir carga manual, edición y extracción desde documentos similares. El botón **Guardar** del perfil es independiente de **Guardar evaluación**.

Conservar identidad, nacimiento, contactos del deportista y del adulto responsable, barrio, categoría y competición, nivel declarado, posiciones, pierna dominante, calendario de entrenamiento y partidos, objetivos, videos, disponibilidad, restricciones, declaraciones de salud, cobertura sanitaria, contactos de emergencia, autorización de imagen, origen del contacto y observaciones. Conservar también la marca temporal y las respuestas originales.

No confundir correo del responsable con correo del deportista ni nombre de emergencia con identidad del jugador. La edad calculada y la franja declarada son datos distintos. Teléfonos como texto; ausencias como no informado. La declaración de aptitud no equivale a una certificación comprobada.

Preferir las respuestas explícitas del Excel de inscripción frente a selecciones ambiguas del PDF. No inventar campos ni selecciones.

**Datos de prueba:** Bastian está autorizado. Alejo no debe incorporarse como registro inicial sin concretar el alcance. Los jugadores históricos del Excel y Lucas del Valle son ejemplos, sin autorización para importar sus evaluaciones como datos iniciales.

**Propuesta pendiente:** importación con revisión de nuevos, repetidos, modificados y dudosos; reconocimiento por identidad y contenido, no por posición de fila. Teléfono y correo pueden compartirse. No sobrescribir datos existentes con vacíos ni modificar evaluaciones al importar inscripciones.

## 6. Evaluaciones: definición habilidad por habilidad

**Confirmado y ratificado el 18 de septiembre:** los métodos se definen en este proyecto uno por uno. Los tests de los antecedentes son opciones de estudio, salvo los ya acordados expresamente.

Para continuar:

1. Recuperar el nombre y la descripción originales del Excel.
2. Consultar al usuario cómo evaluar y qué registrar.
3. Documentar lo confirmado, distinguiéndolo de recomendaciones y preguntas pendientes.
4. Definir escala o medida, protocolo, unidades, intentos, evidencia y reglas de comparación cuando corresponda.
5. Avanzar a la siguiente habilidad después de registrar la decisión.

No inventar pruebas, anclas, umbrales, fórmulas ni equivalencias para completar una plantilla. No convertir la biblioteca de tests fundacionales en una batería obligatoria.

Plantillas confirmadas:

| Área | Campo | Portero |
|---|---:|---:|
| Física | 8 | 9 |
| Técnica | 13 | 10 |
| Táctica | 13 | 6 |
| Emocional | 13 | 13 |
| Total | 47 | 38 |

Conservar los criterios y descripciones originales por ahora. Aplicar la plantilla correspondiente. No se ha aprobado un editor público de criterios.

### Escala Ravix

Se conservan seis niveles ordenados A–F, sus colores y sus significados, quitando «para la categoría».

| Nivel | Significado | Color |
|---|---|---|
| A | Excelente | #00FFC8 |
| B | Muy bueno | #04FF00 |
| C | Bueno | #92D050 |
| D | Necesita trabajar esta área para mejorar | #FFFF00 |
| E | Necesita trabajar mucho esta área para mejorar | #FFC000 |
| F | Necesita trabajar urgente esta área para mejorar | #FF0000 |

Mantener letra y texto visibles además del color. Los niveles no tienen distancias numéricas iguales demostradas ni permiten calcular porcentajes de mejora. La escala 1–5 del contexto previo no sustituye A–F.

Las referencias conductuales por nivel pueden desarrollarse durante la definición de cada habilidad. Ninguna está aprobada por aparecer como ejemplo en el documento fundacional.

El símbolo `-` no es un séptimo nivel. La separación entre «sin evaluar» y «no aplica» continúa pendiente. Una ausencia no es cero ni F.

### Resistencia: método acordado

Campo: «Capacidad de sostener el esfuerzo durante el partido».

Evaluar únicamente con el test 30-15 IFT, sin Escala Ravix. Registrar en la evaluación fechada:

- Velocidad final alcanzada, VIFT.
- Distancia total recorrida.
- Último estadio completado.

El tutorial de Evaluaciones sirve de referencia de aplicación. La definición final de unidades, obligatoriedad, representación del estadio, cálculos derivados y flechas dentro de la aplicación sigue pendiente. Yo-Yo IR1 no queda habilitado como sustituto automático.

### Próxima habilidad

**Velocidad de reacción**, aspectos físicos: «Capacidad de responder rápidamente a los estímulos». Su método todavía no está confirmado. Continuar después con las restantes habilidades de campo y luego porteros.

## 7. Sesiones e historial

**Confirmado:** evaluaciones independientes y fechadas; registro mediante **Guardar evaluación**; se permite evaluar solo una parte de la plantilla.

Cada habilidad mantiene historial propio. Comparar con el último resultado anterior de esa misma habilidad, saltando sesiones sin evaluación. Mostrar ↑ verde si mejora, ↓ rojo si empeora y `-` si no hay referencia previa o no cambió, según las reglas del método acordado.

Conservar sesiones anteriores y sus observaciones. Ordenar por fecha de evaluación, más recientes primero; distinguirla de creación e importación. El aviso pertenece a cada habilidad. No crear nota total ni promedio como sustituto del seguimiento.

Para medidas objetivas, definir qué significa mejorar y qué cambios pueden interpretarse antes de asignar flechas. Conservar método, versión y condiciones para identificar comparaciones incompatibles. «Evolución hasta el momento» del Excel sigue siendo una apreciación manual distinta del cálculo del historial.

La edición de sesiones, empates temporales y comparaciones generales por fecha siguen pendientes.

## 8. RPE: protocolo unificado

**Criterio unificado por autorización del usuario el 18 de septiembre de 2026.** Sustituye el registro anterior 1–10 y las instrucciones contradictorias del contexto fundacional.

### Qué se registra

- **RPE de sesión:** percepción global del esfuerzo de todo el entrenamiento. Campo `rpe_sesion`, escala operativa 0–10 con valores enteros, basada en el enfoque de session-RPE de Foster. Evitar llamarlo medida exclusivamente física.
- **Esfuerzo mental percibido:** valoración separada de la demanda de atención, lectura y decisión de toda la sesión. Campo `rpe_mental`, escala interna 0–10 con valores enteros. No presentarlo como un instrumento psicológico validado ni como medida directa de capacidad cognitiva.

Para ambos, 0 representa ausencia de esfuerzo y 10 el máximo de la escala operativa. Familiarizar al deportista con cada pregunta y mantener las mismas instrucciones. Esta versión acotada y entera es un protocolo operativo de Ravix; no reproduce íntegramente la CR10 original, que admite valores intermedios y respuestas superiores a 10.

Preguntas estables:

- RPE de sesión: «Considerando todo el entrenamiento, ¿qué tan duro te resultó el esfuerzo de esta sesión?»
- Mental: «Considerando todo el entrenamiento, ¿cuánto esfuerzo mental te exigió atender, leer la situación y decidir?»

Para la futura aplicación se mantiene el requisito de un botón **RPE** dentro del perfil. Los datos deben conservar historial por deportista y sesión, cualquiera sea la herramienta inicial que se elija. El medio de recogida y registro inicial permanece pendiente. El entrenador registra lo expresado por el jugador, sin asignarle una nota estimada.

### Cuándo y cómo

Recoger ambas respuestas **30 minutos después de terminar la sesión**, de forma individual y sin escuchar respuestas de compañeros. El intervalo de 30 minutos se utiliza para estandarizar la valoración global de sesión; recoger el esfuerzo mental en ese mismo momento es una decisión operativa de Ravix, no una validación científica específica de esa escala.

Al cierre de los 60 minutos de entrenamiento se da feedback y se explica cómo responder después. La recogida del RPE ocurre fuera de ese bloque de cierre. No mezclar valoraciones inmediatas con las de 30 minutos sin identificar la diferencia.

Si una respuesta llega en otro momento, guardar la hora real y el intervalo desde el final, sin modificarlo para aparentar cumplimiento. Marcarla como fuera de protocolo. Una respuesta ausente se conserva como ausente, nunca como cero. No se ha decidido automatizar avisos o usar WhatsApp para recogerla.

Antes de entrenar puede recogerse bienestar: sueño, fatiga, dolor muscular, estrés y ánimo. Esto describe el estado previo y es independiente del RPE de sesión. Los ítems, instrucciones y sentido de la escala de bienestar quedan pendientes; no calcular un promedio de escalas con direcciones distintas.

### Carga de sesión

`carga_sRPE = rpe_sesion × duracion_real_minutos`

Unidad: unidades arbitrarias (UA). Ejemplo: RPE 6 y 60 minutos = 360 UA.

Usar la duración real del entrenamiento del deportista, incluidos calentamiento, bloques, recuperaciones previstas y vuelta a la calma; excluir la espera de 30 minutos para responder. Guardar duración y RPE originales además del resultado derivado. Si falta cualquiera de los dos, la carga permanece sin calcular. No incluir el RPE mental en esta fórmula ni sumar ambos valores. No denominar el resultado «carga física objetiva».

### Interpretación

El RPE describe esfuerzo y carga percibida. No recibe A–F ni flechas automáticas de mejora o empeoramiento.

Una disminución del esfuerzo ante una tarea comparable puede ser compatible con adaptación, pero también debe revisarse el rendimiento, la dificultad, la duración, la implicación y el estado previo. Un esfuerzo mental mayor puede reflejar una tarea más exigente o mayor dificultad para resolverla. Ninguna combinación de RPE demuestra progreso por sí sola.

Eliminar la regla previa «RPE físico baja + RPE mental sube = progreso». Mantener separadas las series de RPE global y mental y no comparar datos recogidos con preguntas o protocolos diferentes como si fueran equivalentes.

Si existen registros previos 1–10, conservar valor, pregunta, escala y momento originales. No convertirlos silenciosamente a la nueva versión ni fabricar datos mentales retroactivos.

### Fuentes del protocolo

- [Foster et al. (2001), A new approach to monitoring exercise training](https://pubmed.ncbi.nlm.nih.gov/11708692/): fundamento del session-RPE y de la carga por duración.
- [Texto del estudio de Foster et al.](https://paulogentil.com/pdf/A%20New%20Approach%20to%20Monitoring%20Exercise%20Training.pdf): procedimiento de recogida a los 30 minutos.
- [Borg, instrucciones originales CR10](https://borgperception.se/cr10stinstr/): referencia para distinguir la escala original de la versión operativa acotada de Ravix.

## 9. Tareas, video y calendario: propuestas compatibles

El contexto propone cinco niveles de tareas: diagnóstico aislado; estímulo con técnica cerrada; decisión condicional; información real de compañero, rival o espacio; juego reducido. Esta progresión es una referencia para diseñar entrenamiento, independiente de A–F. Los límites porcentuales y cupos deben validarse en la operación.

La sesión propuesta de 60 minutos distribuye 5 minutos de bienestar y activación, 10 de movilidad y prevención, 10 de técnica, 20 de decisión, 10 de transferencia y 5 de cierre. Es una plantilla de planificación; no obliga a aplicar un micro-test cuyo método aún no se haya acordado. El RPE se recoge después según la sección 8.

El calendario de ingreso, control en semana 6 y re-test en semana 12 puede coexistir con evaluaciones parciales. Su contenido definitivo dependerá de los métodos que se confirmen habilidad por habilidad. No exigir completar todas las habilidades en cada entrenamiento.

Escaneo, orientación corporal y primer toque pueden estudiarse por video con definiciones operativas y revisión entre evaluadores. El ángulo y la altura de cámara deben permitir observar la conducta; 3 metros no es un requisito universal demostrado.

Conectar resultados con objetivos y tareas es una propuesta útil. La asignación automática por calificación todavía no está aprobada. El equipo decide el trabajo adecuado al contexto del jugador.

## 10. Calidad de las mediciones

**Criterio unificado:** distinguir dato medido de observación profesional, conservar resultados y evidencia disponible, repetir protocolos comparables y comunicar límites de interpretación.

- La resolución de video a 240 fps es aproximadamente 0,0042 segundos por fotograma; no equivale al error total del método.
- Los tiempos de respuesta que incluyen desplazamiento contienen percepción y ejecución motora. Con distintas distancias y acciones, TRE − TRS no aísla «decisión pura».
- Los cambios en tests con sensores o doble tarea deben contrastarse con transferencia al juego y con aprendizaje del propio test.
- Los errores típicos, cambios detectables y relevantes requieren protocolo y población adecuados. Las cifras de los antecedentes no son umbrales aprobados para las flechas.
- Los umbrales de fatiga, asimetría o lesión del documento anterior no generan diagnósticos ni decisiones automáticas.
- No convertir correlaciones en demostraciones de eficacia del programa ni usar porcentajes ilustrativos como resultados reales.

La bibliografía fundacional es material de consulta. La incorporación de un test debe examinar su fuente, fiabilidad, condiciones de aplicación y utilidad antes de aprobar su uso en Ravix.

## 11. Psicología, privacidad y devoluciones

La selección, aplicación e interpretación de instrumentos psicológicos corresponde al profesional responsable. No inferir etiquetas psicológicas de errores en sensores, RPE o tiempos de reacción.

El contexto propone visibilidad privada, cuerpo técnico, jugador y tutor, y devoluciones resumidas. Incorporar la confidencialidad como requisito de diseño; el detalle de roles, accesos, consentimientos y exportaciones aún debe concretarse con el equipo.

Un campo de visibilidad no protege datos por sí solo: el futuro sistema debe aplicar restricciones en consultas, informes e intercambio. No publicar observaciones psicológicas ni incluirlas en una devolución externa por defecto.

Los informes externos, periodicidad, contenido y formatos siguen pendientes. No dar por aprobado que familias o jugadores reciban toda la ficha o las observaciones internas. Las recomendaciones sanitarias y de entrenamiento en menores requieren revisión del profesional correspondiente.

## 12. Datos y próximos pasos

El diseño debe conservar perfiles completos, sesiones, evaluaciones parciales, resultados por habilidad, escala o método y su versión, intentos cuando se acuerden, observaciones, evidencia, evaluadores, procedencia y registros de RPE. No congelar todavía un esquema que omita campos de inscripción o decisiones en construcción.

El formato largo de mediciones y los identificadores estables son recomendaciones compatibles con ampliar el catálogo. Separar escalas ordinales, medidas objetivas y monitoreo de carga. La ausencia de datos no genera deterioro.

Prioridad inmediata: retomar **Velocidad de reacción** con su descripción original y definir el método con el usuario. Después continuar las habilidades restantes y mantener este contexto actualizado con cada decisión.

Pendientes de proyecto: elección de la herramienta y del procedimiento inicial de registro, métodos restantes, reglas de comparación objetiva, detalle de importación y conflictos, edición de evaluaciones, permisos, bienestar, informes y calendario comercial actualizado.

## 13. Cambios resueltos en esta versión

| Diferencia anterior | Criterio vigente |
|---|---|
| A–F frente a 1–5 | Conservar A–F; métodos y referencias definidos aquí uno por uno. |
| Batería completa obligatoria frente a sesiones parciales | Permitir sesiones parciales; calendario completo como propuesta. |
| 30-15 frente a alternativa Yo-Yo | Resistencia con 30-15 y sus tres registros acordados. |
| EXE/APK frente a ruta obligatoria PWA | Prioridad EXE, futura APK, intercambio offline; otras rutas como alternativas. |
| Herramienta para comenzar a registrar | Indefinida: Google Sheets, Forms, otra herramienta o la app; sin etapa previa ni migración elegidas. |
| RPE 1–10 frente a CR10 y mental | RPE global de sesión operativo 0–10 y mental separado, con versión identificada. |
| RPE al cierre frente a 30 minutos después | Recogida individual a los 30 minutos; hora real registrada. |
| Cambio de RPE interpretado como progreso | Monitoreo de esfuerzo sin flechas ni inferencia automática de progreso. |
| Fórmulas y umbrales dados por aprobados | Validación y definición por método antes de aplicarlos. |
| Planes, compras y negociaciones tratados como hechos actuales | Antecedentes fechados; ejecución pendiente de actualización. |

No cambiar criterios de evaluación ni afirmar implementación sin nueva evidencia o decisión del usuario.
