# RAVIX — Biblioteca de Tareas · Esquema de Datos

> **Referencia:** CONTEXTO_RAVIX.md v1.1, Sección 9.
> **Fecha:** 18 de septiembre de 2026. v1.3 — v1.2 incorporó vocabulario de Ardá/Casal (*Metodología de la Enseñanza del Fútbol*), Perarnau (*Senda de Campeones*) y técnica específica de volantes. v1.3 corrige todos los formatos numéricos al techo real de grupo de la academia (máximo 5 jugadores por entrenador, según el material comercial RAVIX Academy) y fija el diseño individual/de a dos como punto de partida obligatorio de toda tarea — no como una limitación temporal, sino como principio de diseño (Sección 0, regla 9).
> **Estado:** Arquitectura de base de datos finalizada — pendiente de carga de tareas concretas.

---

## 0. Reglas Arquitectónicas

Estas reglas gobiernan toda la biblioteca. Si una tarea las viola, no se registra.

1. **Evaluaciones y entrenamiento son entidades separadas.** Esta biblioteca contiene exclusivamente tareas de entrenamiento. Los códigos de evaluación de la batería de tests **no se usan** como identificadores ni como categorías en esta biblioteca.
2. **La escala A–F no se aplica a tareas de entrenamiento.** No existe asignación automática de tareas por calificación obtenida en una evaluación. El equipo técnico decide qué trabajo corresponde al contexto del jugador.
3. **Una tarea tiene una familia, un nivel y variantes escritas.** Cada entrada representa una tarea en un nivel específico de progresión. La misma familia de tarea puede aparecer en varios niveles, cada uno con su variante descrita.
4. **Etiquetado muchos-a-muchos.** Un mismo ejercicio puede estar etiquetado con múltiples sub-pilares de distintos pilares (ej: "Pase corto" + "Lectura del juego" + "Concentración"). Esto permite filtrado cruzado en el dashboard del DT.
5. **Modificadores Avanzados.** Toda tarea base puede ser alterada mediante estresores cognitivos (CogiTraining) o ruido motor (Aprendizaje Diferencial) sin necesidad de crear una tarea nueva, añadiendo una capa de complejidad.
6. **El campo de video/imagen queda previsto pero puede estar vacío.** No es obligatorio para registrar una tarea.
7. **Posiciones recomendadas no son excluyentes.** Toda tarea puede usarse con cualquier jugador; la columna orienta pero no restringe.
8. **Antes de crear un código nuevo, revisar el diccionario completo (Sección 2).** Un concepto que ya tiene código no recibe un segundo código con otro nombre. Ver Sección 2.5 para el criterio de resolución de conceptos que se solapan entre sí o con campos ya existentes en la Sección 6.5.
9. **Techo de grupo vigente: 5 jugadores en total por entrenador** (Core y Pro, según el material comercial RAVIX Academy). Ninguna tarea se carga con un `formato_numerico` cuya suma total de jugadores supere 5 — eso descarta formatos como "3v3+1" (7), "4v4+2" (10) o "2v2+2" (6), habituales en la literatura genérica de fútbol pero inviables con la capacidad real de la academia. Toda tarea debe además poder ejecutarse, sin rediseñarse, con **1 solo jugador** (contra pared, rebotador o sensor) o **2 jugadores**, que es la inscripción real al lanzamiento, y escalar desde ahí hasta el techo de 5 a medida que se sumen alumnos. Ver Sección 2.6 para el fundamento y la tabla de formatos válidos.

---

## 1. Categorización Central — Los 4 Pilares

Toda tarea se etiqueta con sub-pilares provenientes de estas cuatro familias:

| Pilar | Alcance |
|---|---|
| **Físico** | Cualidades físicas y motoras que sostienen la acción |
| **Técnico** | Gestos y mecánica de ejecución con y sin balón |
| **Táctico** | Comprensión y aplicación de principios de juego en contexto |
| **Cognitivo y Emocional** | Procesos mentales, atencionales, emocionales y de conducta |

---

## 2. Diccionario Oficial de Sub-Pilares (Tags)

Fuente: matriz de evaluación oficial de RAVIX, ampliada con vocabulario de Ardá/Casal y Perarnau. Cada sub-pilar tiene un código único para uso interno de la biblioteca.

### 2.1 Físico

| Código | Sub-pilar | Descripción |
|---|---|---|
| FIS-FTI | Fuerza del tren inferior | Potencia en saltos, disputas, arranques, disparos |
| FIS-FTS | Fuerza del tren superior | Para acciones cuerpo a cuerpo, por bajo y por alto |
| FIS-AGI | Agilidad y desplazamiento corto | Movilidad rápida y coordinada dentro del área |
| FIS-VRE | Velocidad de reacción | Capacidad de responder rápidamente a los estímulos |
| FIS-VMA | Velocidad máxima | Pico de velocidad en distancias largas |
| FIS-ELA | Elasticidad / flexibilidad | Rango de movimiento en estiradas y bloqueos |
| FIS-CMO | Coordinación mano-ojo | Precisión al atajar remates o cortar centros |
| FIS-EQC | Equilibrio y coordinación | Estabilidad corporal, sostiene conducción, giros y control |
| FIS-CCO | Composición corporal | Estado de peso, masa muscular, grasa |

