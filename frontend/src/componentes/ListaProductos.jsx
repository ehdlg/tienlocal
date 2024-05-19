import Producto from './Producto';
import estilos from '../estilos/Productos.module.css';

/**
 * Componente para mostrar una lista de productos.
 * @param {Array} productos - Lista de productos a mostrar.
 */
function ListaProductos({ productos }) {
  const sinProductos = productos.length === 0;

  // Si no hay productos, muestra un mensaje indicando que no hay productos disponibles
  if (sinProductos) return <h2>No hay productos que coincidan con los filtros establecidos.</h2>;

  // Si hay productos, muestra cada uno de ellos
  return (
    <div className={estilos.wrapper}>
      {productos.map((producto) => {
        return <Producto producto={producto} key={producto.id} />;
      })}
    </div>
  );
}

export default ListaProductos;
