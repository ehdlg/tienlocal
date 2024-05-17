import { Link } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline';
import estilos from '../estilos/Perfil.module.css';

function Tabla({ datos, children, eliminar, esProducto = false }) {
  const encabezados = Object.keys(datos[0]);

  return (
    <div className={estilos.tabla}>
      <div className={estilos.encabezadoTabla}>
        {encabezados.map((encabezado) => {
          return <span key={encabezado}>{encabezado}</span>;
        })}
        <span>Acciones</span>
      </div>
      {datos.map((dato) => (
        <div key={dato.nombre} className={estilos.filaTabla}>
          {encabezados.map((clave) => {
            return <span key={clave}>{dato[clave]}</span>;
          })}
          <div className={estilos.acciones}>
            {esProducto && (
              <Link to={`/productos/${dato.id}/editar`}>
                <button className={estilos.botonEditar}>Editar</button>
              </Link>
            )}
            <button className={`${estilos.boton} ${estilos.botonEliminar}`} onClick={eliminar(dato.id)}>
              <TrashIcon />
              Eliminar
            </button>
          </div>
        </div>
      ))}

      {children}
    </div>
  );
}

export default Tabla;
