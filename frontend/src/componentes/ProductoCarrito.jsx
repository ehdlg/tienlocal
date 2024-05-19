import { useContext } from 'react'; // Importa el hook useContext desde React
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid'; // Importa los iconos de Plus y Minus desde Hero Icons
import { Contexto } from '../context'; // Importa el contexto desde su archivo
import estilos from '../estilos/Carrito.module.css'; // Importa los estilos CSS Modules para el carrito

function ProductoCarrito({ producto }) {
  const { eliminarProductoCarrito, modificarCantidadProducto } = useContext(Contexto); // Obtiene las funciones para eliminar y modificar la cantidad del producto desde el contexto

  const total = parseFloat(producto.precio) * parseFloat(producto.cantidad); // Calcula el total del producto en el carrito

  const noPermitidoDisminuir = producto.cantidad === 1; // Verifica si no se permite disminuir la cantidad
  const noPermitidoAumentar = producto.cantidad === producto.stock; // Verifica si no se permite aumentar la cantidad al máximo

  function aumentarCantidad() {
    if (noPermitidoAumentar) return; // No permite aumentar la cantidad si ya está en el máximo

    modificarCantidadProducto(producto.id, 1); // Modifica la cantidad del producto aumentando en 1
  }

  return (
    <div className={estilos.productoCarrito}>
      {/* Contenedor del producto en el carrito */}
      <div className={estilos.detallesProducto}>
        {/* Contenedor de los detalles del producto */}
        <img src={producto.imagen} alt={`${producto.nombre} imagen en el carrito.`} /> {/* Imagen del producto */}
        <div className={estilos.nombreCantidad}>
          {/* Contenedor del nombre y la cantidad del producto */}
          <h6>{producto.nombre}</h6> {/* Nombre del producto */}
          <p>{total.toFixed(2)} €</p> {/* Total del producto */}
        </div>
      </div>
      <div className={estilos.productoCarritoAcciones}>
        {/* Contenedor de las acciones del producto en el carrito */}
        <div className={estilos.cantidadAcciones}>
          {/* Contenedor de las acciones de cantidad */}
          <MinusIcon
            className={`${estilos.svg} ${noPermitidoDisminuir && estilos.noPermitido}`} // Aplica estilos condicionales al icono de disminuir
            onClick={producto.cantidad > 1 ? () => modificarCantidadProducto(producto.id, -1) : null} // Manejador de eventos para disminuir la cantidad
          />
          <span>{producto.cantidad}</span> {/* Cantidad del producto */}
          <PlusIcon
            className={`${estilos.svg} ${noPermitidoAumentar && estilos.noPermitido} `}
            onClick={aumentarCantidad} // Manejador de eventos para aumentar la cantidad
          />
        </div>
        <button className={estilos.botonEliminar} onClick={() => eliminarProductoCarrito(producto.id)}>
          {/* Botón para eliminar el producto del carrito */}
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default ProductoCarrito; // Exporta el componente ProductoCarrito
