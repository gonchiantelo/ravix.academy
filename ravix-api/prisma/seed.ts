import { PrismaClient, Pilar, TipoModificador } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando el seeding...');

  // 1. Sub-Pilares: Físico
  const subpilaresFisicos = [
    { codigo: 'FIS-FTI', nombre: 'Fuerza del tren inferior', descripcion: 'Potencia en saltos, disputas, arranques, disparos' },
    { codigo: 'FIS-FTS', nombre: 'Fuerza del tren superior', descripcion: 'Para acciones cuerpo a cuerpo, por bajo y por alto' },
    { codigo: 'FIS-AGI', nombre: 'Agilidad y desplazamiento corto', descripcion: 'Movilidad rápida y coordinada dentro del área' },
    { codigo: 'FIS-VRE', nombre: 'Velocidad de reacción', descripcion: 'Capacidad de responder rápidamente a los estímulos' },
    { codigo: 'FIS-VMA', nombre: 'Velocidad máxima', descripcion: 'Pico de velocidad en distancias largas' },
    { codigo: 'FIS-ELA', nombre: 'Elasticidad / flexibilidad', descripcion: 'Rango de movimiento en estiradas y bloqueos' },
    { codigo: 'FIS-CMO', nombre: 'Coordinación mano-ojo', descripcion: 'Precisión al atajar remates o cortar centros' },
    { codigo: 'FIS-EQC', nombre: 'Equilibrio y coordinación', descripcion: 'Estabilidad corporal, sostiene conducción, giros y control' },
    { codigo: 'FIS-CCO', nombre: 'Composición corporal', descripcion: 'Estado de peso, masa muscular, grasa' },
  ];

  for (const item of subpilaresFisicos) {
    await prisma.subPilar.upsert({
      where: { codigo: item.codigo },
      update: {},
      create: { ...item, pilar: Pilar.FISICO },
    });
  }

  // 2. Sub-Pilares: Técnico
  const subpilaresTecnicos = [
    { codigo: 'TEC-ATA', nombre: 'Técnica de atajada', descripcion: 'Posición corporal, manos y orientación del cuerpo' },
    { codigo: 'TEC-DBL', nombre: 'Desvíos y bloqueos', descripcion: 'Uso de manos y cuerpo para evitar goles' },
    { codigo: 'TEC-JAE', nombre: 'Juego aéreo y salidas', descripcion: 'Precisión y timing para cortar centros y despejes' },
    { codigo: 'TEC-CMN', nombre: 'Control con manos', descripcion: 'Seguridad en atrapadas de remates o rebotes' },
    { codigo: 'TEC-RPM', nombre: 'Reposición con manos', descripcion: 'Precisión, rapidez y decisión para iniciar ataques' },
    { codigo: 'TEC-PAC', nombre: 'Pase corto', descripcion: 'Precisión, timing y uso de ambos perfiles' },
    { codigo: 'TEC-PAL', nombre: 'Pase largo', descripcion: 'Dirección, potencia y precisión de envíos a distancia' },
    { codigo: 'TEC-1V1', nombre: 'Uno contra uno', descripcion: 'Capacidad de achicar con técnica y decisión' },
    { codigo: 'TEC-CPT', nombre: 'Control y primer toque', descripcion: 'Capacidad de controlar balón con distintas superficies' },
    { codigo: 'TEC-COP', nombre: 'Control orientado y perfilado corporal', descripcion: 'Recepción bajo presión orientada, orientación del cuerpo. Cubre "control orientado bajo presión" — no crear un código adicional para ese concepto (ver 2.5).' },
    { codigo: 'TEC-PCR', nombre: 'Pared + cambio de ritmo', descripcion: 'Combinación de pase de pared (1-2) seguida de un cambio de velocidad en la carrera o la conducción posterior. Fuente: dossier de técnica específica de volantes.' },
    { codigo: 'TEC-PDE', nombre: 'Pase diagonal al espacio', descripcion: 'Pase diagonal dirigido a un espacio para que el compañero llegue en carrera, no al pie. Fuente: dossier de técnica específica de volantes.' },
  ];

  for (const item of subpilaresTecnicos) {
    await prisma.subPilar.upsert({
      where: { codigo: item.codigo },
      update: {},
      create: { ...item, pilar: Pilar.TECNICO },
    });
  }

  // 3. Sub-Pilares: Táctico
  const subpilaresTacticos = [
    { codigo: 'TAC-UBA', nombre: 'Ubicación en el arco', descripcion: 'Posicionamiento según ángulo, balón, defensa y arco' },
    { codigo: 'TAC-LDJ', nombre: 'Lectura del juego', descripcion: 'Anticipación de jugadas' },
    { codigo: 'TAC-COM', nombre: 'Comunicación en defensa', descripcion: 'Ordena la línea, avisa coberturas, grita cuando sale' },
    { codigo: 'TAC-COB', nombre: 'Cobertura fuera del área', descripcion: 'Actuación como líbero en pelotas largas o filtradas' },
    { codigo: 'TAC-SAL', nombre: 'Participación en salida de balón', descripcion: 'Se muestra y apoya la posesión ("toco y salgo" — ver TAC-JDP para su opuesto)' },
    { codigo: 'TAC-ABP', nombre: 'Interpretación de jugadas a balón parado', descripcion: 'Ubicación, organización de la barrera, continuidad' },
    { codigo: 'TAC-3HM', nombre: 'Tercer hombre', descripcion: 'Circuito de tres jugadores en el que el receptor final se desmarca aprovechando que el marcador quedó pendiente del segundo pase. Fuente: Perarnau, Senda de Campeones (relato de Xavi Hernández).' },
    { codigo: 'TAC-HLB', nombre: 'Hombre libre', descripcion: 'Generación de superioridad numérica atrayendo marcas para liberar a un compañero sin marcador directo. Fuente: Perarnau, Senda de Campeones.' },
    { codigo: 'TAC-JDP', nombre: 'Juego de posición ("toco y me quedo")', descripcion: 'Mantener la estructura posicional después del pase en lugar de desplazarse ("toco y me quedo"), a diferencia de la conservación ("toco y salgo", TAC-SAL). El jugador debe reconocer cuál de las dos conductas corresponde a cada momento del juego. Fuente: Perarnau, Senda de Campeones.' },
  ];

  for (const item of subpilaresTacticos) {
    await prisma.subPilar.upsert({
      where: { codigo: item.codigo },
      update: {},
      create: { ...item, pilar: Pilar.TACTICO },
    });
  }

  // 4. Sub-Pilares: Cognitivo y Emocional
  const subpilaresCognitivos = [
    { codigo: 'EMO-ACE', nombre: 'Actitud y esfuerzo', descripcion: 'Disposición al trabajo, intensidad en partidos y entrenos' },
    { codigo: 'EMO-RES', nombre: 'Resiliencia', descripcion: 'Respuesta ante el error, la presión o frustración' },
    { codigo: 'EMO-CON', nombre: 'Concentración', descripcion: 'Nivel de atención sostenida durante tareas o partido' },
    { codigo: 'EMO-AUC', nombre: 'Autoconfianza', descripcion: 'Se muestra seguro de sus acciones y decisiones' },
    { codigo: 'EMO-CEF', nombre: 'Comunicación efectiva', descripcion: 'Habla en cancha, escucha, se relaciona con el equipo' },
    { codigo: 'EMO-GEM', nombre: 'Gestión emocional', descripcion: 'Manejo de emociones, evita reacciones negativas' },
    { codigo: 'EMO-RSP', nombre: 'Responsabilidad', descripcion: 'Puntualidad, compromiso, cuidado personal' },
    { codigo: 'EMO-ACO', nombre: 'Actitud competitiva', descripcion: 'Mentalidad para imponerse en duelos, sale a ganar' },
    { codigo: 'EMO-ACR', nombre: 'Actitud frente a la crítica', descripcion: 'Recepción de correcciones o instrucciones' },
    { codigo: 'EMO-RGR', nombre: 'Relación con el grupo', descripcion: 'Integración con compañeros, respeto y colaboración' },
    { codigo: 'EMO-CCS', nombre: 'Comprensión de consignas', descripcion: 'Entiende lo que se le pide, en tareas y en partido' },
    { codigo: 'EMO-ASI', nombre: 'Asistencia a los entrenamientos', descripcion: '¿Asiste y está comprometido con su proceso?' },
  ];

  for (const item of subpilaresCognitivos) {
    await prisma.subPilar.upsert({
      where: { codigo: item.codigo },
      update: {},
      create: { ...item, pilar: Pilar.COGNITIVO_EMOCIONAL },
    });
  }

  // Modificadores: Estresores Cognitivos
  const estresoresCognitivos = [
    { codigo: 'MOD-COG-MUL', nombre: 'Multitasking', descripcion: 'Restricciones de memoria de trabajo (cálculos matemáticos, dictado de patrones, conteo regresivo) simultáneas a la ejecución motora.' },
    { codigo: 'MOD-COG-SIN', nombre: 'Sincronización Rítmica', descripcion: 'Uso de marcadores de tiempo (metrónomo) o sincronización obligatoria de movimientos con compañeros para control bilateral fluido.' },
    { codigo: 'MOD-COG-ESP', nombre: 'Mirroring (Espejo)', descripcion: 'Ejercicios de reacción donde el jugador debe copiar o anticipar instantáneamente los gestos y movimientos de su compañero.' },
  ];

  for (const item of estresoresCognitivos) {
    await prisma.modificadorAvanzado.upsert({
      where: { codigo: item.codigo },
      update: {},
      create: { ...item, tipo: TipoModificador.ESTRESOR_COGNITIVO },
    });
  }

  // Modificadores: Vectores de Variabilidad
  const vectoresVariabilidad = [
    { codigo: 'MOD-DIF-ESP', nombre: 'Espacios y Distancias', descripcion: 'Alteración asimétrica de distancias, dimensiones del área de ejecución o ubicación de objetivos.' },
    { codigo: 'MOD-DIF-TMP', nombre: 'Velocidad y Tiempo', descripcion: 'Modificación impredecible de velocidades de ejecución o tiempos de aceleración obligatorios.' },
    { codigo: 'MOD-DIF-IMP', nombre: 'Implementos', descripcion: 'Cambio en las características del balón (tamaño, peso, balones irregulares).' },
    { codigo: 'MOD-DIF-SUP', nombre: 'Superficies de Apoyo', descripcion: 'Alteración del terreno de juego (arena, colchonetas, césped irregular) o uso de calzado asimétrico.' },
  ];

  for (const item of vectoresVariabilidad) {
    await prisma.modificadorAvanzado.upsert({
      where: { codigo: item.codigo },
      update: {},
      create: { ...item, tipo: TipoModificador.VECTOR_VARIABILIDAD },
    });
  }

  // Verificar recuento
  const subPilarCount = await prisma.subPilar.count();
  const modificadorCount = await prisma.modificadorAvanzado.count();

  console.log('--- SEEDING COMPLETADO ---');
  console.log(`Sub-Pilares cargados: ${subPilarCount}`);
  console.log(`Modificadores Avanzados cargados: ${modificadorCount}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
