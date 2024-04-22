import Administrador from '../../modelos/Administrador.js';
import Usuario from '../../modelos/Usuario.js';
import Empresa from '../../modelos/Empresa.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HTTPError } from '../../utils/errores/index.js';

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

    req.login = {
      id: usuario.id,
      email: usuario.email,
      rol: 'usuario',
    };

    return next();
  } catch (error) {
    next(error);
  }
}

export async function comprobarEmpresaCredenciales(req, res, next) {
  try {
    const { email, contrasena } = req.datosValidados;

    if (null == email || null == contrasena)
      throw new HTTPError({ mensaje: 'Error al leer los datos proporcionados', estado: 400 });

    const [empresa] = await Empresa.obtenerPorCredenciales(email);

    const credencialesCorrectas =
      null != empresa &&
      empresa.email === email &&
      (await bcrypt.compare(contrasena, empresa.contrasena));

    if (!credencialesCorrectas)
      throw new HTTPError({ mensaje: 'Las credenciales no son correctas', estado: 400 });

    req.login = {
      id: empresa.id,
      email: empresa.email,
      rol: 'empresa',
    };

    return next();
  } catch (error) {
    next(error);
  }
}

export async function crearToken(req, res, next) {
  try {
    const { login } = req;
    const { SECRET } = process.env;

    const token = jwt.sign(login, SECRET);

    return res.json({ token });
  } catch (error) {
    next(error);
  }
}

export async function verificarToken(req, res, next) {
  try {
    const { SECRET } = process.env;
    const [bearer, token] = req.headers['authorization'].split(' ');

    if (bearer !== 'Bearer' || null == token)
      throw new HTTPError({ mensaje: 'Acceso no autorizado', estado: 401 });

    const tokenVerificado = jwt.verify(token, SECRET);

    req.tokenVerificado = tokenVerificado;

    next();
  } catch (error) {
    next(error);
  }
}

export async function comprobarPermisosUsuario(req, res, next) {
  try {
    const { tokenVerificado } = req;
    const id = Number(req.params.id);

    if (tokenVerificado.id != id || tokenVerificado.rol !== 'usuario') {
      throw new HTTPError({ mensaje: 'Acceso prohibido', estado: 403 });
    }

    return next();
  } catch (error) {
    next(error);
  }
}

export async function comprobarPermisosEmpresa(req, res, next) {
  try {
    const { tokenVerificado } = req;
    const id = Number(req.params.id);

    if (tokenVerificado.id != id || tokenVerificado.rol !== 'empresa') {
      throw new HTTPError({ mensaje: 'Acceso prohibido', estado: 403 });
    }

    return next();
  } catch (error) {
    next(error);
  }
}