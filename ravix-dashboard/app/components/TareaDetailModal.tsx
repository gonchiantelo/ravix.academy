'use client';
import { useEffect } from 'react';
import './dashboard.css';

interface TareaDetailModalProps {
  tarea: any;
  onClose: () => void;
  onEdit?: () => void;
}

export function TareaDetailModal({ tarea, onClose, onEdit }: TareaDetailModalProps) {
  // Cerrar con Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Bloquear scroll de fondo
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const DataField = ({ label, value }: { label: string; value: any }) => {
    if (value === null || value === undefined || value === '') return null;
    if (Array.isArray(value) && value.length === 0) return null;
    
    return (
      <div className="data-field">
        <span className="data-label">{label}</span>
        {Array.isArray(value) ? (
          <div className="data-array">
            {value.map((v, i) => (
              <span key={i} className="data-array-badge">{v.codigo || v}</span>
            ))}
          </div>
        ) : (
          <span className="data-value">{value}</span>
        )}
      </div>
    );
  };

  const tagPrincipal = tarea.tarea_subpilares?.find((t: any) => t.es_principal)?.subpilar_codigo;
  const otrosTags = tarea.tarea_subpilares?.filter((t: any) => !t.es_principal).map((t: any) => t.subpilar_codigo) || [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        
        <header className="modal-header">
          <div>
            <h2 className="modal-title">{tarea.nombre}</h2>
            <p className="modal-subtitle">ID: {tarea.id_tarea}</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {onEdit && (
              <button 
                type="button" 
                onClick={onEdit}
                style={{ backgroundColor: '#333', color: 'white', border: '1px solid #555', padding: '0.4rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
              >
                Editar
              </button>
            )}
            <button className="modal-close" onClick={onClose}>&times;</button>
          </div>
        </header>

        <div className="modal-body">
          {/* 6.1 Identificación */}
          <section className="modal-section">
            <h3>1. Identificación</h3>
            <div className="grid-2">
              <DataField label="ID" value={tarea.id_tarea} />
              <DataField label="Nombre" value={tarea.nombre} />
              <DataField label="Familia" value={tarea.familia} />
            </div>
          </section>

          {/* 6.2 Clasificación */}
          <section className="modal-section">
            <h3>2. Clasificación</h3>
            <div className="grid-2">
              <DataField label="Tag Principal" value={tagPrincipal} />
              <DataField label="Tags Secundarios" value={otrosTags} />
            </div>
          </section>

          {/* 6.3 Progresión */}
          <section className="modal-section">
            <h3>3. Progresión</h3>
            <div className="grid-2">
              <DataField label="Nivel" value={tarea.nivel} />
              <DataField label="Variante" value={tarea.variante} />
            </div>
          </section>

          {/* 6.4 Metadatos */}
          <section className="modal-section">
            <h3>4. Metadatos de Aplicación</h3>
            <div className="grid-3">
              <DataField label="Naturaleza" value={tarea.naturaleza} />
              <DataField label="Bloque de Sesión" value={tarea.bloque_sesion} />
              <DataField label="Duración Estimada" value={tarea.duracion_estimada} />
              <DataField label="Jugadores Mínimos" value={tarea.jugadores_min} />
              <DataField label="Jugadores Máximos" value={tarea.jugadores_max} />
              <DataField label="Posiciones" value={tarea.posiciones_recomendadas} />
              <DataField label="RPE Físico" value={tarea.carga_estimada_rpe_fisico} />
              <DataField label="RPE Mental" value={tarea.carga_estimada_rpe_mental} />
            </div>
          </section>

          {/* 6.5 Estructura de Juego */}
          <section className="modal-section">
            <h3>5. Estructura de Juego</h3>
            <div className="grid-2">
              <DataField label="Meta del Ejercicio" value={tarea.meta_ejercicio} />
              <DataField label="Densidad Espacial" value={tarea.densidad_espacial} />
              <DataField label="Resolución Numérica" value={tarea.resolucion_numerica} />
              <DataField label="Formato Numérico" value={tarea.formato_numerico} />
            </div>
            <div className="grid-1 mt-2">
              <DataField label="Reglas de Provocación" value={tarea.reglas_provocacion} />
              <DataField label="Reglas de Continuidad" value={tarea.reglas_continuidad} />
            </div>
          </section>

          {/* 6.6 Recursos */}
          <section className="modal-section">
            <h3>6. Recursos</h3>
            <div className="grid-2">
              <DataField label="Espacio" value={tarea.espacio} />
              <DataField label="Sensores Requeridos" value={tarea.sensores_requeridos} />
            </div>
            <div className="grid-1 mt-2">
              <DataField label="Materiales" value={tarea.material} />
            </div>
          </section>

          {/* 6.7 Descripción */}
          <section className="modal-section">
            <h3>7. Descripción y Ejecución</h3>
            <div className="grid-1 text-block">
              <DataField label="Objetivo Principal" value={tarea.objetivo_principal} />
              <DataField label="Descripción" value={tarea.descripcion} />
              <DataField label="Consigna al Jugador" value={tarea.consigna_al_jugador} />
              <DataField label="Criterio de Éxito" value={tarea.criterio_exito} />
              <DataField label="Errores Frecuentes" value={tarea.errores_frecuentes} />
            </div>
          </section>

          {/* 6.8 Escalabilidad */}
          <section className="modal-section">
            <h3>8. Escalabilidad</h3>
            <div className="grid-2">
              <DataField label="Variante Más Fácil" value={tarea.variante_mas_facil} />
              <DataField label="Variante Más Difícil" value={tarea.variante_mas_dificil} />
              <DataField label="Progresa Hacia (ID)" value={tarea.progresa_hacia} />
              <DataField label="Regresa Hacia (ID)" value={tarea.regresa_hacia} />
            </div>
          </section>

          {/* 6.9 Modificadores */}
          <section className="modal-section">
            <h3>9. Modificadores Avanzados</h3>
            <div className="grid-1">
              <DataField label="Modificadores" value={tarea.modificadores_avanzados} />
            </div>
          </section>

          {/* 6.10 Evidencia */}
          <section className="modal-section">
            <h3>10. Evidencia y Media</h3>
            <div className="grid-1">
              <DataField label="Video URL" value={tarea.video_url} />
              <DataField label="Imagen URL" value={tarea.imagen_url} />
              <DataField label="Notas Internas" value={tarea.notas} />
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
