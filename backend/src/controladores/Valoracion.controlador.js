import Valoracion from '../modelos/Valoracion.js';
import { HTTPError } from '../utils/errores/index.js';

export default class ValoracionControlador {
  /**
   * Obtiene todas las valoraciones.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<void>}
   */
  static async obtenerTodos(req, res, next) {
    try {
      // Llama al modelo para obtener todas las valoraciones
      const valoraciones = await Valoracion.obtenerTodos();

      // Envía las valoraciones como respuesta JSON
      return res.json(valoraciones);
    } catch (error) {
      // Pasa el error al siguiente middleware
      next(error);
    }
  }

  /**
   * Obtiene una valoración específica por su ID.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<void>}
   */
  static async obtenerUno(req, res, next) {
    const { id } = req.params;

    try {
      // Llama al modelo para obtener una valoración por su ID
      const valoracion = await Valoracion.obtenerUno(id);

      // Si no se encuentra la valoración, lanza un error HTTP 404
      if (null == valoracion) throw new HTTPError({ mensaje: 'Valoración no encontrada', estado: 404 });

      // Envía la valoración como respuesta JSON
      return res.json(valoracion);
    } catch (error) {
      // Pasa el error al siguiente middleware
      next(error);
    }
  }

  /**
   * Crea una nueva valoración.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<void>}
   */
  static async crear(req, res, next) {
    const nuevaValoracion = req.datosValidados;

    try {
      // Llama al modelo para crear una nueva valoración
      const valoracionCreada = await Valoracion.crear(nuevaValoracion);

      // Envía la valoración creada como respuesta JSON con estado 201
      return res.status(201).json(valoracionCreada);
    } catch (error) {
      // Pasa el error al siguiente middleware
      next(error);
    }
  }

  /**
   * Actualiza una valoración existente.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<void>}
   */
  static async actualizar(req, res, next) {
    const { id, ...datosActualizacion } = req.datosValidados;

    try {
      // Si no se reciben datos para actualizar, lanza un error
      if (Object.keys(datosActualizacion).length === 0) {
        throw new Error('No se han recibido datos para actualizar');
      }

      // Llama al modelo para actualizar la valoración
      const valoracionActualizada = await Valoracion.actualizar(id, datosActualizacion);

      // Envía la valoración actualizada como respuesta JSON
      return res.json(valoracionActualizada);
    } catch (error) {
      // Pasa el error al siguiente middleware
      next(error);
    }
  }

  /**
   * Borra una valoración por su ID.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<void>}
   */
  static async borrar(req, res, next) {
    const { id } = req.params;

    try {
      // Llama al modelo para borrar la valoración por su ID
      const valoracionBorrada = await Valoracion.borrar(id);

      // Si no se encuentra la valoración, lanza un error HTTP 404
      if (null == valoracionBorrada) throw new HTTPError({ mensaje: 'Valoración no encontrada', estado: 404 });

      // Envía la valoración borrada como respuesta JSON
      return res.json(valoracionBorrada);
    } catch (error) {
      // Pasa el error al siguiente middleware
      next(error);
    }
  }
}
