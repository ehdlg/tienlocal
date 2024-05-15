import { useState } from 'react';

function useCarrito() {
  const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) ?? [];

  const [carrito, setCarrito] = useState(carritoGuardado);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  function guardarCarrito(carrito) {
    setCarrito(carrito);

    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  function verificarProductoEnCarrito(id) {
    return carrito.some((producto) => producto.id == id);
  }

  function anadirCarrito(nuevoProducto) {
    return function () {
      const estaEnCarrito = verificarProductoEnCarrito(nuevoProducto.id);

      if (!carritoAbierto) mostrarCarrito();

      if (!estaEnCarrito) {
        const nuevoCarrito = [
          ...carrito,
          {
            nombre: nuevoProducto.nombre,
            id: nuevoProducto.id,
            precio: parseFloat(nuevoProducto.precio),
            stock: parseFloat(nuevoProducto.stock),
            cantidad: 1,
            imagen: nuevoProducto.imagen,
          },
        ];

        guardarCarrito(nuevoCarrito);

        return;
      }

      modificarCantidadProducto(nuevoProducto.id, 1);
    };
  }

  function modificarCantidadProducto(id, cantidad) {
    const nuevoCarrito = carrito.map((producto) => {
      if (producto.id == id) {
        return { ...producto, cantidad: parseInt(producto.cantidad) + parseInt(cantidad) };
      }
      return producto;
    });

    guardarCarrito(nuevoCarrito);
  }

  function eliminarProductoCarrito(id) {
    const nuevoCarrito = carrito.filter((producto) => producto.id != id);

    guardarCarrito(nuevoCarrito);
  }

  function vaciarCarrito() {
    guardarCarrito([]);
  }

  function mostrarCarrito() {
    setCarritoAbierto(!carritoAbierto);
  }

  return {
    carrito,
    vaciarCarrito,
    anadirCarrito,
    eliminarProductoCarrito,
    verificarProductoEnCarrito,
    mostrarCarrito,
    carritoAbierto,
    modificarCantidadProducto,
  };
}

export default useCarrito;
