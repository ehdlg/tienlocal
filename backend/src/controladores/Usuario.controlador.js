import Usuario from '../modelos/Usuario.js';
import { crearToken } from '../middlewares/auth/index.js';
import { HTTPError } from '../utils/errores/index.js';

export default class UsuarioControlador {
  /**
   * Obtiene todos los usuarios.
   * @param {object} req - Objeto de solicitud HTTP.
   * @param {object} res - Objeto de respuesta HTTP.
   * @param {function} next - Función de middleware para pasar el control al siguiente middleware.
   * @returns {object} - Respuesta JSON con la información de los usuarios.
   */
  static async obtenerTodos(req, res, next) {
    try {
      const usuarios = await Usuario.obtenerTodos();

      const infoUsuarios = usuarios.map(({ contrasena, ...infoUsuario }) => infoUsuario);

      return res.json(infoUsuarios);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene un usuario por su ID.
   * @param {object} req - Objeto de solicitud HTTP.
   * @param {object} res - Objeto de respuesta HTTP.
   * @param {function} next - Función de middleware para pasar el control al siguiente middleware.
   * @returns {object} - Respuesta JSON con la información del usuario.
   */
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

  /**
   * Crea un nuevo usuario.
   * @param {object} req - Objeto de solicitud HTTP.
   * @param {object} res - Objeto de respuesta HTTP.
   * @param {function} next - Función de middleware para pasar el control al siguiente middleware.
   * @returns {object} - Respuesta JSON con el usuario creado.
   */
  static async crear(req, res, next) {
    const nuevoUsuario = req.datosValidados;

    try {
      const usuarioCreado = await Usuario.crear(nuevoUsuario);

      return res.status(201).json(usuarioCreado);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Actualiza un usuario existente.
   * @param {object} req - Objeto de solicitud HTTP.
   * @param {object} res - Objeto de respuesta HTTP.
   * @param {function} next - Función de middleware para pasar el control al siguiente middleware.
   * @returns {object} - Respuesta JSON con el usuario actualizado.
   */
  static async actualizar(req, res, next) {
    const { id, ...datosActualizacion } = req.datosValidados;

    try {
      if (Object.keys(datosActualizacion).length === 0) {
        throw new HTTPError({ mensaje: 'No se han recibido datos para actualizar', estado: 400 });
      }

      const usuarioActualizado = await Usuario.actualizar(id, datosActualizacion);

      return res.json(usuarioActualizado);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Elimina un usuario existente.
   * @param {object} req - Objeto de solicitud HTTP.
   * @param {object} res - Objeto de respuesta HTTP.
   * @param {function} next - Función de middleware para pasar el control al siguiente middleware.
   * @returns {object} - Respuesta JSON con el usuario eliminado.
   */
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

  /**
   * Inicia sesión de usuario y genera un token JWT.
   */
  static login = crearToken;

  /**
   * Obtiene las compras de un usuario por su ID.
   * @param {object} req - Objeto de solicitud HTTP.
   * @param {object} res - Objeto de respuesta HTTP.
   * @param {function} next - Función de middleware para pasar el control al siguiente middleware.
   * @returns {object} - Respuesta JSON con las compras del usuario.
   */
  static async obtenerUsuarioCompras(req, res, next) {
    const { id } = req.params;

    try {
      const compras = await Usuario.obtenerComprasUsuario(id);

      return res.json(compras);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene el detalle de las compras de un usuario por el ID de la compra.
   * @param {object} req - Objeto de solicitud HTTP.
   * @param {object} res - Objeto de respuesta HTTP.
   * @param {function} next - Función de middleware para pasar el control al siguiente middleware.
   * @returns {object} - Respuesta JSON con el detalle de la compra del usuario.
   */
  static async obtenerUsuarioDetalleCompras(req, res, next) {
    const { idCompra } = req.params;

    try {
      const detalleCompra = await Usuario.obtenerDetalleComprasUsuario(idCompra);

      return res.json(detalleCompra);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene la cantidad total de usuarios.
   * @param {object} req - Objeto de solicitud HTTP.
   * @param {object} res - Objeto de respuesta HTTP.
   * @param {function} next - Función de middleware para pasar el control al siguiente middleware.
   * @returns {object} - Respuesta JSON con la cantidad total de usuarios.
   */
  static async obtenerCantidadUsuario(req, res, next) {
    try {
      const [resultado] = await Usuario.obtenerCantidad();
      const [cantidad] = Object.values(resultado);

      return res.json(cantidad);
    } catch (error) {
      next(error);
    }
  }
}
