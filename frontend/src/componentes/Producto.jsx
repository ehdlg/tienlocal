import { useContext } from 'react'; // Importa el hook useContext desde React
import { Contexto } from '../context'; // Importa el contexto desde su archivo
import { Link } from 'react-router-dom'; // Importa el componente Link desde react-router-dom
import { ShoppingCartIcon } from '@heroicons/react/24/solid'; // Importa el icono de carrito de compra desde Hero Icons
import estilos from '../estilos/Producto.module.css'; // Importa los estilos CSS Modules para el producto

function Producto({ producto }) {
  const { esUsuario, anadirCarrito } = useContext(Contexto); // Obtiene el estado del usuario y la función para añadir al carrito desde el contexto

  return (
    <div className={estilos.wrapper}>
      {' '}
      {/* Define el contenedor principal del producto */}
      <Link to={`${producto.id}`}>
        {' '}
        {/* Crea un enlace a la página de detalle del producto */}
        <div className={estilos.imagen}>
          {' '}
          {/* Contenedor de la imagen del producto */}
          <img
            src={producto.imagen} // Establece la imagen del producto
            alt={`Imagen del producto ${producto.nombre} en la lista de productos`} // Texto alternativo de la imagen
            loading='lazy' // Indica que la imagen se cargará de forma diferida
          />
        </div>
      </Link>
      <div className={estilos.infoProducto}>
        {' '}
        {/* Contenedor de la información del producto */}
        <Link to={`${producto.id}`} className={estilos.nombre}>
          {' '}
          {/* Enlace al detalle del producto */}
          <h3>{producto.nombre}</h3> {/* Nombre del producto */}
        </Link>
        <div className={estilos.precioCarrito}>
          {' '}
          {/* Contenedor del precio y el botón de carrito */}
          <h4>{producto.precio}€</h4> {/* Precio del producto */}
          <button
            className={`${estilos.botonCarrito} ${!esUsuario && estilos.desactivado}`} // Aplica estilos condicionales al botón de carrito
            onClick={anadirCarrito(producto)} // Manejador de eventos para añadir al carrito
            disabled={!esUsuario} // Deshabilita el botón si el usuario no está autenticado
          >
            <ShoppingCartIcon /> {/* Icono de carrito de compra */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Producto; // Exporta el componente Producto
