import { HTTPError } from '../../utils/errores/index.js';
import 'dotenv/config';

export async function comprobrarPermisosAdministrador(req, res, next) {
  const { ADMIN_EMAIL, ADMIN_PWD } = process.env;
  const { email, contrasena } = req.body;

  try {
    if (email === ADMIN_EMAIL && contrasena === ADMIN_PWD) return next();

    throw new HTTPError({ mensaje: 'No tienes los permisos para acceder', estado: 403 });
  } catch (error) {
    next(error);
  }
}
