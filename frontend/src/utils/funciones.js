export function comprobarFiltros(filtros) {
  const filtrosValidos =
    null != filtros && typeof filtros === 'object' && Object.keys(filtros).length > 0;

  return filtrosValidos;
}

export function crearArrayPaginas(paginas) {
  if (typeof paginas !== 'number') return null;

  if (paginas < 0) return [];

  return Array(paginas)
    .fill()
    .map((_, index) => index + 1);
}
