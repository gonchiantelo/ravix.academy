export function TareaCard({ tarea, onClick }: { tarea: any, onClick?: () => void }) {
  const tagPrincipal = tarea.tarea_subpilares?.find((t: any) => t.es_principal)?.subpilar_codigo;

  return (
    <div className="tarea-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="tarea-header">
        <h3 className="tarea-title">{tarea.nombre}</h3>
        <span className="tarea-nivel">Nivel {tarea.nivel}</span>
      </div>
      <div className="tarea-badges">
        <span className="badge badge-familia">{tarea.familia}</span>
        {tagPrincipal && <span className="badge badge-tag">{tagPrincipal}</span>}
      </div>
      {(tarea.meta_ejercicio || tarea.densidad_espacial || tarea.resolucion_numerica) && (
        <div className="tarea-footer">
          {tarea.meta_ejercicio && <span className="badge badge-meta">{tarea.meta_ejercicio}</span>}
          {tarea.densidad_espacial && <span className="badge badge-meta">{tarea.densidad_espacial}</span>}
          {tarea.resolucion_numerica && <span className="badge badge-meta">{tarea.resolucion_numerica}</span>}
        </div>
      )}
    </div>
  );
}
