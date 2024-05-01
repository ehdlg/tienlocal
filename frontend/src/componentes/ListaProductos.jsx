import Producto from './Producto';
import estilos from '../estilos/Productos.module.css';

function ListaProductos({ productos }) {
  const sinProductos = productos.length === 0;

  if (sinProductos) return <h2>No hay productos que coincidan con los filtros establecidos.</h2>;

  return (
    <div className={estilos.wrapper}>
      {productos.map((producto) => {
        return <Producto producto={producto} key={producto.id} />;
      })}
    </div>
  );
}

export default ListaProductos;
