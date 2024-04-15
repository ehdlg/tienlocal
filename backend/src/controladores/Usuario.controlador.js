import Usuario from '../modelos/Usuario.js';

export default class UsuarioControlador {
  static async obtenerTodos(req, res, next) {
    try {
      const usuarios = await Usuario.obtenerTodos();

      return res.json(usuarios);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerUno(req, res, next) {
    const { id } = req.params;

    try {
      const usuario = await Usuario.obtenerUno(id);

      return res.json(usuario);
    } catch (error) {
      next(error);
    }
  }

  static async crear(req, res, next) {
    const { nombre, apellidos, email, contrasena } = req.body;

    const nuevoUsuario = { nombre, apellidos, email, contrasena };

    try {
      const usuarioCreado = await Usuario.crear(nuevoUsuario);

      return res.status(201).json(usuarioCreado);
    } catch (error) {
      next(error);
    }
  }

  static async actualizar(req, res, next) {
    const { id } = req.params;

    try {
      const datosActualizacion = req.datosValidados;

      if (Object.keys(datosActualizacion).length === 0) {
        throw new Error('No se han recibido datos para actualizar');
      }
      const usuarioActualizado = await Usuario.actualizar(id, datosActualizacion);

      return res.json(usuarioActualizado);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async borrar(req, res, next) {
    const { id } = req.params;

    try {
      const usuarioBorrado = await Usuario.borrar(id);

      return res.json(usuarioBorrado);
    } catch (error) {
      next(error);
    }
  }
}
