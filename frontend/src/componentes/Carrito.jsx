import { useContext } from 'react';
import { Contexto } from '../context';
import { Link } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ProductoCarrito from './ProductoCarrito';
import estilos from '../estilos/Carrito.module.css';

/**
 * Componente que muestra el contenido del carrito de compras.
 * Permite al usuario ver los productos que ha agregado al carrito, vaciar el carrito y proceder a la compra.
 */
function Carrito() {
  const { carrito, mostrarCarrito, carritoAbierto, vaciarCarrito } = useContext(Contexto);

  // Determina la clase CSS para el contenedor del carrito basado en si está abierto o cerrado
  const claseCarrito = carritoAbierto ? `${estilos.wrapper} ${estilos.mostrar}` : estilos.wrapper;

  // Verifica si el carrito está vacío
  const carritoVacio = carrito.length === 0;

  // Contenido del carrito, mostrando los productos o un mensaje si está vacío
  const contenidoCarrito = !carritoVacio ? (
    carrito.map((producto) => <ProductoCarrito producto={producto} key={producto.id} />)
  ) : (
    <h4>No hay productos en el carrito</h4>
  );

  return (
    <div className={claseCarrito}>
      <div className={estilos.contenido}>
        {/* Botón para cerrar el carrito */}
        <span className={estilos.cerrar} onClick={mostrarCarrito}>
          <XMarkIcon />
        </span>
        {/* Contenido del carrito */}
        {contenidoCarrito}
      </div>
      {/* Acciones del carrito: Ir al carrito o vaciar el carrito */}
      <div className={`${estilos.acciones} ${carritoVacio && estilos.escondido}`}>
        {/* Botón para ir al carrito de compras */}
        <Link to='compra'>
          <button className={estilos.botonIr}>Ir al carrito</button>
        </Link>
        {/* Botón para vaciar el carrito */}
        <button onClick={vaciarCarrito} className={estilos.botonVaciar}>
          Vaciar carrito
        </button>
      </div>
    </div>
  );
}

export default Carrito;
