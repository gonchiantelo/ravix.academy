'use client';
import { useState, useEffect, useMemo } from 'react';
import { TareaCard } from './TareaCard';
import { TareaDetailModal } from './TareaDetailModal';
import { TareaFormModal } from './TareaFormModal';
import './dashboard.css';

export default function TareasList() {
  const [tareas, setTareas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTarea, setSelectedTarea] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Estados de los filtros
  const [filtros, setFiltros] = useState({
    tag: '',
    nivel: '',
    rpeFisico: '',
    rpeMental: '',
    densidad: '',
    meta: '',
    resolucion: '',
  });

  const fetchTareas = () => {
    setLoading(true);
    fetch('/api/tareas')
      .then(res => res.json())
      .then(data => {
        setTareas(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  };

  // Fetch inicial llamando al Route Handler (/api/tareas)
  useEffect(() => {
    fetchTareas();
  }, []);

  // Extraer tags únicos de la data cargada para el dropdown
  const tagsUnicos = useMemo(() => {
    const tags = new Set<string>();
    tareas.forEach(t => {
      t.tarea_subpilares?.forEach((ts: any) => tags.add(ts.subpilar_codigo));
    });
    return Array.from(tags).sort();
  }, [tareas]);

  // Filtrado reactivo en el cliente
  const tareasFiltradas = useMemo(() => {
    return tareas.filter(t => {
      // Regla general: Si el filtro tiene valor, la tarea DEBE cumplirlo.
      // Si la tarea tiene ese campo en null/undefined, la comparación falla y se excluye (lo cual es correcto).
      if (filtros.nivel && t.nivel?.toString() !== filtros.nivel) return false;
      if (filtros.rpeFisico && t.carga_estimada_rpe_fisico?.toString() !== filtros.rpeFisico) return false;
      if (filtros.rpeMental && t.carga_estimada_rpe_mental?.toString() !== filtros.rpeMental) return false;
      if (filtros.densidad && t.densidad_espacial !== filtros.densidad) return false;
      if (filtros.meta && t.meta_ejercicio !== filtros.meta) return false;
      if (filtros.resolucion && t.resolucion_numerica !== filtros.resolucion) return false;
      
      // Filtro especial para arrays (subpilares)
      if (filtros.tag) {
        const tieneTag = t.tarea_subpilares?.some((ts: any) => ts.subpilar_codigo === filtros.tag);
        if (!tieneTag) return false;
      }

      return true;
    });
  }, [tareas, filtros]);

  const updateFiltro = (key: string, val: string) => {
    setFiltros(prev => ({ ...prev, [key]: val }));
  };

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR DE FILTROS */}
      <aside className="sidebar-filtros">
        <h2>Filtros</h2>
        
        <div className="filtro-grupo">
          <label>Nivel</label>
          <select value={filtros.nivel} onChange={e => updateFiltro('nivel', e.target.value)}>
            <option value="">Todos los niveles</option>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>Nivel {n}</option>)}
          </select>
        </div>

        <div className="filtro-grupo">
          <label>Sub-Pilar (Tag)</label>
          <select value={filtros.tag} onChange={e => updateFiltro('tag', e.target.value)}>
            <option value="">Cualquier Tag</option>
            {tagsUnicos.map(tag => <option key={tag} value={tag}>{tag}</option>)}
          </select>
        </div>

        <div className="filtro-grupo">
          <label>RPE Físico</label>
          <select value={filtros.rpeFisico} onChange={e => updateFiltro('rpeFisico', e.target.value)}>
            <option value="">Todos</option>
            {Array.from({length:10}, (_,i)=>i+1).map(n => <option key={n} value={n}>Carga {n}</option>)}
          </select>
        </div>

        <div className="filtro-grupo">
          <label>RPE Mental</label>
          <select value={filtros.rpeMental} onChange={e => updateFiltro('rpeMental', e.target.value)}>
            <option value="">Todos</option>
            {Array.from({length:10}, (_,i)=>i+1).map(n => <option key={n} value={n}>Carga {n}</option>)}
          </select>
        </div>

        <div className="filtro-grupo">
          <label>Densidad Espacial</label>
          <select value={filtros.densidad} onChange={e => updateFiltro('densidad', e.target.value)}>
            <option value="">Todas</option>
            <option value="MICRO">Micro</option>
            <option value="MACRO">Macro</option>
          </select>
        </div>

        <div className="filtro-grupo">
          <label>Meta del Ejercicio</label>
          <select value={filtros.meta} onChange={e => updateFiltro('meta', e.target.value)}>
            <option value="">Todas</option>
            <option value="CONSERVACION">Conservación</option>
            <option value="FINALIZACION">Finalización</option>
          </select>
        </div>

        <div className="filtro-grupo">
          <label>Resolución Numérica</label>
          <select value={filtros.resolucion} onChange={e => updateFiltro('resolucion', e.target.value)}>
            <option value="">Todas</option>
            <option value="IGUALDAD">Igualdad</option>
            <option value="SUPERIORIDAD">Superioridad</option>
            <option value="INFERIORIDAD">Inferioridad</option>
          </select>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="dashboard-content">
        <header className="dashboard-header">
          <h1>Biblioteca de Tareas</h1>
          <div className="header-actions">
            <span>{tareasFiltradas.length} tareas encontradas</span>
            <button className="btn-nueva-tarea" onClick={() => {
              setSelectedTarea(null);
              setShowForm(true);
            }}>
              + Nueva Tarea
            </button>
            <form action={async () => {
              // Hack rápido para logout desde Client Component (solo para pruebas)
              fetch('/api/logout', { method: 'POST' }).then(() => window.location.href = '/login');
            }}>
              <button type="button" onClick={() => {
                document.cookie = 'ravix_session=; Max-Age=0; path=/;';
                window.location.href = '/login';
              }} className="logout-btn">
                Cerrar Sesión
              </button>
            </form>
          </div>
        </header>
        
        {loading ? (
          <div className="loading">Cargando tareas desde la base de datos...</div>
        ) : (
          <div className="tareas-grid">
            {tareasFiltradas.map(t => (
              <TareaCard key={t.id_tarea} tarea={t} onClick={() => setSelectedTarea(t)} />
            ))}
            {tareasFiltradas.length === 0 && (
              <div className="no-results">No hay tareas que coincidan con los filtros aplicados.</div>
            )}
          </div>
        )}

        {selectedTarea && !showForm && (
          <TareaDetailModal 
            tarea={selectedTarea} 
            onClose={() => setSelectedTarea(null)} 
            onEdit={() => setShowForm(true)}
          />
        )}

        {showForm && (
          <TareaFormModal 
            initialData={selectedTarea}
            onClose={() => {
              setShowForm(false);
              // Si estábamos editando, al cerrar el form volvemos al detail.
              // Si no estábamos editando (nueva), selectedTarea ya era null.
            }} 
            onSuccess={() => {
              setShowForm(false);
              setSelectedTarea(null);
              fetchTareas();
            }} 
          />
        )}
      </main>
    </div>
  );
}