### 2.2 Técnico

| Código | Sub-pilar | Descripción |
|---|---|---|
| TEC-ATA | Técnica de atajada | Posición corporal, manos y orientación del cuerpo |
| TEC-DBL | Desvíos y bloqueos | Uso de manos y cuerpo para evitar goles |
| TEC-JAE | Juego aéreo y salidas | Precisión y timing para cortar centros y despejes |
| TEC-CMN | Control con manos | Seguridad en atrapadas de remates o rebotes |
| TEC-RPM | Reposición con manos | Precisión, rapidez y decisión para iniciar ataques |
| TEC-PAC | Pase corto | Precisión, timing y uso de ambos perfiles |
| TEC-PAL | Pase largo | Dirección, potencia y precisión de envíos a distancia |
| TEC-1V1 | Uno contra uno | Capacidad de achicar con técnica y decisión |
| TEC-CPT | Control y primer toque | Capacidad de controlar balón con distintas superficies |
| TEC-COP | Control orientado y perfilado corporal | Recepción bajo presión orientada, orientación del cuerpo. **Cubre "control orientado bajo presión" — no crear un código adicional para ese concepto (ver 2.5).** |
| **TEC-PCR** | **Pared + cambio de ritmo** | **Combinación de pase de pared (1-2) seguida de un cambio de velocidad en la carrera o la conducción posterior. Fuente: dossier de técnica específica de volantes.** |
| **TEC-PDE** | **Pase diagonal al espacio** | **Pase diagonal dirigido a un espacio para que el compañero llegue en carrera, no al pie. Fuente: dossier de técnica específica de volantes.** |

### 2.3 Táctico

| Código | Sub-pilar | Descripción |
|---|---|---|
| TAC-UBA | Ubicación en el arco | Posicionamiento según ángulo, balón, defensa y arco |
| TAC-LDJ | Lectura del juego | Anticipación de jugadas |
| TAC-COM | Comunicación en defensa | Ordena la línea, avisa coberturas, grita cuando sale |
| TAC-COB | Cobertura fuera del área | Actuación como líbero en pelotas largas o filtradas |
| TAC-SAL | Participación en salida de balón | Se muestra y apoya la posesión ("toco y salgo" — ver TAC-JDP para su opuesto) |
| TAC-ABP | Interpretación de jugadas a balón parado | Ubicación, organización de la barrera, continuidad |
| **TAC-3HM** | **Tercer hombre** | **Circuito de tres jugadores en el que el receptor final se desmarca aprovechando que el marcador quedó pendiente del segundo pase. Fuente: Perarnau, *Senda de Campeones* (relato de Xavi Hernández).** |
| **TAC-HLB** | **Hombre libre** | **Generación de superioridad numérica atrayendo marcas para liberar a un compañero sin marcador directo. Fuente: Perarnau, *Senda de Campeones*.** |
| **TAC-JDP** | **Juego de posición ("toco y me quedo")** | **Mantener la estructura posicional después del pase en lugar de desplazarse ("toco y me quedo"), a diferencia de la conservación ("toco y salgo", TAC-SAL). El jugador debe reconocer cuál de las dos conductas corresponde a cada momento del juego. Fuente: Perarnau, *Senda de Campeones*.** |

### 2.4 Cognitivo y Emocional

| Código | Sub-pilar | Descripción |
|---|---|---|
| EMO-ACE | Actitud y esfuerzo | Disposición al trabajo, intensidad en partidos y entrenos |
| EMO-RES | Resiliencia | Respuesta ante el error, la presión o frustración |
| EMO-CON | Concentración | Nivel de atención sostenida durante tareas o partido |
| EMO-AUC | Autoconfianza | Se muestra seguro de sus acciones y decisiones |
| EMO-CEF | Comunicación efectiva | Habla en cancha, escucha, se relaciona con el equipo |
| EMO-GEM | Gestión emocional | Manejo de emociones, evita reacciones negativas |
| EMO-RSP | Responsabilidad | Puntualidad, compromiso, cuidado personal |
| EMO-ACO | Actitud competitiva | Mentalidad para imponerse en duelos, sale a ganar |
| EMO-ACR | Actitud frente a la crítica | Recepción de correcciones o instrucciones |
| EMO-RGR | Relación con el grupo | Integración con compañeros, respeto y colaboración |
| EMO-CCS | Comprensión de consignas | Entiende lo que se le pide, en tareas y en partido |
| EMO-ASI | Asistencia a los entrenamientos | ¿Asiste y está comprometido con su proceso? |

### 2.5 Estructura de Oposición — vocabulario de referencia, NO una tabla de tags nueva

