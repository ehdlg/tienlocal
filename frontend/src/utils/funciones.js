/**
 * Comprueba si los filtros son válidos.
 * @param {object} filtros - Objeto que contiene los filtros.
 * @returns {boolean} true si los filtros son válidos, de lo contrario false.
 */
export function comprobarFiltros(filtros) {
  // Verifica si filtros es un objeto no nulo y tiene al menos una propiedad.
  const filtrosValidos = null != filtros && typeof filtros === 'object' && Object.keys(filtros).length > 0;
  return filtrosValidos;
}

/**
 * Crea un array de páginas.
 * @param {number} paginas - Número de páginas a crear.
 * @returns {Array|null} Array de páginas o null si el argumento no es un número.
 */
export function crearArrayPaginas(paginas) {
  // Verifica si el argumento es un número.
  if (typeof paginas !== 'number') return null;
  // Verifica si el número de páginas es negativo.
  if (paginas < 0) return [];
  // Crea un array de páginas utilizando el número proporcionado.
  return Array(paginas)
    .fill()
    .map((_, index) => index + 1);
}

/**
 * Valida los datos de un nuevo producto.
 * @param {object} datosFormulario - Datos del formulario del nuevo producto.
 * @returns {object} Objeto con los errores y el nuevo producto validado.
 */
export function validarNuevoProducto(datosFormulario) {
  // Array para almacenar mensajes de error.
  const errores = [];
  // Copia de los datos del formulario para no modificar los originales.
  let nuevoProducto = { ...datosFormulario };

  // Validación del nombre del producto.
  if (null == nuevoProducto.nombre || nuevoProducto.nombre == '') {
    errores.push('Debes introducir un nombre para el producto');
  }

  // Validación del precio del producto.
  if (nuevoProducto.precio <= 0) {
    errores.push('El precio debe ser un número mayor a 0');
  }

  // Validación del stock del producto.
  if (nuevoProducto.stock < 0) {
    errores.push('El stock no puede ser un número menor a 0');
  }

  // Validación de la descripción del producto.
  if (null == nuevoProducto.descripcion || nuevoProducto.descripcion == '') {
    errores.push('Debes indicar una descripción para el producto');
  }

  // Validación de la categoría del producto.
  const idCategoria = Number(nuevoProducto['id_categoria']);
  if (isNaN(idCategoria) || idCategoria <= 0) {
    errores.push('Debes indicar una categoría válida');
  }

  // Elimina la propiedad 'imagen' si está vacía para evitar problemas al enviar el formulario.
  if (datosFormulario.imagen == '') {
    delete nuevoProducto.imagen;
  }

  // Devuelve un objeto con los errores y el producto validado.
  return { errores, nuevoProducto };
}

/**
 * Formatea una fecha en un formato específico.
 * @param {Date|string} fecha - Fecha a formatear (puede ser un objeto Date o una cadena de fecha válida).
 * @returns {string} Fecha formateada en el formato "Día de Mes de Año, Hora:Minutos".
 */
export function formatearFecha(fecha) {
  // Convierte el argumento en un objeto Date.
  const fechaObjeto = new Date(fecha);
  // Obtiene el día, mes y año de la fecha.
  const dia = fechaObjeto.getDate();
  const mes = fechaObjeto.toLocaleString('default', { month: 'long' });
  const año = fechaObjeto.getFullYear();
  // Obtiene la hora y minutos de la fecha.
  const hora = fechaObjeto.getHours();
  const minutos = fechaObjeto.getMinutes();
  // Formatea la fecha en el formato deseado.
  const fechaFormateada = `${dia} de ${mes} de ${año}, ${hora}:${minutos}`;
  // Devuelve la fecha formateada.
  return fechaFormateada;
}
