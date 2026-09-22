import { IsInt, Min, Max, IsArray, ArrayMinSize, ValidateNested, Validate, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, IsBoolean, IsString, IsNotEmpty, IsEnum, ArrayNotEmpty, IsOptional, ArrayMaxSize } from 'class-validator';
import { Type } from 'class-transformer';
import { Naturaleza, BloqueSesion, MetaEjercicio, DensidadEspacial, ResolucionNumerica } from '@prisma/client';

export class TareaSubPilarDto {
  @IsString()
  subpilar_codigo: string;

  @IsBoolean()
  es_principal: boolean;
}

export class TareaSubPilaresInput {
  @IsArray()
  @ArrayMinSize(1, { message: 'Sección 3: Debe haber al menos un tag (sub-pilar) asignado a la tarea.' })
  @ValidateNested({ each: true })
  @Type(() => TareaSubPilarDto)
  create: TareaSubPilarDto[];
}

@ValidatorConstraint({ name: 'OnePrincipalTag', async: false })
export class HasOnePrincipalTagConstraint implements ValidatorConstraintInterface {
  validate(tagsGroup: TareaSubPilaresInput, args: ValidationArguments) {
    if (!tagsGroup || !tagsGroup.create || !Array.isArray(tagsGroup.create)) return false;
    const principalCount = tagsGroup.create.filter(t => t.es_principal === true).length;
    return principalCount === 1; // Sección 3 Regla 3: Obligatoriamente UNO
  }

  defaultMessage(args: ValidationArguments) {
    return 'Sección 3: Debe haber exactamente un tag marcado como principal (es_principal: true).';
  }
}

@ValidatorConstraint({ name: 'ValidFormatoNumerico', async: false })
export class ValidFormatoNumericoConstraint implements ValidatorConstraintInterface {
  validate(formato: string, args: ValidationArguments) {
    if (!formato) return true; // Si está vacío, lo deja pasar (es opcional)
    
    // Captura: "1 (solo...)", "3v2", "2v2+1 comodín"
    const match = formato.match(/^(\d+)(?:\s*\(.*\))?$|^(\d+)v(\d+)(?:\s*\+\s*(\d+)\s*[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*)?$/);
    if (!match) return false;

    let sum = 0;
    if (match[1]) sum += parseInt(match[1], 10);
    if (match[2]) sum += parseInt(match[2], 10);
    if (match[3]) sum += parseInt(match[3], 10);
    if (match[4]) sum += parseInt(match[4], 10);

    return sum <= 5;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Sección 2.6: El formato numérico debe ser válido (ej. "1", "1v1", "3v2", "2v2+1 comodín") y la suma total de jugadores no puede superar 5.';
  }
}

@ValidatorConstraint({ name: 'IsMaxGreaterThanMin', async: false })
export class IsMaxGreaterThanMinConstraint implements ValidatorConstraintInterface {
  validate(jugadores_max: number, args: ValidationArguments) {
    const dto = args.object as CreateTareaDto;
    // Si no mandaron jugadores_min o max, la validación se ignora o recae en otros decoradores.
    if (dto.jugadores_min === undefined || jugadores_max === undefined) return true;
    return jugadores_max >= dto.jugadores_min;
  }

  defaultMessage(args: ValidationArguments) {
    return 'El campo jugadores_max no puede ser menor que jugadores_min.';
  }
}

export class CreateTareaDto {
  // ----------------------------------------------------
  // 6.1 Identificación
  // ----------------------------------------------------
  @IsString() @IsNotEmpty() id_tarea: string;
  @IsString() @IsNotEmpty() nombre: string;
  @IsString() @IsNotEmpty() familia: string;

  // ----------------------------------------------------
  // 6.2 Clasificación (Tags)
  // ----------------------------------------------------
  @Validate(HasOnePrincipalTagConstraint)
  @ValidateNested()
  @Type(() => TareaSubPilaresInput)
  tarea_subpilares: TareaSubPilaresInput;

