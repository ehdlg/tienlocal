import { useState } from 'react';
import useGetDatos from '../hooks/useGetDatos';
import Filtros from './Filtros';
import Paginacion from './Paginacion';
import Loading from './Loading';
import { LIMITE_PRODUCTOS, FILTROS_DEFECTO, LIMITE_DEFECTO, OFFSET_DEFECTO } from '../constantes';
import ListaProductos from './ListaProductos';

function Productos() {
  const [filtros, setFiltros] = useState(FILTROS_DEFECTO);
  const [pagina, setPagina] = useState(1);
  const ACTUALIZAR_PAGINA = {
    siguiente: () => setPagina((prevPagina) => prevPagina + 1),
    anterior: () => setPagina((prevPagina) => prevPagina - 1),
    ir: (nuevaPagina) => setPagina(nuevaPagina),
  };

  function actualizarFiltros(nuevosFiltros) {
    setPagina(1);
    setFiltros(nuevosFiltros);
  }

  const OFFSET = pagina === 1 ? 0 : (pagina - 1) * LIMITE_PRODUCTOS;

  const {
    datos: cantidadProductos,
    loading: loadingCantidad,
    error: errorCantidad,
  } = useGetDatos('productos/cantidad', LIMITE_DEFECTO, OFFSET_DEFECTO, filtros) ?? 1;

  const {
    datos: productos,
    error: errorProductos,
    loading: loadingProductos,
  } = useGetDatos('productos', LIMITE_PRODUCTOS, OFFSET, filtros);

  const numeroPaginas = null != cantidadProductos ? Math.ceil(cantidadProductos / LIMITE_PRODUCTOS) : 1;

  if (loadingProductos || loadingCantidad) return <Loading />;
  if (errorProductos || errorCantidad) return <h1>Error: No se ha podido establecer conexion con la base de datos</h1>;

  return (
    <>
      <Filtros filtros={filtros} actualizarFiltros={actualizarFiltros} />

      <ListaProductos productos={productos} />

      <Paginacion actualizar={ACTUALIZAR_PAGINA} pagina={pagina} numeroPaginas={numeroPaginas} />
    </>
  );
}

export default Productos;
