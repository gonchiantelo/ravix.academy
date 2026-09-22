import { Controller, Get, Post, Body, Query, Param, NotFoundException, Delete, Patch, UseGuards } from '@nestjs/common';
import { ApiQuery, ApiOperation, ApiParam, ApiSecurity } from '@nestjs/swagger';
import { TareasService } from './tareas.service.js';
import { CreateTareaDto } from './dto/create-tarea.dto.js';
import { UpdateTareaDto } from './dto/update-tarea.dto.js';
import { ApiKeyGuard } from '../auth/api-key.guard.js';

@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('api-key')
  @ApiOperation({ summary: 'Crear una nueva tarea (Protegido)' })
  create(@Body() createTareaDto: CreateTareaDto) {
    return this.tareasService.create(createTareaDto);
  }

  @Get()
  @ApiQuery({ name: 'tag', required: false, description: 'Filtrar por código de sub-pilar (ej. TEC-PAC)' })
  @ApiQuery({ name: 'nivel', required: false, description: 'Filtrar por nivel de dificultad (1 a 5)' })
  @ApiQuery({ name: 'bloque_sesion', required: false, description: 'Filtrar por bloque de la sesión (ej. ACTIVACION)' })
  findAll(
    @Query('tag') tag?: string,
    @Query('nivel') nivel?: string,
    @Query('bloque_sesion') bloque_sesion?: string,
  ) {
    return this.tareasService.findAll({ tag, nivel, bloque_sesion });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tarea específica por su ID' })
  @ApiParam({ name: 'id', description: 'El ID único de la tarea (ej. TEC-PAC-N2-001)' })
  async findOne(@Param('id') id: string) {
    const tarea = await this.tareasService.findOne(id);
    if (!tarea) {
      throw new NotFoundException(`La tarea con ID '${id}' no existe en la biblioteca.`);
    }
    return tarea;
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('api-key')
  @ApiOperation({ summary: 'Eliminar una tarea definitivamente (Protegido)' })
  @ApiParam({ name: 'id', description: 'El ID único de la tarea a eliminar' })
  async remove(@Param('id') id: string) {
    const tarea = await this.tareasService.findOne(id);
    if (!tarea) {
      throw new NotFoundException(`No se pudo eliminar: La tarea con ID '${id}' no existe.`);
    }
    await this.tareasService.remove(id);
    return { message: `La tarea '${id}' y sus relaciones han sido eliminadas correctamente.` };
  }

  @Patch(':id')
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('api-key')
  @ApiOperation({ summary: 'Actualizar parcialmente una tarea (Protegido)' })
  @ApiParam({ name: 'id', description: 'El ID único de la tarea a actualizar' })
  async update(@Param('id') id: string, @Body() updateTareaDto: UpdateTareaDto) {
    const tarea = await this.tareasService.findOne(id);
    if (!tarea) {
      throw new NotFoundException(`No se pudo actualizar: La tarea con ID '${id}' no existe en la biblioteca.`);
    }
    return this.tareasService.update(id, updateTareaDto);
  }
}
