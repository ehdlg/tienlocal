export function noEncontrado(_, res) {
  res.status(404).json({ mensaje: 'Error 404: No encontrado' });
}

export function manejadorErrores(error, req, res, next) {
  const estado = error.status || 500;

  const mensaje = error.mensaje || error.message || 'Algo salió mal';

  res.status(estado).json({ error: mensaje });
}
