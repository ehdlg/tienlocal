import { Link } from 'react-router-dom'; // Importa Link de react-router-dom para crear enlaces
import { TrashIcon } from '@heroicons/react/24/outline'; // Importa TrashIcon de Heroicons para el icono de eliminar
import estilos from '../estilos/Perfil.module.css'; // Importa los estilos del componente Tabla

function Tabla({ datos, children, eliminar, esProducto = false }) {
  //Si no hay datos o hay algun error al recibir los datos, se muestra un un mensaje informado que no hay nada que mostrar
  if (null == datos || datos.length == 0) {
    return (
      <div className={estilos.tabla}>
        <h4>No hay nada que mostrar</h4>
        {children}
      </div>
    );
  }
  // Define el componente Tabla
  const encabezados = Object.keys(datos[0]); // Obtiene los encabezados de los datos

  return (
    // Renderiza el contenido del componente Tabla
    <div className={estilos.tabla}>
      {' '}
      {/* Contenedor principal de la tabla */}
      <div className={estilos.encabezadoTabla}>
        {' '}
        {/* Encabezado de la tabla */}
        {encabezados.map((encabezado) => {
          // Mapea los encabezados
          return <span key={encabezado}>{encabezado}</span>; // Renderiza cada encabezado
        })}
        <span>Acciones</span> {/* Columna de acciones */}
      </div>
      {datos.map(
        (
          dato // Mapea los datos de la tabla
        ) => (
          <div key={dato.nombre} className={estilos.filaTabla}>
            {/* Fila de la tabla */}
            {encabezados.map((clave) => {
              // Mapea las claves de los datos
              return <span key={clave}>{dato[clave]}</span>; // Renderiza cada dato
            })}
            <div className={estilos.acciones}>
              {' '}
              {/* Acciones disponibles para cada fila */}
              {esProducto && ( // Renderiza el botón de editar si es un producto
                <Link to={`/productos/${dato.id}/editar`}>
                  {/* Enlace para editar el producto */}
                  <button className={estilos.botonEditar}>Editar</button> {/* Botón para editar */}
                </Link>
              )}
              <button className={`${estilos.boton} ${estilos.botonEliminar}`} onClick={eliminar(dato.id)}>
                {/* Botón para eliminar */}
                <TrashIcon /> {/* Icono de eliminar */}
                Eliminar
              </button>
            </div>
          </div>
        )
      )}
      {children} {/* Renderiza los hijos del componente */}
    </div>
  );
}

export default Tabla; // Exporta el componente Tabla
