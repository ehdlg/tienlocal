import useGetDatos from '../hooks/useGetDatos'; // Importa el hook useGetDatos
import { formatearFecha } from '../utils/funciones'; // Importa la función formatearFecha
import Loading from './Loading'; // Importa el componente Loading
import estilos from '../estilos/Perfil.module.css'; // Importa los estilos del componente Perfil

function Analiticas() {
  // Define el componente Analiticas
  const { datos, loading, error } = useGetDatos('administrador/analiticas'); // Obtiene datos, loading y error del hook useGetDatos

  if (loading) return <Loading />; // Renderiza el componente Loading si loading es true

  if (error) return <h1>Error: {error}</h1>; // Renderiza un mensaje de error si error es verdadero

  return (
    // Renderiza el contenido de Analiticas
    <>
      <h3>Analíticas de la Base de Datos</h3> {/* Título de las analíticas */}
      <div className={estilos.tabla}>
        {' '}
        {/* Contenedor de la tabla */}
        <div className={estilos.encabezadoTabla}>
          {' '}
          {/* Encabezado de la tabla */}
          <span>Tabla</span> {/* Nombre de la columna */}
          <span>Cantidad</span> {/* Nombre de la columna */}
          <span>Último Registro</span> {/* Nombre de la columna */}
        </div>
        {Object.keys(datos).map(
          (
            tabla // Mapea las claves de datos para cada tabla
          ) => (
            <div key={tabla} className={estilos.filaTabla}>
              {' '}
              {/* Fila de la tabla */}
              <span>{tabla}</span> {/* Nombre de la tabla */}
              <span>{datos[tabla].cantidad}</span> {/* Cantidad de registros */}
              <span>{formatearFecha(datos[tabla].ultimoRegistro)}</span> {/* Última fecha de registro formateada */}
            </div>
          )
        )}
      </div>
    </>
  );
}

export default Analiticas; // Exporta el componente Analiticas