Ardá y Casal (*Metodología de la Enseñanza del Fútbol*) clasifican toda situación de juego en tres escalas:

- **Microestructura** — el 1v1: duelo individual atacante/defensor, la unidad de oposición más básica.
- **Mesoestructura** (colaboración-oposición parcial) — 2v2 y 3v3, que según Garganta es la estructura mínima que ya contiene balón + dos receptores + marcaje y cobertura. La búsqueda de superioridad numérica (2v1, 3v2) es un **principio general** que atraviesa tanto la microestructura como la mesoestructura — no una tercera categoría con nombre propio dentro de la fuente.
- **Macroestructura** (colaboración-oposición total) — el 11v11. Fuera del alcance operativo de RAVIX, que trabaja en grupos de hasta 5 jugadores por entrenador; queda como marco conceptual, no como campo de la base de datos.

**Esta clasificación NO se agrega como tabla de tags ni como columna nueva.** La Sección 6.5 de esta biblioteca ya captura exactamente esta información mediante `resolucion_numerica` (Igualdad/Superioridad/Inferioridad) y `formato_numerico` (texto libre: "1v1", "3v2", "2v2+1 comodín"...). Crear una segunda tabla paralela para lo mismo produce el riesgo real de que una tarea quede etiquetada de un modo en un campo y de otro modo en el otro, sin que nada lo detecte.

**Uso correcto:** el vocabulario micro/meso/macroestructura es para que el cuerpo técnico hable con las mismas palabras al diseñar y discutir tareas (igual que "Caos Controlado" y "Táctica sin Pizarra" en el manifiesto ADN RAVIX) — no se carga en ningún campo de Supabase. Quien programa la app no necesita construir nada para esta sección; ya está resuelta por los campos existentes.

### 2.6 Diseño individual-primero: fundamento y formatos válidos

RAVIX arranca con 2 alumnos inscriptos y un techo comercial de 5 jugadores por entrenador (RAVIX Academy, ficha de producto). Esto no es una restricción a tolerar hasta que crezca la matrícula: es, de hecho, el formato que usan los sistemas de entrenamiento técnico-cognitivo más avanzados del fútbol profesional.

- El **Footbonaut** (Borussia Dortmund, Hoffenheim) — la máquina de entrenamiento técnico-reactivo más citada del fútbol de élite — es estrictamente individual: un jugador solo, sin compañeros ni rivales, resolviendo estímulos de pase y control contra un sistema automatizado. No necesita partido ni grupo para entrenar percepción, decisión y ejecución bajo presión.
- El **CogiTraining** de Michel Bruyninckx (Bélgica) — la fuente directa de los estresores cognitivos de esta biblioteca (Sección 4.1) — se desarrolló y se sigue aplicando mayormente en sesiones individuales o de muy pocos jugadores, no en formatos grandes.
- Un estudio de Sannicandro (2017, Italia) que comparó 3v3, 4v4 y 5v5 en juveniles encontró que **los formatos más chicos generan mayor intensidad física por jugador**, y que la ganancia de trabajar con más gente es la frecuencia total de toques del equipo — no la calidad de la decisión individual, que en formatos reducidos es, si acaso, más exigente por jugador, no menos.

**Conclusión operativa:** ningún ejercicio de esta biblioteca depende de tener un grupo grande para ser válido. Cada tarea se diseña primero para 1 jugador (contra sensor, pared o rebotador) y para 2 (1v1 o cooperativo), y su escalabilidad hacia arriba se resuelve con los campos ya existentes de la Sección 6.8 (`variante_mas_dificil`) y 6.5 (`resolucion_numerica`), nunca inventando un formato nuevo que dependa de más jugadores de los que la academia tiene.

**Tabla de formatos numéricos válidos** (total de jugadores ≤ 5, sin contar al entrenador):

| Formato | Total jugadores | Resolución numérica | Uso típico |
|---|---|---|---|
| 1 (solo, vs. sensor/pared/rebotador) | 1 | — | Niveles 1–2, todos los pilares |
| 1v1 | 2 | Igualdad | Duelo (microestructura), técnica bajo oposición real |
| 2v1 | 3 | Superioridad | Salida de balón, aparición del hombre libre (TAC-HLB) |
| 3v1 | 4 | Superioridad | Circuito de pases, tercer hombre con apoyo amplio |
| 2v2 | 4 | Igualdad | Mesoestructura básica, juego de posición (TAC-JDP) |
| 3v2 | 5 | Superioridad | Techo actual — tercer hombre, hombre libre con oposición real |
| 2v2+1 comodín | 5 | Superioridad | Rondo con apoyo, conservación bajo presión |

Ningún `formato_numerico` cargado en esta biblioteca debe exceder la fila "3v2" o "2v2+1" en cantidad total de jugadores mientras el techo comercial siga en 5. Si en el futuro la academia amplía su capacidad por entrenador, esta tabla se actualiza — no se cargan formatos por encima del techo vigente "por si acaso".

