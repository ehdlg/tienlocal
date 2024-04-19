import Administrador from '../../modelos/Administrador.js';
import Usuario from '../../modelos/Usuario.js';
import Empresa from '../../modelos/Empresa.js';
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

export async function comprobarUsuarioCredenciales(req, res, next) {
  try {
    const { email, contrasena } = req.datosValidados;

    if (null == email || null == contrasena)
      throw new HTTPError({ mensaje: 'Error al leer los datos proporcionados', estado: 400 });

    const [usuario] = await Usuario.obtenerPorCredenciales(email);

    const credencialesCorrectas =
      null != usuario &&
      usuario.email === email &&
      (await bcrypt.compare(contrasena, usuario.contrasena));

    if (!credencialesCorrectas)
      throw new HTTPError({ mensaje: 'Las credenciales no son correctas', estado: 400 });

    return next();
  } catch (error) {
    next(error);
  }
}
