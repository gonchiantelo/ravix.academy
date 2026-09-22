import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const API_URL = 'http://localhost:3000/tareas';
const TASK_ID = 'E2E-TEST-002';

async function run() {
  console.log('1. POST');
  const postRes = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id_tarea: TASK_ID,
      nombre: "Prueba E2E Completa",
      familia: "Prueba",
      nivel: 3,
      variante: "E2E",
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
      descripcion: "Descripción E2E",
      objetivo_principal: "Objetivo E2E",
      tarea_subpilares: {
        create: [
          { subpilar_codigo: 'TEC-PAC', es_principal: true }
        ]
      },
      modificadores_avanzados: ["MOD-COG-MUL"]
    })
  });
  console.log('POST status:', postRes.status);

  console.log('\n2. GET all');
  const getRes = await fetch(API_URL);
  const getAll = await getRes.json();
  console.log('Found in GET all:', getAll.some((t: any) => t.id_tarea === TASK_ID));

  console.log('\n3. GET with tag filter');
  const getTagRes = await fetch(`${API_URL}?tag=TEC-PAC`);
  const getTag = await getTagRes.json();
  console.log('Found in GET tag:', getTag.some((t: any) => t.id_tarea === TASK_ID));

  console.log('\n4. GET by ID');
  const getOneRes = await fetch(`${API_URL}/${TASK_ID}`);
  const getOne = await getOneRes.json();
  console.log('GET one name:', getOne.nombre, '| tags:', getOne.tarea_subpilares?.length, '| mods:', getOne.modificadores_avanzados?.length);

  console.log('\n5. PATCH');
  const patchRes = await fetch(`${API_URL}/${TASK_ID}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre: "Prueba E2E Modificada", nivel: 4 })
  });
  console.log('PATCH status:', patchRes.status);

  console.log('\n6. GET by ID again');
  const getOneRes2 = await fetch(`${API_URL}/${TASK_ID}`);
  const getOne2 = await getOneRes2.json();
  console.log('GET one updated name:', getOne2.nombre, '| nivel:', getOne2.nivel);

  console.log('\n7. DELETE');
  const delRes = await fetch(`${API_URL}/${TASK_ID}`, { method: 'DELETE' });
  console.log('DELETE status:', delRes.status);

  console.log('\n8. Verify Orphans');
  const pilar = await prisma.tareaSubPilar.findMany({ where: { tarea_id: TASK_ID } });
  const mod = await prisma.$queryRaw`SELECT * FROM "_ModificadorAvanzadoToTarea" WHERE "B" = ${TASK_ID}`;
  console.log('Orphan TareaSubPilar count:', pilar.length);
  console.log('Orphan Modificadores count:', (mod as any[]).length);
}

run().catch(console.error).finally(() => prisma.$disconnect());