---

## 3. Lógica de Etiquetado (Muchos-a-Muchos)

### Modelo relacional

```
┌──────────────┐       ┌─────────────────────┐       ┌──────────────────┐
│    TAREAS     │──M:N──│  TAREA_SUBPILARES    │──M:N──│   SUB-PILARES    │
│              │       │ (tabla intermedia)   │       │   (diccionario)  │
│ id_tarea     │       │ id_tarea             │       │ codigo           │
│ nombre       │       │ codigo_subpilar      │       │ nombre           │
│ familia      │       │ es_principal (bool)  │       │ pilar_padre      │
│ nivel        │       │                     │       │ descripcion      │
│ ...          │       └─────────────────────┘       └──────────────────┘
└──────────────┘
```

### Reglas de la relación

1. **Mínimo 1 tag obligatorio** por tarea (el sub-pilar principal que describe el foco del ejercicio).
2. **Sin máximo fijo.** Un ejercicio global de Nivel 5 puede tener 4–5 tags de distintos pilares.
3. **Campo `es_principal`:** Dentro de los tags de una tarea, al menos uno debe marcarse como principal. Esto determina bajo qué pilar aparece la tarea por defecto en el dashboard.
4. **Filtrado cruzado:** El frontend debe permitir filtrar por cualquier combinación de sub-pilares.

---

## 4. Modificadores Avanzados (Perturbaciones y Estresores)

Las tareas base pueden complejizarse en el frontend aplicando modificadores. Estos se dividen en estresores cognitivos (basados en la metodología CogiTraining) y vectores de variabilidad (basados en el Aprendizaje Diferencial).

> **Regla de Interfaz "Maximizador de Estrés":** El sistema (Dashboard del DT) emitirá una alerta y bloqueará la asignación si se intentan activar **más de 2 modificadores avanzados** simultáneos en la misma tarea (idealmente máximo 1 cognitivo y 1 diferencial). El objetivo es proteger la zona de aprendizaje del atleta, evitando el colapso de la memoria de trabajo, el sobre-entrenamiento y la frustración térmica del sistema nervioso.

### 4.1 Estresores Cognitivos (CogiTraining)

Estos modificadores saturan la memoria de trabajo o la percepción para forzar a que el gesto motor se vuelva instintivo (competencia inconsciente).

| Código | Modificador | Descripción |
|---|---|---|
| MOD-COG-MUL | Multitasking | Restricciones de memoria de trabajo (cálculos matemáticos, dictado de patrones, conteo regresivo) simultáneas a la ejecución motora. |
| MOD-COG-SIN | Sincronización Rítmica | Uso de marcadores de tiempo (metrónomo) o sincronización obligatoria de movimientos con compañeros para control bilateral fluido. |
| MOD-COG-ESP | Mirroring (Espejo) | Ejercicios de reacción donde el jugador debe copiar o anticipar instantáneamente los gestos y movimientos de su compañero. |

### 4.2 Vectores de Variabilidad (Aprendizaje Diferencial)

Estos modificadores introducen ruido y fluctuaciones en el sistema motor para forzar la adaptabilidad del atleta, evitando la repetición mecanizada.

| Código | Modificador | Descripción |
|---|---|---|
| MOD-DIF-ESP | Espacios y Distancias | Alteración asimétrica de distancias, dimensiones del área de ejecución o ubicación de objetivos. |
| MOD-DIF-TMP | Velocidad y Tiempo | Modificación impredecible de velocidades de ejecución o tiempos de aceleración obligatorios. |
| MOD-DIF-IMP | Implementos | Cambio en las características del balón (tamaño, peso, balones irregulares). |
| MOD-DIF-SUP | Superficies de Apoyo | Alteración del terreno de juego (arena, colchonetas, césped irregular) o uso de calzado asimétrico. |

---

## 5. Niveles de Progresión (Sección 9 del Contexto Unificado)

Cada tarea se ubica en exactamente **uno** de estos niveles. Una misma familia de tarea puede tener entradas en los 5 niveles, cada una con su variante específica escrita.

| Nivel | Nombre | Descripción (Sección 9) | Rol del sensor |
|---|---|---|---|
| **1** | Diagnóstico aislado | Ejecución sin balón o sin contexto de juego. Solo calibración y medición. | Protagonista |
| **2** | Estímulo + técnica cerrada | El sensor dicta superficie, perfil, dirección o acción. Sin oposición. Ejecución cerrada. | Dictador de acción |
| **3** | Decisión condicional | El sensor impone una regla condicional (ej: si se enciende antes → 1 toque; si no → conduce). Empieza la toma de decisión. | Regulador condicional |
| **4** | Información real | El estímulo pasa a ser un compañero, un defensor, un espacio que cambia. El sensor queda como medidor o distractor periférico. | Secundario / medidor |
| **5** | Juego reducido | Sin sensores. Se trabaja en formato de juego con restricciones. Decisión y ejecución en contexto real. | Ninguno |

