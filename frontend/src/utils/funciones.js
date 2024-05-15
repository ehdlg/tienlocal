export function comprobarFiltros(filtros) {
  const filtrosValidos = null != filtros && typeof filtros === 'object' && Object.keys(filtros).length > 0;

  return filtrosValidos;
}

export function crearArrayPaginas(paginas) {
  if (typeof paginas !== 'number') return null;

  if (paginas < 0) return [];

  return Array(paginas)
    .fill()
    .map((_, index) => index + 1);
}

export function validarNuevoProducto(datosFomulario) {
  const errores = [];
  let nuevoProducto = { ...datosFomulario };

  if (null == nuevoProducto.nombre || nuevoProducto.nombre == '') {
    errores.push('Debes introducir un nombre para el producto');
  }

  if (nuevoProducto.precio <= 0) {
    errores.push('El precio debe ser un número mayor a 0');
  }

  if (nuevoProducto.stock < 0) {
    errores.push('El stock no puede ser un número menor a 0');
  }

  if (null == nuevoProducto.descripcion || nuevoProducto.descripcion == '') {
    errores.push('Debes indicar una descripción para el producto');
  }

  const idCategoria = Number(nuevoProducto['id_categoria']);

  if (isNaN(idCategoria) || idCategoria <= 0) {
    errores.push('Debes indiciar una categoría');
  }

  if (datosFomulario.imagen == '') {
    delete nuevoProducto.imagen;
  }

  return { errores, nuevoProducto };
}

export function formatearFecha(fecha) {
  const fechaObjeto = new Date(fecha);

  const dia = fechaObjeto.getDate();
  const mes = fechaObjeto.toLocaleString('default', { month: 'long' });
  const año = fechaObjeto.getFullYear();

  const hora = fechaObjeto.getHours();
  const minutos = fechaObjeto.getMinutes();

  const fechaFormateada = `${dia} de ${mes} de ${año}, ${hora}:${minutos}`;

  return fechaFormateada;
}
