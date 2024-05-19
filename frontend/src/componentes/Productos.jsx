import { useState } from 'react'; // Importa el hook useState desde React
import useGetDatos from '../hooks/useGetDatos'; // Importa el hook personalizado useGetDatos
import Filtros from './Filtros'; // Importa el componente Filtros
import Paginacion from './Paginacion'; // Importa el componente Paginacion
import Loading from './Loading'; // Importa el componente Loading
import { LIMITE_PRODUCTOS, FILTROS_DEFECTO, LIMITE_DEFECTO, OFFSET_DEFECTO } from '../constantes'; // Importa constantes relacionadas con los productos
import ListaProductos from './ListaProductos'; // Importa el componente ListaProductos

function Productos() {
  const [filtros, setFiltros] = useState(FILTROS_DEFECTO); // Estado para almacenar los filtros de productos
  const [pagina, setPagina] = useState(1); // Estado para almacenar el número de página actual
  const ACTUALIZAR_PAGINA = {
    // Objeto con funciones para actualizar la página
    siguiente: () => setPagina((prevPagina) => prevPagina + 1),
    anterior: () => setPagina((prevPagina) => prevPagina - 1),
    ir: (nuevaPagina) => setPagina(nuevaPagina),
  };

  function actualizarFiltros(nuevosFiltros) {
    // Función para actualizar los filtros de productos
    setPagina(1); // Reinicia la página a la primera cuando se actualizan los filtros
    setFiltros(nuevosFiltros); // Actualiza los filtros con los nuevos filtros recibidos
  }

  const OFFSET = pagina === 1 ? 0 : (pagina - 1) * LIMITE_PRODUCTOS; // Calcula el offset para la consulta de productos

  const {
    datos: cantidadProductos, // Datos de la cantidad total de productos
    loading: loadingCantidad, // Estado de carga de la cantidad de productos
    error: errorCantidad, // Error al obtener la cantidad de productos
  } = useGetDatos('productos/cantidad', LIMITE_DEFECTO, OFFSET_DEFECTO, filtros) ?? 1; // Obtiene la cantidad total de productos

  const {
    datos: productos, // Datos de los productos de la página actual
    error: errorProductos, // Error al obtener los productos
    loading: loadingProductos, // Estado de carga de los productos
  } = useGetDatos('productos', LIMITE_PRODUCTOS, OFFSET, filtros); // Obtiene los productos de la página actual

  const numeroPaginas = null != cantidadProductos ? Math.ceil(cantidadProductos / LIMITE_PRODUCTOS) : 1; // Calcula el número total de páginas

  if (loadingProductos || loadingCantidad) return <Loading />; // Muestra el componente Loading mientras se cargan los datos
  if (errorProductos || errorCantidad) return <h1>Error: No se ha podido establecer conexion con la base de datos</h1>; // Muestra un mensaje de error si ocurre un error al obtener los datos

  return (
    <>
      {' '}
      {/* Fragmento para envolver los componentes */}
      <Filtros filtros={filtros} actualizarFiltros={actualizarFiltros} /> {/* Renderiza el componente Filtros */}
      <ListaProductos productos={productos} /> {/* Renderiza el componente ListaProductos */}
      <Paginacion actualizar={ACTUALIZAR_PAGINA} pagina={pagina} numeroPaginas={numeroPaginas} />{' '}
      {/* Renderiza el componente Paginacion */}
    </>
  );
}

export default Productos; // Exporta el componente Productos