---

## 6. Ficha-Tipo de una Tarea (Campos)

Cada tarea registrada en la biblioteca debe contener los siguientes campos:

### 6.1 Identificación

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `id_tarea` | Texto | ✅ | Identificador único (ej: `TEC-PAC-N2-001`) |
| `nombre` | Texto | ✅ | Nombre descriptivo corto (ej: "Pase corto con sensor de color") |
| `familia` | Texto | ✅ | Nombre de la familia a la que pertenece (ej: "Pase corto") — agrupa todas las variantes por nivel |

### 6.2 Clasificación (Etiquetas)

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `tags` | Lista de códigos | ✅ (mín. 1) | Sub-pilares que trabaja la tarea. Códigos de la Sección 2 (ej: `["TEC-PAC", "TAC-LDJ", "EMO-CON"]`). Relación muchos-a-muchos. |
| `tag_principal` | Código | ✅ | El sub-pilar dominante. Determina bajo qué pilar aparece la tarea por defecto en el dashboard. |

### 6.3 Progresión

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `nivel` | Entero (1–5) | ✅ | Nivel de progresión según Sección 5 |
| `variante` | Texto largo | ✅ | Descripción completa de QUÉ cambia en este nivel respecto a los otros. Es la esencia de la tarea. |

### 6.4 Metadatos de Aplicación Práctica

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `naturaleza` | Enum | ✅ | **Analítico** (gesto repetido en condiciones controladas) / **Global** (situación de juego con múltiples soluciones) |
| `bloque_sesion` | Enum | ✅ | Bloque de la sesión de 60' donde encaja la tarea. Valores: **Activación** (0–5') · **Movilidad/Prevención** (5–15') · **Técnica** (15–25') · **Decisión** (25–45') · **Transferencia** (45–55') |
| `duracion_estimada` | Texto | ✅ | Tiempo estimado de la tarea (ej: "8–10 min") |
| `carga_estimada_rpe_fisico` | Entero (1–10) | ✅ | Sugerencia de exigencia física de la tarea. Útil para filtrar en días previos a partido. |
| `carga_estimada_rpe_mental` | Entero (1–10) | ✅ | Sugerencia de exigencia cognitiva/mental de la tarea. |
| `jugadores_min` | Entero | ✅ | Mínimo de jugadores para ejecutar la tarea |
| `jugadores_max` | Entero | ✅ | Máximo de jugadores recomendado |
| `posiciones_recomendadas` | Lista | ❌ | Posiciones para las que la tarea es especialmente útil (ej: "Volante central, Enganche"). **No excluyente.** |

### 6.5 Estructura de Juego (Espacios Reducidos)

Estos campos aplican a tareas de Nivel 4 y 5 (y opcionalmente a Nivel 3). Para tareas analíticas de Nivel 1–2 se dejan en `null`. **Estos campos son también los que capturan la microestructura/mesoestructura/macroestructura de Ardá/Casal — ver Sección 2.5. No se agrega ningún campo adicional para eso.**

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `meta_ejercicio` | Enum | ❌ | **Conservación** (sin porterías, foco en posesión, líneas de pase, transiciones) / **Finalización** (direccional, con porterías normales, mini-arcos o zonas de marca, exige superar líneas y definir). `null` para tareas analíticas sin formato de juego. |
| `densidad_espacial` | Enum | ❌ | **Micro** (espacio reducido: altísima intensidad, potencia anaeróbica, duelos 1v1 constantes, mínimo tiempo de decisión) / **Macro** (espacio amplio: capacidad aeróbica, pases largos, más tiempo para decidir). `null` para tareas sin campo delimitado. |
| `resolucion_numerica` | Enum | ❌ | **Igualdad** (misma cantidad de jugadores por equipo) / **Superioridad** (uso de comodines o jugadores extra para facilitar) / **Inferioridad** (menos jugadores para dificultar). `null` si no aplica. |
| `formato_numerico` | Texto | ❌ | Descripción del formato exacto, **sin exceder 5 jugadores en total** mientras ese sea el techo de grupo vigente (ej: "1 (solo)", "1v1", "2v1", "3v2", "2v2+1 comodín" — ver tabla completa en Sección 2.6). |
| `reglas_provocacion` | Lista de textos | ❌ | Restricciones tácticas que fuerzan un comportamiento específico (ej: `["Máx. 2 toques", "Gol vale doble tras centro lateral", "10 pases = 1 punto", "Obligatorio pisar zona central antes de definir"]`). |
| `reglas_continuidad` | Lista de textos | ❌ | Protocolos para mantener intensidad alta tras interrupciones (ej: `["Saque inmediato del DT tras salida de balón", "Sin saques de banda: balón al DT", "Equipo que pierde saca desde su arco en 3 seg"]`). |

