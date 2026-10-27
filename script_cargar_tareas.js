import fs from 'fs';

const JSON_PATH = './RAVIX_FAMILIA_01_PASE_BAJO_ESTIMULO.json';
const API_URL = 'http://localhost:3000/tareas'; // En base a main.ts y tareas.controller.ts
const API_KEY = process.env.API_KEY || "RavixAdmin2026!";

const traducciones = {
  naturaleza: {
    "Analítico": "ANALITICO",
    "Global": "GLOBAL"
  },
  bloque_sesion: {
    "Activación": "ACTIVACION",
    "Técnica": "TECNICA",
    "Decisión": "DECISION",
    "Transferencia": "TRANSFERENCIA"
  },
  meta_ejercicio: {
    "Conservación": "CONSERVACION"
  },
  densidad_espacial: {
    "Micro": "MICRO"
  },
  resolucion_numerica: {
    "Superioridad": "SUPERIORIDAD"
  }
};

async function cargarTareas() {
  const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
  const tareas = data.tareas;

  for (let i = 0; i < tareas.length; i++) {
    const tarea = tareas[i];

    // Aplicar traducciones
    if (tarea.naturaleza) tarea.naturaleza = traducciones.naturaleza[tarea.naturaleza] || tarea.naturaleza;
    if (tarea.bloque_sesion) tarea.bloque_sesion = traducciones.bloque_sesion[tarea.bloque_sesion] || tarea.bloque_sesion;
    if (tarea.meta_ejercicio) tarea.meta_ejercicio = traducciones.meta_ejercicio[tarea.meta_ejercicio] || tarea.meta_ejercicio;
    if (tarea.densidad_espacial) tarea.densidad_espacial = traducciones.densidad_espacial[tarea.densidad_espacial] || tarea.densidad_espacial;
    if (tarea.resolucion_numerica) tarea.resolucion_numerica = traducciones.resolucion_numerica[tarea.resolucion_numerica] || tarea.resolucion_numerica;

    // Adaptar formato de tarea_subpilares para el DTO
    if (tarea.tarea_subpilares && Array.isArray(tarea.tarea_subpilares)) {
      tarea.tarea_subpilares = {
        create: tarea.tarea_subpilares
      };
    }

    console.log(`\nEnviando [${i+1}/5]: ${tarea.id_tarea} - ${tarea.nombre}`);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify(tarea)
      });

      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        result = text;
      }

      if (!response.ok) {
        console.error(`❌ Falló la inserción de ${tarea.id_tarea}. Error de API (${response.status}):`, typeof result === 'object' ? JSON.stringify(result, null, 2) : result);
        break; // Detenemos la ejecución como pediste
      } else {
        console.log(`✅ Éxito: ${tarea.id_tarea} insertada correctamente.`);
      }

    } catch (error) {
      console.error(`❌ Excepción de red/ejecución procesando ${tarea.id_tarea}:`, error.message);
      break;
    }
  }
}

cargarTareas();