  // ----------------------------------------------------
  // 6.3 Progresión
  // ----------------------------------------------------
  @IsInt()
  @Min(1, { message: 'Sección 5: El nivel mínimo permitido es 1.' })
  @Max(5, { message: 'Sección 5: El nivel máximo permitido es 5.' })
  nivel: number;
  
  @IsString() @IsNotEmpty() variante: string;

  // ----------------------------------------------------
  // 6.4 Metadatos de Aplicación Práctica
  // ----------------------------------------------------
  @IsEnum(Naturaleza) naturaleza: Naturaleza;
  @IsEnum(BloqueSesion) bloque_sesion: BloqueSesion;
  
  @IsString() @IsNotEmpty() duracion_estimada: string;
  
  @IsInt() @Min(1) @Max(10) carga_estimada_rpe_fisico: number;
  @IsInt() @Min(1) @Max(10) carga_estimada_rpe_mental: number;
  
  @IsInt() @Min(1) jugadores_min: number;
  
  @IsInt()
  @Min(1)
  @Max(5, { message: 'Sección 2.6: La academia tiene un techo de 5 jugadores por entrenador. El campo jugadores_max no puede superar 5.' })
  @Validate(IsMaxGreaterThanMinConstraint)
  jugadores_max: number;

  @IsOptional() @IsArray() @IsString({ each: true }) posiciones_recomendadas?: string[];

  // ----------------------------------------------------
  // 6.5 Estructura de Juego
  // ----------------------------------------------------
  @IsOptional() @IsEnum(MetaEjercicio) meta_ejercicio?: MetaEjercicio;
  @IsOptional() @IsEnum(DensidadEspacial) densidad_espacial?: DensidadEspacial;
  @IsOptional() @IsEnum(ResolucionNumerica) resolucion_numerica?: ResolucionNumerica;
  
  @IsOptional() 
  @IsString() 
  @Validate(ValidFormatoNumericoConstraint)
  formato_numerico?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) reglas_provocacion?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) reglas_continuidad?: string[];

  // ----------------------------------------------------
  // 6.6 Recursos
  // ----------------------------------------------------
  @IsArray() @ArrayNotEmpty() @IsString({ each: true }) material: string[];
  @IsString() @IsNotEmpty() espacio: string;
  @IsInt() @Min(0) @Max(4) sensores_requeridos: number;

  // ----------------------------------------------------
  // 6.7 Descripción y Ejecución
  // ----------------------------------------------------
  @IsString() @IsNotEmpty() descripcion: string;
  @IsString() @IsNotEmpty() objetivo_principal: string;
  
  @IsOptional() @IsString() consigna_al_jugador?: string;
  @IsOptional() @IsString() criterio_exito?: string;
  @IsOptional() @IsString() errores_frecuentes?: string;

  // ----------------------------------------------------
  // 6.8 Escalabilidad
  // ----------------------------------------------------
  @IsOptional() @IsString() variante_mas_facil?: string;
  @IsOptional() @IsString() variante_mas_dificil?: string;
  @IsOptional() @IsString() progresa_hacia?: string;
  @IsOptional() @IsString() regresa_hacia?: string;

  // ----------------------------------------------------
  // 6.9 Modificadores Avanzados
  // ----------------------------------------------------
  @IsOptional() 
  @IsArray() 
  @IsString({ each: true }) 
  @ArrayMaxSize(2, { message: 'Sección 4: no se pueden activar más de 2 modificadores avanzados simultáneos en la misma tarea.' })
  modificadores_avanzados?: string[];

  // ----------------------------------------------------
  // 6.10 Evidencia y Media
  // ----------------------------------------------------
  @IsOptional() @IsString() video_url?: string;
  @IsOptional() @IsString() imagen_url?: string;
  @IsOptional() @IsString() notas?: string;
}