> **Nota terminológica:** "Micro" y "Macro" en `densidad_espacial` se refieren al tamaño del espacio de juego (metros por jugador), no a la microestructura/mesoestructura/macroestructura de Ardá/Casal, que se refiere al número de jugadores en oposición (Sección 2.5). Son dos ejes distintos que pueden combinarse — un 3v3 (mesoestructura) puede jugarse en densidad Micro o Macro según el tamaño del área. No confundir al cargar tareas ni al nombrar campos nuevos.

### 6.6 Recursos

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `material` | Lista | ✅ | Equipamiento necesario (ej: "4 sensores, 6 conos, 1 balón") |
| `espacio` | Texto | ✅ | Requerimiento de espacio (ej: "Cuadrado 15×15 m", "Medio campo", "Libre") |
| `sensores_requeridos` | Entero (0–4) | ✅ | Cantidad de sensores necesarios (0 para niveles 5) |

### 6.7 Descripción y Ejecución

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `descripcion` | Texto largo | ✅ | Explicación completa: disposición, reglas, consignas, rotaciones |
| `objetivo_principal` | Texto | ✅ | Qué se busca mejorar con esta tarea (en lenguaje de entrenamiento, NO de evaluación) |
| `consigna_al_jugador` | Texto | ❌ | Frase exacta que se le dice al jugador (útil para estandarizar) |
| `criterio_exito` | Texto | ❌ | Cómo sabe el entrenador que la tarea se ejecutó bien (ej: "7/10 pases al primer toque orientados") |
| `errores_frecuentes` | Texto | ❌ | Errores habituales y cómo corregirlos desde la restricción de la tarea |

### 6.8 Escalabilidad

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `variante_mas_facil` | Texto | ❌ | Cómo simplificar si el jugador no puede ejecutar (ej: "Reducir a 2 sensores, sin límite de toques") |
| `variante_mas_dificil` | Texto | ❌ | Cómo complejizar dentro del mismo nivel (ej: "Agregar límite de tiempo, sumar operación matemática") |
| `progresa_hacia` | ID tarea | ❌ | ID de la tarea del siguiente nivel en la misma familia |
| `regresa_hacia` | ID tarea | ❌ | ID de la tarea del nivel anterior en la misma familia |

### 6.9 Modificadores Avanzados

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `modificadores_avanzados` | Lista de códigos (JSON/Array) | ❌ | Modificadores aplicables a esta tarea para aumentar su complejidad. Seleccionados de la Sección 4 (ej: `["MOD-COG-MUL", "MOD-DIF-IMP"]`). |

### 6.10 Evidencia y Media

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `video_url` | URL | ❌ | Link a video demostrativo (previsto, puede estar vacío) |
| `imagen_url` | URL | ❌ | Link a imagen/diagrama de la disposición |
| `notas` | Texto | ❌ | Observaciones adicionales del entrenador |

---

## 7. Lógica de Espacios Reducidos — Guía de Aplicación

Esta sección documenta cómo los campos de la Sección 6.5 interactúan entre sí para que el DT construya sesiones coherentes.

### 7.1 Relación Espacio ↔ Demanda

| Densidad | Demanda física | Demanda cognitiva | Uso típico |
|---|---|---|---|
| **Micro** (≤25 m²/jugador) | Potencia anaeróbica alta, duelos constantes | Altísima: mínimo tiempo de decisión, lectura rápida | Inicio de semana, días de carga alta, desarrollo de 1v1 |
| **Macro** (>25 m²/jugador) | Capacidad aeróbica, desplazamientos largos | Moderada: más tiempo para escanear, pases largos | Previas de partido, trabajo táctico posicional, recuperación activa |

### 7.2 Reglas de Provocación — Catálogo de Referencia

El DT selecciona de esta lista (o escribe las propias) al configurar la tarea:

| Categoría | Ejemplos |
|---|---|
| **Restricción de toques** | Máx. 1 toque, máx. 2 toques, libre en zona propia / 2 toques en zona rival |
| **Bonificación por acción** | Gol tras centro lateral vale doble, gol de cabeza vale triple, gol tras pared vale doble |
| **Acumulación colectiva** | 10 pases consecutivos = 1 punto, 5 pases sin perder = transición libre |
| **Restricción zonal** | Obligatorio pisar zona central antes de definir, no se puede devolver al GK |
| **Restricción temporal** | Ataque debe finalizar en 8 seg, posesión máxima de 15 seg antes de transición |
| **Restricción de perfil** | Solo pie no dominante en zona final, alternancia obligatoria de perfil |
| **Restricción de posición** | Prohibido moverse tras el pase (fuerza TAC-JDP) / obligatorio un desmarque de ruptura tras dos pases (fuerza TAC-3HM) |

### 7.3 Reglas de Continuidad — Catálogo de Referencia

