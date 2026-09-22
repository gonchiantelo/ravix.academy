import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const id = 'TEC-PAC-N2-MOD-1';
  const data = {
    modificadores_avanzados: ["MOD-DIF-ESP", "MOD-COG-SIN"],
    tarea_subpilares: {
      create: [
        {
          subpilar_codigo: "TAC-LDJ",
          es_principal: true
        }
      ]
    }
  };

  const existingTask = await prisma.tarea.findUnique({ where: { id_tarea: id } });
  console.log("Existing task:", existingTask ? "Found" : "Not Found");

  const { modificadores_avanzados, tarea_subpilares, ...rest } = data;
  const dataToSave: any = { ...rest };

  if (modificadores_avanzados) {
    dataToSave.modificadores_avanzados = {
      set: [],
      connect: modificadores_avanzados.map((codigo: string) => ({ codigo })),
    };
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      if (tarea_subpilares && tarea_subpilares.create) {
        await tx.tareaSubPilar.deleteMany({ where: { tarea_id: id } });
        dataToSave.tarea_subpilares = {
          create: tarea_subpilares.create.map(t => ({
            subpilar_codigo: t.subpilar_codigo,
            es_principal: t.es_principal,
          })),
        };
      }

      return tx.tarea.update({
        where: { id_tarea: id },
        data: dataToSave,
        include: {
          tarea_subpilares: { include: { subpilar: true } },
          modificadores_avanzados: true,
        },
      });
    });
    console.log("Success:", JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}

main().finally(() => prisma.$disconnect());
