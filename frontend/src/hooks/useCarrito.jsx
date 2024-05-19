import { useState } from 'react';

// Hook personalizado para gestionar el carrito de compras
function useCarrito() {
  // Obtenemos el carrito guardado en el localStorage o inicializamos un array vacío si no hay nada guardado
  const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) ?? [];

  // Estado local para almacenar el carrito y su estado (abierto o cerrado)
  const [carrito, setCarrito] = useState(carritoGuardado);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  // Función para guardar el carrito en el localStorage y actualizar el estado local del carrito
  function guardarCarrito(carrito) {
    setCarrito(carrito);

    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  // Función para verificar si un producto está en el carrito
  function verificarProductoEnCarrito(id) {
    return carrito.some((producto) => producto.id === id);
  }

  // Función para añadir un nuevo producto al carrito
  function anadirCarrito(nuevoProducto) {
    return function () {
      const estaEnCarrito = verificarProductoEnCarrito(nuevoProducto.id);

      // Si el carrito está cerrado, lo abrimos
      if (!carritoAbierto) mostrarCarrito();

      // Si el producto no está en el carrito, lo añadimos; de lo contrario, aumentamos su cantidad
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

  // Función para modificar la cantidad de un producto en el carrito
  function modificarCantidadProducto(id, cantidad) {
    const nuevoCarrito = carrito.map((producto) => {
      if (producto.id === id) {
        return { ...producto, cantidad: parseInt(producto.cantidad) + parseInt(cantidad) };
      }
      return producto;
    });

    guardarCarrito(nuevoCarrito);
  }

  // Función para eliminar un producto del carrito
  function eliminarProductoCarrito(id) {
    const nuevoCarrito = carrito.filter((producto) => producto.id !== id);

    guardarCarrito(nuevoCarrito);
  }

  // Función para vaciar completamente el carrito
  function vaciarCarrito() {
    guardarCarrito([]);
  }

  // Función para alternar entre mostrar y ocultar el carrito
  function mostrarCarrito() {
    setCarritoAbierto(!carritoAbierto);
  }

  // Devolvemos las funciones y datos necesarios para gestionar el carrito
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
