import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const API_URL = 'https://ravix-academy.onrender.com/tareas';
const TASK_ID = 'PROD-TEST-001';
const API_KEY = 'RavixAdmin2026!';

async function run() {
  console.log('0. POST SIN API KEY (Debe fallar)');
  const postSinAuth = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_tarea: TASK_ID, nombre: "Test Fail" })
  });
  console.log('POST sin Auth status (debe ser 401 o 403):', postSinAuth.status);

  console.log('\n1. POST CON API KEY (Debe funcionar)');
  const postRes = await fetch(API_URL, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'x-api-key': API_KEY 
    },
    body: JSON.stringify({
      id_tarea: TASK_ID,
      nombre: "Prueba E2E Produccion",
      familia: "Prueba",
      nivel: 3,
      variante: "E2E Prod",
      naturaleza: "ANALITICO",
      bloque_sesion: "TECNICA",
      duracion_estimada: "15 min",
      carga_estimada_rpe_fisico: 5,
      carga_estimada_rpe_mental: 6,
      jugadores_min: 2,
      jugadores_max: 4,
      formato_numerico: "2v2",
      espacio: "Libre",
      sensores_requeridos: 2,
      material: ["Balón", "Sensores"],
      descripcion: "Descripción Prod",
      objetivo_principal: "Objetivo Prod",
      tarea_subpilares: {
        create: [
          { subpilar_codigo: 'TEC-PAC', es_principal: true }
        ]
      },
      modificadores_avanzados: ["MOD-COG-MUL"]
    })
  });
  console.log('POST status:', postRes.status);
  if (postRes.status !== 201) {
    console.log(await postRes.json());
  }

  console.log('\n2. GET all');
  const getRes = await fetch(API_URL, { headers: { 'x-api-key': API_KEY }});
  const getAll = await getRes.json();
  console.log('Found in GET all:', Array.isArray(getAll) && getAll.some((t: any) => t.id_tarea === TASK_ID));

  console.log('\n3. GET con filtro de tag');
  const getTagRes = await fetch(`${API_URL}?tag=TEC-PAC`, { headers: { 'x-api-key': API_KEY }});
  const getTag = await getTagRes.json();
  console.log('Found in GET tag:', Array.isArray(getTag) && getTag.some((t: any) => t.id_tarea === TASK_ID));

  console.log('\n4. GET by ID (debe venir expandido)');
  const getOneRes = await fetch(`${API_URL}/${TASK_ID}`, { headers: { 'x-api-key': API_KEY }});
  const getOne = await getOneRes.json();
  console.log('GET one name:', getOne.nombre, '| tags:', getOne.tarea_subpilares?.length, '| mods:', getOne.modificadores_avanzados?.length);

  console.log('\n5. PATCH');
  const patchRes = await fetch(`${API_URL}/${TASK_ID}`, {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
    body: JSON.stringify({ nombre: "Prueba Prod Modificada", nivel: 4 })
  });
  console.log('PATCH status:', patchRes.status);

  console.log('\n6. GET by ID de nuevo (para ver cambios)');
  const getOneRes2 = await fetch(`${API_URL}/${TASK_ID}`, { headers: { 'x-api-key': API_KEY }});
  const getOne2 = await getOneRes2.json();
  console.log('GET one updated name:', getOne2.nombre, '| nivel:', getOne2.nivel);

  console.log('\n7. DELETE');
  const delRes = await fetch(`${API_URL}/${TASK_ID}`, { 
    method: 'DELETE',
    headers: { 'x-api-key': API_KEY }
  });
  console.log('DELETE status:', delRes.status);

  console.log('\n8. Check huérfanos (Orphans)');
  const pilar = await prisma.tareaSubPilar.findMany({ where: { tarea_id: TASK_ID } });
  const mod = await prisma.$queryRaw`SELECT * FROM "_ModificadorAvanzadoToTarea" WHERE "B" = ${TASK_ID}`;
  console.log('Orphan TareaSubPilar count (debe ser 0):', pilar.length);
  console.log('Orphan Modificadores count (debe ser 0):', (mod as any[]).length);
}

run().catch(console.error).finally(() => prisma.$disconnect());
