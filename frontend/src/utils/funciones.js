export function comprobarFiltros(filtros) {
  const filtrosValidos =
    null != filtros && typeof filtros === 'object' && Object.keys(filtros).length > 0;

  return filtrosValidos;
}
