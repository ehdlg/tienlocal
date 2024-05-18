import Categoria from '../modelos/Categoria.js';
import { HTTPError } from '../utils/errores/index.js';

export default class CategoriaControlador {
  /**
   * Obtiene todas las categorías registradas en la base de datos.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<void>}
   */
  static async obtenerTodos(req, res, next) {
    try {
      // Llama al método estático `obtenerTodos` del modelo `Categoria` para obtener todas las categorías
      const categorias = await Categoria.obtenerTodos();

      return res.json(categorias); // Devuelve las categorías como respuesta JSON
    } catch (error) {
      next(error); // Pasa el error al siguiente middleware
    }
  }

  /**
   * Obtiene una categoría específica por su ID.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<void>}
   */
  static async obtenerUno(req, res, next) {
    const { id } = req.params; // Extrae el ID de los parámetros de la solicitud

    try {
      // Llama al método estático `obtenerUno` del modelo `Categoria` para obtener una categoría específica
      const categoria = await Categoria.obtenerUno(id);

      if (null == categoria)
        // Verifica si la categoría no existe
        throw new HTTPError({ mensaje: 'Categoría no encontrada', estado: 404 });

      return res.json(categoria); // Devuelve la categoría como respuesta JSON
    } catch (error) {
      next(error); // Pasa el error al siguiente middleware
    }
  }

  /**
   * Crea una nueva categoría en la base de datos.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<void>}
   */
  static async crear(req, res, next) {
    const nuevaCategoria = req.datosValidados; // Extrae los datos validados del cuerpo de la solicitud

    try {
      // Llama al método estático `crear` del modelo `Categoria` para crear una nueva categoría
      const categoriaCreada = await Categoria.crear(nuevaCategoria);

      return res.status(201).json(categoriaCreada); // Devuelve la categoría creada con un estado HTTP 201
    } catch (error) {
      next(error); // Pasa el error al siguiente middleware
    }
  }

  /**
   * Actualiza una categoría existente en la base de datos.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<void>}
   */
  static async actualizar(req, res, next) {
    const { id, ...datosActualizacion } = req.datosValidados; // Extrae el ID y los datos de actualización del cuerpo de la solicitud

    try {
      if (Object.keys(datosActualizacion).length === 0) {
        throw new HTTPError({ mensaje: 'No se han recibido datos para actualizar', estado: 400 });
      }

      // Llama al método estático `actualizar` del modelo `Categoria` para actualizar la categoría
      const categoriaActualizada = await Categoria.actualizar(id, datosActualizacion);

      return res.json(categoriaActualizada); // Devuelve la categoría actualizada como respuesta JSON
    } catch (error) {
      next(error); // Pasa el error al siguiente middleware
    }
  }

  /**
   * Borra una categoría existente en la base de datos.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<void>}
   */
  static async borrar(req, res, next) {
    const { id } = req.params; // Extrae el ID de los parámetros de la solicitud

    try {
      // Llama al método estático `borrar` del modelo `Categoria` para borrar la categoría
      const categoriaBorrada = await Categoria.borrar(id);

      if (null == categoriaBorrada)
        // Verifica si la categoría no existe
        throw new HTTPError({ mensaje: 'Categoría no encontrada', estado: 404 });

      return res.json(categoriaBorrada); // Devuelve la categoría borrada como respuesta JSON
    } catch (error) {
      next(error); // Pasa el error al siguiente middleware
    }
  }
}
