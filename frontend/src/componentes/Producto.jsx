import { useContext } from 'react';
import { Contexto } from '../context';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import estilos from '../estilos/Producto.module.css';

function Producto({ producto }) {
  const { esUsuario, anadirCarrito } = useContext(Contexto);

  return (
    <div className={estilos.wrapper}>
      <Link to={`${producto.id}`}>
        <div className={estilos.imagen}>
          <img
            src={producto.imagen}
            alt={`Imagen del producto ${producto.nombre} en la lista de productos`}
            loading='lazy'
          />
        </div>
      </Link>
      <div className={estilos.infoProducto}>
        <Link to={`${producto.id}`} className={estilos.nombre}>
          <h3>{producto.nombre}</h3>
        </Link>

        <div className={estilos.precioCarrito}>
          <h4>{producto.precio}€</h4>
          <button
            className={`${estilos.botonCarrito} ${!esUsuario && estilos.desactivado}`}
            onClick={anadirCarrito(producto)}
            disabled={!esUsuario}
          >
            <ShoppingCartIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Producto;