| Protocolo | Efecto |
|---|---|
| Saque inmediato del DT tras salida de balón | Elimina micro-pausas, mantiene frecuencia cardíaca |
| Sin saques de banda (balón al DT) | Evita pérdida de ritmo por saques laterales |
| Equipo que pierde saca desde su arco en 3 seg | Fuerza transición defensiva inmediata del rival |
| Balones extra distribuidos alrededor del campo | Reduce tiempo muerto por balón perdido |
| Rotación automática de comodín cada 2 min | Mantiene la intensidad del comodín y evita su fatiga |

### 7.4 Resolución Numérica — Cuándo Usar Cada Formato

| Formato | Cuándo usarlo | Ejemplo |
|---|---|---|
| **Igualdad** | Transferencia real al partido, exigencia máxima en decisión | 1v1, 2v2 (techo actual: 5 jugadores en total, ver Sección 2.6) |
| **Superioridad** (comodines) | Facilitar la posesión para jugadores en desarrollo, trabajar salida de balón, forzar la aparición del hombre libre (TAC-HLB) | 2v1, 3v1, 2v2+1 comodín (techo: 5 jugadores en total — ver Sección 2.6) |
| **Inferioridad** | Forzar pressing intenso, resiliencia táctica, urgencia de recuperación | 1v2, 2v3 (equipo en inferioridad trabaja presión; total ≤ 5) |

---

## 8. Ejemplo de una Familia de Tareas en los 5 Niveles

> **Familia: "Pase corto"** — Tag principal: `TEC-PAC`

| Nivel | Nombre de la tarea | Tags | Estructura de juego | Variante |
|---|---|---|---|---|
| 1 | Pase corto — Diagnóstico | `FIS-VRE` | — | Sin balón. Jugador toca el sensor que se enciende lo más rápido posible. Calibración de hardware. |
| 2 | Pase corto — Sensor dictando dirección | `TEC-PAC`, `FIS-VRE` | — | Balón. 4 conos con sensor. Se enciende uno → pase al cono indicado. Sin oposición. |
| 3 | Pase corto — Decisión condicional | `TEC-PAC`, `EMO-CON`, `FIS-VRE` | — | Balón. Color verde → pase rasante. Color rojo → control y conducción. El sensor impone una regla. |
| 4 | Pase corto — Con compañero real | `TEC-PAC`, `TAC-LDJ`, `EMO-CON` | Conservación · Micro · Igualdad | Compañero se mueve entre zonas. Rondo 2v1 en cuadrado 8×8 m. Sensor como distractor. |
| 5 | Pase corto — Rondo 3v1 | `TEC-PAC`, `TAC-LDJ`, `EMO-ACO`, `EMO-CON` | Conservación · Micro · Superioridad (3v1) · Provocación: "Máx. 2 toques" | Sin sensores. Primer toque orientado obligatorio. Contexto real. |

> **Ejemplo adicional — Familia "Tercer hombre"** (ilustra los tags nuevos, no se carga aún)

| Nivel | Nombre de la tarea | Tags | Estructura de juego | Variante |
|---|---|---|---|---|
| 3 | Tercer hombre — Circuito individual con sensores | `TAC-3HM`, `FIS-VRE` | — | 1 jugador solo. Tres sensores dispuestos en triángulo simulan las tres posiciones; el jugador corre y toca la secuencia 1-2-3 al ritmo que marcan las luces, sin balón. Trabaja el timing del desmarque de memoria antes de meter oposición real. |
| 4 | Tercer hombre — Triángulo con un defensor pasivo | `TAC-3HM`, `TAC-LDJ`, `TEC-PAC` | Conservación · Macro · Superioridad (3v1) | Tres jugadores fijos en triángulo amplio (o 2 jugadores + 1 comodín del entrenador haciendo de tercer punto); el receptor final debe desmarcarse recién cuando el segundo hombre recibe. Un defensor pasivo marca solo al primero. |
| 5 | Tercer hombre — 3v2 con receptor libre | `TAC-3HM`, `TAC-HLB`, `TAC-LDJ`, `EMO-CON` | Conservación · Macro · Superioridad (3v2, total 5 jugadores) · Provocación: "Obligatorio un desmarque de ruptura tras dos pases" | Sin sensores. El punto solo cuenta si el circuito de 3 pasadas termina en el jugador que estaba marcado al inicio. Con solo 2 alumnos inscriptos, el entrenador ocupa uno de los 5 lugares hasta sumar jugadores. |

---

## 9. Restricciones Explícitas

