import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTareaDto } from './dto/create-tarea.dto.js';
import { UpdateTareaDto } from './dto/update-tarea.dto.js';

@Injectable()
export class TareasService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTareaDto) {
    const { modificadores_avanzados, tarea_subpilares, ...rest } = data;
    
    const dataToSave: any = {
      ...rest,
      tarea_subpilares: {
        create: tarea_subpilares.create.map(t => ({
          subpilar_codigo: t.subpilar_codigo,
          es_principal: t.es_principal,
        })),
      },
    };

    if (modificadores_avanzados && modificadores_avanzados.length > 0) {
      dataToSave.modificadores_avanzados = {
        connect: modificadores_avanzados.map((codigo: string) => ({ codigo })),
      };
    }

    return this.prisma.tarea.create({
      data: dataToSave,
      include: {
        tarea_subpilares: true,
        modificadores_avanzados: true,
      }
    });
  }

  async update(id: string, data: UpdateTareaDto) {
    // 1. Obtener la tarea existente (el controlador ya verificó el 404, pero la necesitamos para validar)
    const existingTask = await this.prisma.tarea.findUnique({ where: { id_tarea: id } });
    if (!existingTask) return null; // El controller lanzará 404

    // 2. Validación cruzada de min/max jugadores con valores guardados
    const newMin = data.jugadores_min !== undefined ? data.jugadores_min : existingTask.jugadores_min;
    const newMax = data.jugadores_max !== undefined ? data.jugadores_max : existingTask.jugadores_max;
    if (newMax < newMin) {
      throw new BadRequestException(`El campo jugadores_max (${newMax}) no puede ser menor que jugadores_min (${newMin}) al combinarse con los valores guardados.`);
    }

    // 3. Preparar la data para el update
    const { modificadores_avanzados, tarea_subpilares, ...rest } = data;
    const dataToSave: any = { ...rest };

    if (modificadores_avanzados) {
      dataToSave.modificadores_avanzados = {
        set: [], // Desenlaza todos los existentes
        connect: modificadores_avanzados.map((codigo: string) => ({ codigo })), // Conecta los nuevos
      };
    }

    // 4. Ejecutar la transacción
    return this.prisma.$transaction(async (tx) => {
      // Si vienen tags nuevos, borramos los viejos de la tabla intermedia y los re-creamos
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
    }, { timeout: 15000 });
  }

  async findAll(filters: { tag?: string; nivel?: string; bloque_sesion?: string } = {}) {
    const where: any = {};

    // Filtro por nivel (cast a entero)
    if (filters.nivel) {
      where.nivel = parseInt(filters.nivel, 10);
    }

    // Filtro por bloque_sesion (Enum en Prisma)
    if (filters.bloque_sesion) {
      where.bloque_sesion = filters.bloque_sesion;
    }

    // Filtro por tag (navegando la relación muchos-a-muchos)
    if (filters.tag) {
      where.tarea_subpilares = {
        some: {
          subpilar_codigo: filters.tag,
        },
      };
    }

    return this.prisma.tarea.findMany({
      where,
      include: {
        tarea_subpilares: {
          include: {
            subpilar: true
          }
        },
        modificadores_avanzados: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.tarea.findUnique({
      where: { id_tarea: id },
      include: {
        tarea_subpilares: {
          include: {
            subpilar: true
          }
        },
        modificadores_avanzados: true,
      },
    });
  }

  async remove(id: string) {
    // 1. Borrar manualmente los registros en la tabla intermedia explícita (para no dejar huérfanos ni fallar por foreign key)
    await this.prisma.tareaSubPilar.deleteMany({
      where: { tarea_id: id },
    });

    // 2. Eliminar la tarea (Prisma limpia la tabla intermedia implícita _ModificadorAvanzadoToTarea automáticamente)
    return this.prisma.tarea.delete({
      where: { id_tarea: id },
    });
  }
}
