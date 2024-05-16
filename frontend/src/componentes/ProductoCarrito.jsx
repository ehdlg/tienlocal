import { useContext } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { Contexto } from '../context';
import estilos from '../estilos/Carrito.module.css';

function ProductoCarrito({ producto }) {
  const { eliminarProductoCarrito, modificarCantidadProducto } = useContext(Contexto);

  const total = parseFloat(producto.precio) * parseFloat(producto.cantidad);

  const noPermitidoDisminuir = producto.cantidad == 1;
  const noPermitidoAumentar = producto.cantidad == producto.stock;

  function aumentarCantidad() {
    if (noPermitidoAumentar) return;

    modificarCantidadProducto(producto.id, 1);
  }

  return (
    <div className={estilos.productoCarrito}>
      <div className={estilos.detallesProducto}>
        <img src={producto.imagen} alt={`${producto.nombre} imagen en el carrito.`} />
        <div className={estilos.nombreCantidad}>
          <h6>{producto.nombre}</h6>
          <p>{total.toFixed(2)} €</p>
        </div>
      </div>

      <div className={estilos.productoCarritoAcciones}>
        <div className={estilos.cantidadAcciones}>
          <MinusIcon
            className={`${estilos.svg} ${noPermitidoDisminuir && estilos.noPermitido}`}
            onClick={producto.cantidad > 1 ? () => modificarCantidadProducto(producto.id, -1) : null}
          />

          <span>{producto.cantidad}</span>

          <PlusIcon
            className={`${estilos.svg} ${noPermitidoAumentar && estilos.noPermitido} `}
            onClick={aumentarCantidad}
          />
        </div>

        <button className={estilos.botonEliminar} onClick={() => eliminarProductoCarrito(producto.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default ProductoCarrito;
