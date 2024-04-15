import bcrypt from 'bcrypt';
import { NotFoundError } from '../utils/errores/index.js';

export function noEncontrado() {
  throw new NotFoundError('Recurso no encontrado');
}

export function manejadorErrores(error, req, res, next) {
  const estado = error.status || error.estado || 500;

  const mensaje = error.message || error.mensaje || 'Algo salió mal';

  res.status(estado).json({ error: mensaje });
}

export async function generarHashedPassword(req, res, next) {
  const SALT = 10;
  const { contrasena } = req.datosValidados;

  if (null == contrasena) return next();

  try {
    const hashedPassword = await bcrypt.hash(contrasena, SALT);

    req.datosValidados.contrasena = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
}
