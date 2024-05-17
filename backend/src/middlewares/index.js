import bcrypt from 'bcrypt';
import { HTTPError } from '../utils/errores/index.js';

/**
 * Función para lanzar un error HTTP de recurso no encontrado (404).
 * @throws {HTTPError} - Error HTTP personalizado.
 */
export function noEncontrado() {
  throw new HTTPError({ mensaje: 'Recurso no encontrado', estado: 404 });
}

/**
 * Middleware para manejar errores en la aplicación.
 * @param {Error} error - Objeto de error.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar el control al siguiente middleware.
 */
export function manejadorErrores(error, req, res, next) {
  const estado = error.status || error.estado || 500; // Obtiene el código de estado HTTP del error o establece 500 como valor predeterminado
  const mensaje = error.message || error.mensaje || 'Algo salió mal'; // Obtiene el mensaje de error del error o establece 'Algo salió mal' como valor predeterminado
  res.status(estado).json({ error: mensaje }); // Envía una respuesta JSON con el código de estado y el mensaje de error
}

/**
 * Middleware para generar el hash de la contraseña proporcionada.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar el control al siguiente middleware.
 */
export async function generarHashedPassword(req, res, next) {
  const SALT = 10; // Coste del algoritmo de hash
  const { contrasena } = req.datosValidados; // Obtiene la contraseña validada de la solicitud

  if (null == contrasena) return next(); // Si no hay contraseña, pasa al siguiente middleware

  try {
    const hashedPassword = await bcrypt.hash(contrasena, SALT); // Genera el hash de la contraseña
    req.datosValidados.contrasena = hashedPassword; // Actualiza la contraseña en los datos validados de la solicitud
    next(); // Pasa al siguiente middleware
  } catch (error) {
    next(error); // Si ocurre un error, pasa el error al siguiente middleware
  }
}
