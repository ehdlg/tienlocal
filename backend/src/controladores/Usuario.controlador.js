import Usuario from '../modelos/Usuario.js';
import { crearToken } from '../middlewares/auth/index.js';
import { HTTPError } from '../utils/errores/index.js';

export default class UsuarioControlador {
  static async obtenerTodos(req, res, next) {
    try {
      const usuarios = await Usuario.obtenerTodos();

      const infoUsuarios = usuarios.map(({ contrasena, id: idUsuario, ...infoUsuario }) => infoUsuario);

      return res.json(infoUsuarios);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerUno(req, res, next) {
    const { id } = req.params;

    try {
      const usuario = await Usuario.obtenerUno(id);

      if (null == usuario) throw new HTTPError({ mensaje: 'Usuario no encontrado', estado: 404 });

      const { contrasena, id: idUsuario, ...infoUsuario } = usuario;

      return res.json(infoUsuario);
    } catch (error) {
      next(error);
    }
  }

  static async crear(req, res, next) {
    const nuevoUsuario = req.datosValidados;

    try {
      const usuarioCreado = await Usuario.crear(nuevoUsuario);

      return res.status(201).json(usuarioCreado);
    } catch (error) {
      next(error);
    }
  }

  static async actualizar(req, res, next) {
    const { id, ...datosActualizacion } = req.datosValidados;

    try {
      if (Object.keys(datosActualizacion).length === 0) {
        throw new Error('No se han recibido datos para actualizar');
      }

      const usuarioActualizado = await Usuario.actualizar(id, datosActualizacion);

      return res.json(usuarioActualizado);
    } catch (error) {
      next(error);
    }
  }

  static async borrar(req, res, next) {
    const { id } = req.params;

    try {
      const usuarioBorrado = await Usuario.borrar(id);

      if (null == usuarioBorrado) throw new HTTPError({ mensaje: 'Usuario no encontrado', estado: 404 });

      return res.json(usuarioBorrado);
    } catch (error) {
      next(error);
    }
  }

  static login = crearToken;
}
