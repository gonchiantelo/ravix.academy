-- CreateEnum
CREATE TYPE "Pilar" AS ENUM ('FISICO', 'TECNICO', 'TACTICO', 'COGNITIVO_EMOCIONAL');

-- CreateEnum
CREATE TYPE "TipoModificador" AS ENUM ('ESTRESOR_COGNITIVO', 'VECTOR_VARIABILIDAD');

-- CreateEnum
CREATE TYPE "Naturaleza" AS ENUM ('ANALITICO', 'GLOBAL');

-- CreateEnum
CREATE TYPE "BloqueSesion" AS ENUM ('ACTIVACION', 'MOVILIDAD_PREVENCION', 'TECNICA', 'DECISION', 'TRANSFERENCIA');

-- CreateEnum
CREATE TYPE "MetaEjercicio" AS ENUM ('CONSERVACION', 'FINALIZACION');

-- CreateEnum
CREATE TYPE "DensidadEspacial" AS ENUM ('MICRO', 'MACRO');

-- CreateEnum
CREATE TYPE "ResolucionNumerica" AS ENUM ('IGUALDAD', 'SUPERIORIDAD', 'INFERIORIDAD');

-- CreateTable
CREATE TABLE "SubPilar" (
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "pilar" "Pilar" NOT NULL,

    CONSTRAINT "SubPilar_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "ModificadorAvanzado" (
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" "TipoModificador" NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "ModificadorAvanzado_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "TareaSubPilar" (
    "tarea_id" TEXT NOT NULL,
    "subpilar_codigo" TEXT NOT NULL,
    "es_principal" BOOLEAN NOT NULL,

    CONSTRAINT "TareaSubPilar_pkey" PRIMARY KEY ("tarea_id","subpilar_codigo")
);

-- CreateTable
CREATE TABLE "Tarea" (
    "id_tarea" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "familia" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,
    "variante" TEXT NOT NULL,
    "naturaleza" "Naturaleza" NOT NULL,
    "bloque_sesion" "BloqueSesion" NOT NULL,
    "duracion_estimada" TEXT NOT NULL,
    "carga_estimada_rpe_fisico" INTEGER NOT NULL,
    "carga_estimada_rpe_mental" INTEGER NOT NULL,
    "jugadores_min" INTEGER NOT NULL,
    "jugadores_max" INTEGER NOT NULL,
    "posiciones_recomendadas" TEXT[],
    "meta_ejercicio" "MetaEjercicio",
    "densidad_espacial" "DensidadEspacial",
    "resolucion_numerica" "ResolucionNumerica",
    "formato_numerico" TEXT,
    "reglas_provocacion" TEXT[],
    "reglas_continuidad" TEXT[],
    "material" TEXT[],
    "espacio" TEXT NOT NULL,
    "sensores_requeridos" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "objetivo_principal" TEXT NOT NULL,
    "consigna_al_jugador" TEXT,
    "criterio_exito" TEXT,
    "errores_frecuentes" TEXT,
    "variante_mas_facil" TEXT,
    "variante_mas_dificil" TEXT,
    "progresa_hacia" TEXT,
    "regresa_hacia" TEXT,
    "video_url" TEXT,
    "imagen_url" TEXT,
    "notas" TEXT,

    CONSTRAINT "Tarea_pkey" PRIMARY KEY ("id_tarea")
);

-- CreateTable
CREATE TABLE "_ModificadorAvanzadoToTarea" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ModificadorAvanzadoToTarea_AB_unique" ON "_ModificadorAvanzadoToTarea"("A", "B");

-- CreateIndex
CREATE INDEX "_ModificadorAvanzadoToTarea_B_index" ON "_ModificadorAvanzadoToTarea"("B");

-- AddForeignKey
ALTER TABLE "TareaSubPilar" ADD CONSTRAINT "TareaSubPilar_tarea_id_fkey" FOREIGN KEY ("tarea_id") REFERENCES "Tarea"("id_tarea") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TareaSubPilar" ADD CONSTRAINT "TareaSubPilar_subpilar_codigo_fkey" FOREIGN KEY ("subpilar_codigo") REFERENCES "SubPilar"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModificadorAvanzadoToTarea" ADD CONSTRAINT "_ModificadorAvanzadoToTarea_A_fkey" FOREIGN KEY ("A") REFERENCES "ModificadorAvanzado"("codigo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModificadorAvanzadoToTarea" ADD CONSTRAINT "_ModificadorAvanzadoToTarea_B_fkey" FOREIGN KEY ("B") REFERENCES "Tarea"("id_tarea") ON DELETE CASCADE ON UPDATE CASCADE;