| ❌ Prohibido | ✅ Correcto |
|---|---|
| Asignar tareas automáticamente por nota A–F | El equipo técnico decide qué tarea corresponde al jugador |
| Usar códigos de la batería de evaluación como categorías | Usar los códigos propios de la biblioteca (Sección 2) |
| Nombrar una tarea por el test que debería mejorar | Nombrar la tarea por lo que entrena: "Flexibilidad cognitiva — cambio de consigna en conducción" |
| Incluir fórmulas de evaluación (ET, MDC, SWC) en la ficha de tarea | Las métricas de evaluación pertenecen a la batería de tests |
| Inferir que un jugador "necesita" una tarea porque sacó F en un test | El entrenador evalúa el contexto completo y asigna |
| Etiquetar una tarea con un solo tag cuando trabaja múltiples áreas | Usar todos los tags que correspondan (muchos-a-muchos) |
| Dejar `meta_ejercicio` vacío en tareas de Nivel 4–5 con formato de juego | Todo juego reducido debe clasificarse como Conservación o Finalización |
| Crear un código nuevo para un concepto que ya tiene uno (ej: "control orientado bajo presión" cuando ya existe `TEC-COP`) | Revisar el diccionario completo (Sección 2) antes de crear un código; reutilizar el existente |
| Crear una tabla de tags o un campo nuevo para algo que `resolucion_numerica` / `formato_numerico` ya capturan (ej: una tabla "Estructura de Oposición") | Usar los campos de la Sección 6.5; el vocabulario micro/meso/macroestructura es discurso de equipo, no un campo de base de datos (ver 2.5) |
| Cargar un `formato_numerico` que supere 5 jugadores en total (ej: "3v3+1", "4v4+2") porque aparece así en la bibliografía general de fútbol | Adaptar todo formato al techo real de grupo (Sección 2.6); la bibliografía se usa para el principio, no para copiar el número de jugadores tal cual |
| Diseñar una tarea que solo funciona si hay más jugadores inscriptos de los que la academia tiene hoy | Diseñar primero la versión para 1 jugador y para 2, y anotar la progresión hacia el techo de 5 en `variante_mas_dificil` (Sección 2.6) |

---

## 10. Resumen del Modelo Final Unificado

### 10.1 Diccionario de Sub-Pilares (42 tags)

| Pilar | Cant. | Códigos |
|---|---|---|
| **Físico** | 9 | FIS-FTI, FIS-FTS, FIS-AGI, FIS-VRE, FIS-VMA, FIS-ELA, FIS-CMO, FIS-EQC, FIS-CCO |
| **Técnico** | 12 | TEC-ATA, TEC-DBL, TEC-JAE, TEC-CMN, TEC-RPM, TEC-PAC, TEC-PAL, TEC-1V1, TEC-CPT, TEC-COP, TEC-PCR, TEC-PDE |
| **Táctico** | 9 | TAC-UBA, TAC-LDJ, TAC-COM, TAC-COB, TAC-SAL, TAC-ABP, TAC-3HM, TAC-HLB, TAC-JDP |
| **Cognitivo y Emocional** | 12 | EMO-ACE … EMO-ASI |

### 10.2 Modificadores Avanzados (7 códigos)

| Tipo | Códigos |
|---|---|
| **Estresores Cognitivos** (CogiTraining) | MOD-COG-MUL, MOD-COG-SIN, MOD-COG-ESP |
| **Vectores de Variabilidad** (Diferencial) | MOD-DIF-ESP, MOD-DIF-TMP, MOD-DIF-IMP, MOD-DIF-SUP |

### 10.3 Estructura de Juego (Espacios Reducidos)

| Dimensión | Valores |
|---|---|
| **Meta del Ejercicio** | Conservación / Finalización |
| **Densidad Espacial** | Micro / Macro (tamaño del espacio — no confundir con microestructura/mesoestructura, Sección 2.5) |
| **Resolución Numérica** | Igualdad / Superioridad / Inferioridad |
| **Reglas de Provocación** | Lista libre de restricciones tácticas |
| **Reglas de Continuidad** | Lista libre de protocolos anti-pausa |

### 10.4 Campos Totales por Tarea

| Grupo | Campos | Obligatorios |
|---|---|---|
| Identificación | 3 | 3 |
| Clasificación (Tags) | 2 | 2 |
| Progresión | 2 | 2 |
| Metadatos prácticos | 8 | 7 |
| Estructura de juego | 6 | 0 (condicional a Nivel 4–5) |
| Recursos | 3 | 3 |
| Descripción y ejecución | 5 | 2 |
| Escalabilidad | 4 | 0 |
| Modificadores avanzados | 1 | 0 |
| Evidencia y media | 3 | 0 |
| **Total** | **37** | **19** |

> El total de campos por tarea no cambia — los tags nuevos son entradas del diccionario (Sección 2), no campos nuevos en la ficha.

---

## 11. Próximos Pasos

1. **Arquitectura de base de datos: FINALIZADA.** El esquema cubre Pilares + Modificadores + Lógica de Espacios + los tags de Sección 2 ampliados.
2. **Comenzar a cargar tareas** dentro de esta estructura.
3. **Priorizar las familias** que se usarán en las primeras semanas del programa (Bloque 1: base perceptiva).
4. **Crear tablas en Supabase** siguiendo este esquema exacto — el diccionario de Sección 2 es una tabla de referencia (`sub_pilares`), no requiere tablas nuevas para Sección 2.5.
5. **Implementar en el dashboard del DT**: filtros por sub-pilares, nivel, RPE, densidad espacial, meta del ejercicio y resolución numérica.
