'use client';
import { useState, useEffect } from 'react';
import { SUB_PILARES, MODIFICADORES_AVANZADOS } from '../utils/constants';
import './dashboard.css';

interface TareaFormModalProps {
  onClose: () => void;
  onSuccess: () => void;
  initialData?: any;
}

export function TareaFormModal({ onClose, onSuccess, initialData }: TareaFormModalProps) {
  // Estado para prevenir scroll de fondo
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const isEditing = !!initialData;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Funciones auxiliares para arrays (tags y mods)
  const getInitialTags = () => {
    if (!initialData?.tarea_subpilares) return [];
    return initialData.tarea_subpilares.map((ts: any) => ts.subpilar_codigo);
  };
  const getInitialPrincipalTag = () => {
    if (!initialData?.tarea_subpilares) return '';
    const principal = initialData.tarea_subpilares.find((ts: any) => ts.es_principal);
    return principal ? principal.subpilar_codigo : '';
  };
  const getInitialMods = () => {
    if (!initialData?.modificadores_avanzados) return [];
    return initialData.modificadores_avanzados.map((m: any) => typeof m === 'string' ? m : m.codigo);
  };

  const [selectedTags, setSelectedTags] = useState<string[]>(getInitialTags());
  const [principalTag, setPrincipalTag] = useState<string>(getInitialPrincipalTag());
  const [selectedMods, setSelectedMods] = useState<string[]>(getInitialMods());
  const [showOptionals, setShowOptionals] = useState(isEditing);

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tagId)) {
        const next = prev.filter(t => t !== tagId);
        if (principalTag === tagId) setPrincipalTag('');
        return next;
      }
      return [...prev, tagId];
    });
  };

  const toggleMod = (modId: string) => {
    setSelectedMods(prev => {
      if (prev.includes(modId)) return prev.filter(m => m !== modId);
      if (prev.length >= 2) return prev;
      return [...prev, modId];
    });
  };

  const handleDelete = async () => {
    if (!isEditing || !initialData?.id_tarea) return;
    
    if (!window.confirm("¿Seguro que querés borrar esta tarea? No se puede deshacer")) {
      return;
    }

    setIsDeleting(true);
    setApiError(null);

    try {
      const res = await fetch(`/api/tareas/${initialData.id_tarea}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const data = await res.json();
        const errMsg = Array.isArray(data.message) ? data.message.join(' | ') : (data.message || data.error || 'Error al eliminar');
        setApiError(errMsg);
      } else {
        onSuccess();
      }
    } catch (err) {
      setApiError('Error de red al eliminar la tarea.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);

    if (selectedTags.length === 0) {
      setApiError('Debes seleccionar al menos un sub-pilar (tag).');
      return;
    }
    if (!principalTag) {
      setApiError('Debes marcar exactamente un sub-pilar como Principal.');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const getVal = (key: string) => formData.get(key)?.toString().trim() || null;
    const getNum = (key: string) => {
      const val = getVal(key);
      return val ? parseInt(val, 10) : null;
    };
    const getArr = (key: string) => {
      const val = getVal(key);
      return val ? val.split(',').map(s => s.trim()).filter(Boolean) : [];
    };

    const tarea_subpilares = selectedTags.map(tag => ({
      subpilar_codigo: tag,
      es_principal: tag === principalTag
    }));

    const fullPayload: any = {
      id_tarea: getVal('id_tarea'),
      nombre: getVal('nombre'),
      familia: getVal('familia'),
      tarea_subpilares,
      nivel: getNum('nivel'),
      variante: getVal('variante'),
      naturaleza: getVal('naturaleza'),
      bloque_sesion: getVal('bloque_sesion'),
      duracion_estimada: getVal('duracion_estimada'),
      carga_estimada_rpe_fisico: getNum('carga_estimada_rpe_fisico'),
      carga_estimada_rpe_mental: getNum('carga_estimada_rpe_mental'),
      jugadores_min: getNum('jugadores_min'),
      jugadores_max: getNum('jugadores_max'),
      posiciones_recomendadas: getArr('posiciones_recomendadas'),
      meta_ejercicio: getVal('meta_ejercicio'),
      densidad_espacial: getVal('densidad_espacial'),
      resolucion_numerica: getVal('resolucion_numerica'),
      formato_numerico: getVal('formato_numerico'),
      reglas_provocacion: getArr('reglas_provocacion'),
      reglas_continuidad: getArr('reglas_continuidad'),
      material: getArr('material'),
      espacio: getVal('espacio'),
      sensores_requeridos: getNum('sensores_requeridos'),
      descripcion: getVal('descripcion'),
      objetivo_principal: getVal('objetivo_principal'),
      consigna_al_jugador: getVal('consigna_al_jugador'),
      criterio_exito: getVal('criterio_exito'),
      errores_frecuentes: getVal('errores_frecuentes'),
      variante_mas_facil: getVal('variante_mas_facil'),
      variante_mas_dificil: getVal('variante_mas_dificil'),
      progresa_hacia: getVal('progresa_hacia'),
      regresa_hacia: getVal('regresa_hacia'),
      modificadores_avanzados: selectedMods,
      video_url: getVal('video_url'),
      imagen_url: getVal('imagen_url'),
      notas: getVal('notas'),
    };

    let payload = fullPayload;
    let url = '/api/tareas';
    let method = 'POST';

    // Si estamos editando, solo mandamos los campos que cambiaron
    if (isEditing) {
      payload = {};
      url = `/api/tareas/${initialData.id_tarea}`;
      method = 'PATCH';

      Object.keys(fullPayload).forEach(key => {
        const newVal = fullPayload[key];
        const oldVal = initialData[key];

        // Comparación simple profunda para arrays (tags y mods)
        if (Array.isArray(newVal) || Array.isArray(oldVal)) {
          if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
            payload[key] = newVal;
          }
        } else if (newVal !== oldVal) {
          payload[key] = newVal;
        }
      });
      
      // Si editamos el ID de la tarea y este fue modificado
      if (payload.id_tarea) {
         // La API no debería permitir modificar el ID, pero por las dudas lo sacamos si es PATCH
         // O mejor dicho, mantenemos lo que hay. Usualmente el ID no se actualiza en un PATCH
         delete payload.id_tarea;
      }
      
      if (Object.keys(payload).length === 0) {
        // Nada cambió
        onSuccess();
        return;
      }
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        const errMsg = Array.isArray(data.message) ? data.message.join(' | ') : (data.message || data.error || 'Error desconocido');
        setApiError(errMsg);
      } else {
        onSuccess();
      }
    } catch (err) {
      setApiError('Error de red al intentar comunicarse con el servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content form-modal">
        <header className="modal-header">
          <div>
            <h2 className="modal-title">{isEditing ? 'Editar Tarea' : 'Crear Nueva Tarea'}</h2>
            <p className="modal-subtitle">{isEditing ? `Modificando: ${initialData?.nombre}` : 'Completá los campos para agregar a la biblioteca'}</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {isEditing && (
              <button 
                type="button" 
                className="btn-delete" 
                onClick={handleDelete} 
                disabled={isDeleting}
                style={{ backgroundColor: '#ff4444', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                {isDeleting ? 'Borrando...' : 'Borrar Tarea'}
              </button>
            )}
            <button type="button" className="modal-close" onClick={onClose}>&times;</button>
          </div>
        </header>

        <div className="modal-body">
          {apiError && (
            <div className="api-error-banner">
              <strong>Error de Validación:</strong> {apiError}
            </div>
          )}

          <form id="tareaForm" onSubmit={handleSubmit} className="form-layout">
            
            <section className="form-section">
              <h3>1. Identificación (Obligatorio)</h3>
              <div className="grid-3">
                <div className="form-group">
                  <label>ID Tarea *</label>
                  <input type="text" name="id_tarea" required placeholder="TEC-PAC-N2-001" defaultValue={initialData?.id_tarea} disabled={isEditing} />
                </div>
                <div className="form-group">
                  <label>Nombre *</label>
                  <input type="text" name="nombre" required placeholder="Pase corto con sensor" defaultValue={initialData?.nombre} />
                </div>
                <div className="form-group">
                  <label>Familia *</label>
                  <input type="text" name="familia" required placeholder="Pase corto" defaultValue={initialData?.familia} />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h3>2. Clasificación (Tags) *</h3>
              <p className="form-help">Seleccioná los sub-pilares. Marcá con el radio button cuál es el <strong>Principal</strong>.</p>
              <div className="tags-grid">
                {Object.entries(SUB_PILARES).map(([pilarName, subpilares]) => (
                  <div key={pilarName} className="pilar-col">
                    <h4>{pilarName}</h4>
                    {subpilares.map(sp => (
                      <div key={sp.id} className="tag-checkbox-row">
                        <label className="checkbox-label">
                          <input 
                            type="checkbox" 
                            checked={selectedTags.includes(sp.id)}
                            onChange={() => toggleTag(sp.id)}
                          />
                          <span className="tag-name">{sp.id}</span>
                        </label>
                        {selectedTags.includes(sp.id) && (
                          <input 
                            type="radio" 
                            name="principal_tag_radio"
                            checked={principalTag === sp.id}
                            onChange={() => setPrincipalTag(sp.id)}
                            title="Marcar como Principal"
                            className="principal-radio"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>

            <section className="form-section">
              <h3>3. Progresión (Obligatorio)</h3>
              <div className="grid-2">
                <div className="form-group">
                  <label>Nivel (1-5) *</label>
                  <input type="number" name="nivel" min="1" max="5" required defaultValue={initialData?.nivel} />
                </div>
                <div className="form-group">
                  <label>Variante (Descripción) *</label>
                  <textarea name="variante" rows={2} required placeholder="Describí qué cambia en este nivel..." defaultValue={initialData?.variante}></textarea>
                </div>
              </div>
            </section>

            <section className="form-section">
              <h3>4. Metadatos Prácticos (Obligatorio)</h3>
              <div className="grid-3">
                <div className="form-group">
                  <label>Naturaleza *</label>
                  <select name="naturaleza" required defaultValue={initialData?.naturaleza}>
                    <option value="">Seleccionar...</option>
                    <option value="ANALITICO">Analítico</option>
                    <option value="GLOBAL">Global</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Bloque Sesión *</label>
                  <select name="bloque_sesion" required defaultValue={initialData?.bloque_sesion}>
                    <option value="">Seleccionar...</option>
                    <option value="ACTIVACION">Activación (0-5')</option>
                    <option value="MOVILIDAD_PREVENCION">Mov/Prev (5-15')</option>
                    <option value="TECNICA">Técnica (15-25')</option>
                    <option value="DECISION">Decisión (25-45')</option>
                    <option value="TRANSFERENCIA">Transferencia (45-55')</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Duración Estimada *</label>
                  <input type="text" name="duracion_estimada" required placeholder="8-10 min" defaultValue={initialData?.duracion_estimada} />
                </div>
                <div className="form-group">
                  <label>RPE Físico (1-10) *</label>
                  <input type="number" name="carga_estimada_rpe_fisico" min="1" max="10" required defaultValue={initialData?.carga_estimada_rpe_fisico} />
                </div>
                <div className="form-group">
                  <label>RPE Mental (1-10) *</label>
                  <input type="number" name="carga_estimada_rpe_mental" min="1" max="10" required defaultValue={initialData?.carga_estimada_rpe_mental} />
                </div>
                <div className="form-group">
                  <label>Jugadores Min *</label>
                  <input type="number" name="jugadores_min" min="1" required defaultValue={initialData?.jugadores_min} />
                </div>
                <div className="form-group">
                  <label>Jugadores Max *</label>
                  <input type="number" name="jugadores_max" min="1" required defaultValue={initialData?.jugadores_max} />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h3>5. Recursos (Obligatorio)</h3>
              <div className="grid-3">
                <div className="form-group">
                  <label>Espacio Requerido *</label>
                  <input type="text" name="espacio" required placeholder="Cuadrado 15x15m" defaultValue={initialData?.espacio} />
                </div>
                <div className="form-group">
                  <label>Sensores Requeridos (0-4) *</label>
                  <input type="number" name="sensores_requeridos" min="0" max="4" required defaultValue={initialData?.sensores_requeridos} />
                </div>
                <div className="form-group">
                  <label>Materiales * (separados por coma)</label>
                  <input type="text" name="material" required placeholder="4 conos, 2 balones" defaultValue={initialData?.material?.join(', ')} />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h3>6. Descripción y Ejecución (Obligatorio)</h3>
              <div className="grid-1">
                <div className="form-group">
                  <label>Objetivo Principal *</label>
                  <input type="text" name="objetivo_principal" required defaultValue={initialData?.objetivo_principal} />
                </div>
                <div className="form-group">
                  <label>Descripción Completa *</label>
                  <textarea name="descripcion" rows={4} required defaultValue={initialData?.descripcion}></textarea>
                </div>
              </div>
            </section>

            {/* SECCIÓN COLAPSABLE PARA OPCIONALES */}
            <div className="optionals-toggle">
              <button 
                type="button" 
                className="btn-toggle-optionals" 
                onClick={() => setShowOptionals(!showOptionals)}
              >
                {showOptionals ? 'Ocultar Campos Opcionales' : 'Mostrar Campos Opcionales (Juego, Modificadores, etc.)'}
              </button>
            </div>

            {showOptionals && (
              <div className="optionals-container">
                <section className="form-section">
                  <h3>7. Estructura de Juego (Opcional - Nivel 4/5)</h3>
                  <div className="grid-3">
                    <div className="form-group">
                      <label>Meta Ejercicio</label>
                      <select name="meta_ejercicio" defaultValue={initialData?.meta_ejercicio || ""}>
                        <option value="">No aplica</option>
                        <option value="CONSERVACION">Conservación</option>
                        <option value="FINALIZACION">Finalización</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Densidad Espacial</label>
                      <select name="densidad_espacial" defaultValue={initialData?.densidad_espacial || ""}>
                        <option value="">No aplica</option>
                        <option value="MICRO">Micro</option>
                        <option value="MACRO">Macro</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Resolución Numérica</label>
                      <select name="resolucion_numerica" defaultValue={initialData?.resolucion_numerica || ""}>
                        <option value="">No aplica</option>
                        <option value="IGUALDAD">Igualdad</option>
                        <option value="SUPERIORIDAD">Superioridad</option>
                        <option value="INFERIORIDAD">Inferioridad</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Formato Numérico</label>
                      <input type="text" name="formato_numerico" placeholder="3v2, 2v2+1..." defaultValue={initialData?.formato_numerico} />
                    </div>
                  </div>
                  <div className="grid-2 mt-2">
                    <div className="form-group">
                      <label>Reglas Provocación (separadas por coma)</label>
                      <textarea name="reglas_provocacion" rows={2} placeholder="Máx 2 toques, Gol vale doble..." defaultValue={initialData?.reglas_provocacion?.join(', ')}></textarea>
                    </div>
                    <div className="form-group">
                      <label>Reglas Continuidad (separadas por coma)</label>
                      <textarea name="reglas_continuidad" rows={2} placeholder="Saque del DT al salir, Sin laterales..." defaultValue={initialData?.reglas_continuidad?.join(', ')}></textarea>
                    </div>
                  </div>
                </section>

                <section className="form-section">
                  <h3>8. Modificadores Avanzados (Opcional - Máx 2)</h3>
                  <div className="mods-grid">
                    {MODIFICADORES_AVANZADOS.map(mod => {
                      const isChecked = selectedMods.includes(mod.id);
                      const isDisabled = !isChecked && selectedMods.length >= 2;
                      return (
                        <label key={mod.id} className={`checkbox-label ${isDisabled ? 'disabled' : ''}`}>
                          <input 
                            type="checkbox" 
                            checked={isChecked}
                            onChange={() => toggleMod(mod.id)}
                            disabled={isDisabled}
                          />
                          <span className="tag-name">{mod.nombre}</span>
                        </label>
                      );
                    })}
                  </div>
                </section>

                <section className="form-section">
                  <h3>9. Escalabilidad y Detalles Extra (Opcional)</h3>
                  <div className="grid-2">
                    <div className="form-group">
                      <label>Variante Más Fácil</label>
                      <input type="text" name="variante_mas_facil" defaultValue={initialData?.variante_mas_facil} />
                    </div>
                    <div className="form-group">
                      <label>Variante Más Difícil</label>
                      <input type="text" name="variante_mas_dificil" defaultValue={initialData?.variante_mas_dificil} />
                    </div>
                    <div className="form-group">
                      <label>Progresa Hacia (ID)</label>
                      <input type="text" name="progresa_hacia" defaultValue={initialData?.progresa_hacia} />
                    </div>
                    <div className="form-group">
                      <label>Regresa Hacia (ID)</label>
                      <input type="text" name="regresa_hacia" defaultValue={initialData?.regresa_hacia} />
                    </div>
                    <div className="form-group">
                      <label>Consigna al Jugador</label>
                      <input type="text" name="consigna_al_jugador" defaultValue={initialData?.consigna_al_jugador} />
                    </div>
                    <div className="form-group">
                      <label>Criterio de Éxito</label>
                      <input type="text" name="criterio_exito" defaultValue={initialData?.criterio_exito} />
                    </div>
                    <div className="form-group">
                      <label>Errores Frecuentes</label>
                      <input type="text" name="errores_frecuentes" defaultValue={initialData?.errores_frecuentes} />
                    </div>
                    <div className="form-group">
                      <label>Posiciones Recomendadas (separadas por coma)</label>
                      <input type="text" name="posiciones_recomendadas" defaultValue={initialData?.posiciones_recomendadas?.join(', ')} />
                    </div>
                    <div className="form-group">
                      <label>Video URL</label>
                      <input type="url" name="video_url" defaultValue={initialData?.video_url} />
                    </div>
                    <div className="form-group">
                      <label>Imagen URL</label>
                      <input type="url" name="imagen_url" defaultValue={initialData?.imagen_url} />
                    </div>
                  </div>
                  <div className="form-group mt-2">
                    <label>Notas Internas</label>
                    <textarea name="notas" rows={2} defaultValue={initialData?.notas}></textarea>
                  </div>
                </section>
              </div>
            )}

          </form>
        </div>

        <footer className="modal-footer">
          <button type="button" className="btn-cancel" onClick={onClose} disabled={isSubmitting || isDeleting}>Cancelar</button>
          <button type="submit" form="tareaForm" className="btn-submit" disabled={isSubmitting || isDeleting}>
            {isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Tarea')}
          </button>
        </footer>
      </div>
    </div>
  );
}
