export function filtrarProductos(productos, filtros) {
  const productosFiltrados = productos.filter((producto) => {
    return (
      (filtros.nombre === '' ||
        producto.nombre.toLocaleLowerCase().includes(filtros.nombre.toLocaleLowerCase())) &&
      producto.precio >= filtros.precioMinimo &&
      producto.precio <= filtros.precioMaximo &&
      (filtros.categoria === 0 || filtros.categoria === producto.id_categoria) &&
      (filtros.empresa === 'TODAS' || filtros.empresa === producto.id_empresa)
    );
  });

  return productosFiltrados;
}
