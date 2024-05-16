import { useContext } from 'react';
import { Contexto } from '../context';
import { XMarkIcon } from '@heroicons/react/24/outline';
import estilos from '../estilos/Carrito.module.css';
import ProductoCarrito from './ProductoCarrito';

function Carrito() {
  const { carrito, mostrarCarrito, carritoAbierto } = useContext(Contexto);

  const claseCarrito = carritoAbierto ? `${estilos.wrapper} ${estilos.mostrar}` : estilos.wrapper;

  const contenidoCarrito =
    carrito.length > 0 ? (
      carrito.map((producto) => <ProductoCarrito producto={producto} key={producto.id} />)
    ) : (
      <h4>No hay productos en el carrito</h4>
    );

  return (
    <aside className={claseCarrito}>
      <div className={estilos.contenido}>
        <span className={estilos.cerrar} onClick={mostrarCarrito}>
          <XMarkIcon />
        </span>
        {contenidoCarrito}
      </div>
      <button>Ir al carrito</button>
    </aside>
  );
}

export default Carrito;
