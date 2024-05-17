import { useContext } from 'react';
import { Contexto } from '../context';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ProductoCarrito from './ProductoCarrito';
import estilos from '../estilos/Carrito.module.css';

function Carrito() {
  const { carrito, mostrarCarrito, carritoAbierto, vaciarCarrito } = useContext(Contexto);

  const claseCarrito = carritoAbierto ? `${estilos.wrapper} ${estilos.mostrar}` : estilos.wrapper;
  const carritoVacio = carrito.length === 0;
  const contenidoCarrito = !carritoVacio ? (
    carrito.map((producto) => <ProductoCarrito producto={producto} key={producto.id} />)
  ) : (
    <h4>No hay productos en el carrito</h4>
  );

  return (
    <div className={claseCarrito}>
      <div className={estilos.contenido}>
        <span className={estilos.cerrar} onClick={mostrarCarrito}>
          <XMarkIcon />
        </span>
        {contenidoCarrito}
      </div>
      <div className={estilos.acciones}>
        <button className={estilos.botonIr}>Ir al carrito</button>
        <button onClick={vaciarCarrito} className={`${estilos.botonVaciar} ${carritoVacio && estilos.escondido}`}>
          Vaciar carrito
        </button>
      </div>
    </div>
  );
}

export default Carrito;
