import Administrador from '../../modelos/Administrador.js';
import { HTTPError } from '../../utils/errores/index.js';
import bcrypt from 'bcrypt';

export async function comprobrarPermisosAdministrador(req, res, next) {
  const { email, contrasena } = req.body;

  try {
    const admin = await Administrador.obtenerUno(1);

    const administradorValido =
      null != admin &&
      null != admin.email &&
      null != admin.contrasena &&
      email === admin.email &&
      (await bcrypt.compare(contrasena, admin.contrasena));

    if (administradorValido) return next();

    throw new HTTPError({ mensaje: 'Acceso prohibido', estado: 403 });
  } catch (error) {
    next(error);
  }
}
