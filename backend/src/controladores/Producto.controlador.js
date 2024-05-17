import Producto from '../modelos/Producto.js';
import { HTTPError } from '../utils/errores/index.js';

/**
 * Controlador para manejar las operaciones relacionadas con los productos.
 */
export default class ProductoControlador {
  /**
   * Obtiene todos los productos filtrados según los parámetros proporcionados.
   * @param {object} req - Objeto de solicitud HTTP.
   * @param {object} res - Objeto de respuesta HTTP.
   * @param {function} next - Función de middleware para pasar el control al siguiente middleware.
   * @returns {object} - Respuesta JSON con los productos filtrados.
   */
  static async obtenerTodos(req, res, next) {
    try {
      const { nombre, precioMinimo, precioMaximo, categoria, empresa, limite, offset } = req.query;

      const filtros = {
        nombre,
        precioMinimo,
        precioMaximo,
        categoria,
        empresa,
      };

      const productos = await Producto.obtenerTodosFiltrado(filtros, limite, offset);

      return res.json(productos);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene los detalles de un producto específico.
   * @param {object} req - Objeto de solicitud HTTP.
   * @param {object} res - Objeto de respuesta HTTP.
   * @param {function} next - Función de middleware para pasar el control al siguiente middleware.
   * @returns {object} - Respuesta JSON con los detalles del producto.
   */
  static async obtenerUno(req, res, next) {
    const { id } = req.params;

    try {
      const producto = await Producto.obtenerUnoDetalles(id);

      if (null == producto) throw new HTTPError({ mensaje: 'Producto no encontrado', estado: 404 });

      return res.json(producto);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene los detalles de todos los productos.
   * @param {object} req - Objeto de solicitud HTTP.
   * @param {object} res - Objeto de respuesta HTTP.
   * @param {function} next - Función de middleware para pasar el control al siguiente middleware.
   * @returns {object} - Respuesta JSON con los detalles de todos los productos.
   */
  static async obtenerTodosDetalles(req, res, next) {
    try {
      const productos = await Producto.obtenerTodosDetalles();

      return res.json(productos);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Actualiza un producto existente.
   * @param {object} req - Objeto de solicitud HTTP.
   * @param {object} res - Objeto de respuesta HTTP.
   * @param {function} next - Función de middleware para pasar el control al siguiente middleware.
   * @returns {object} - Respuesta JSON con el producto actualizado.
   */
  static async actualizar(req, res, next) {
    const { id, ...datosActualizacion } = req.datosValidados;

    try {
      if (Object.keys(datosActualizacion).length === 0) {
        throw new HTTPError({ mensaje: 'No se han recibido datos para actualizar', estado: 400 });
      }

      const productoActualizado = await Producto.actualizar(id, datosActualizacion);

      return res.json(productoActualizado);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Elimina un producto existente.
   * @param {object} req - Objeto de solicitud HTTP.
   * @param {object} res - Objeto de respuesta HTTP.
   * @param {function} next - Función de middleware para pasar el control al siguiente middleware.
   * @returns {object} - Respuesta JSON con el producto eliminado.
   */
  static async borrar(req, res, next) {
    const { id } = req.params;

    try {
      const productoBorrado = await Producto.borrar(id);

      if (null == productoBorrado) throw new HTTPError({ mensaje: 'Producto no encontrado', estado: 404 });

      return res.json(productoBorrado);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene la cantidad de productos filtrados según los parámetros proporcionados.
   * @param {object} req - Objeto de solicitud HTTP.
   * @param {object} res - Objeto de respuesta HTTP.
   * @param {function} next - Función de middleware para pasar el control al siguiente middleware.
   * @returns {object} - Respuesta JSON con la cantidad de productos.
   */
  static async obtenerCantidad(req, res, next) {
    const { nombre, precioMinimo, precioMaximo, categoria, empresa } = req.query;

    const filtros = {
      nombre,
      precioMinimo,
      precioMaximo,
      categoria,
      empresa,
    };

    try {
      const [resultado] = await Producto.obtenerCantidadFiltrado(filtros);
      const [cantidad] = Object.values(resultado);

      return res.json(cantidad);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene el precio máximo de los productos.
   * @param {object} req - Objeto de solicitud HTTP.
   * @param {object} res - Objeto de respuesta HTTP.
   * @param {function} next - Función de middleware para pasar el control al siguiente middleware.
   * @returns {object} - Respuesta JSON con el precio máximo.
   */
  static async obtenerPrecioMaximo(req, res, next) {
    try {
      const [resultado] = await Producto.obtenerPrecioMaximo();

      const [precio] = Object.values(resultado);

      return res.json(Number(precio));
    } catch (error) {
      next(error);
    }
  }
}
