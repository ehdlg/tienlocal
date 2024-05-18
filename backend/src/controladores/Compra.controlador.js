import Compra from '../modelos/Compra.js';

export default class CompraControlador {
  /**
   * Obtiene la cantidad total de compras registradas en la base de datos.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<void>}
   */
  static async obtenerCantidad(req, res, next) {
    try {
      // Llama al método estático `obtenerCantidad` del modelo `Compra` para obtener la cantidad de compras
      const [resultado] = await Compra.obtenerCantidad();
      // Extrae la cantidad del resultado obtenido
      const [cantidad] = Object.values(resultado);

      return res.json(cantidad); // Devuelve la cantidad de compras como respuesta JSON
    } catch (error) {
      next(error); // Pasa el error al siguiente middleware
    }
  }

  /**
   * Obtiene la fecha de la última compra registrada en la base de datos.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<void>}
   */
  static async obtenerFechaUltimaCompra(req, res, next) {
    try {
      // Llama al método estático `obtenerUltimaCompra` del modelo `Compra` para obtener la última compra
      const [resultado] = await Compra.obtenerUltimaCompra();

      return res.json(resultado.fecha); // Devuelve la fecha de la última compra como respuesta JSON
    } catch (error) {
      next(error); // Pasa el error al siguiente middleware
    }
  }

  /**
   * Registra una nueva compra en la base de datos.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<void>}
   */
  static async comprar(req, res, next) {
    const { id } = req.params; // Extrae el ID de los parámetros de la solicitud
    const { detalles } = req.body; // Extrae los detalles de la compra del cuerpo de la solicitud

    try {
      // Llama al método estático `comprar` del modelo `Compra` para registrar la compra
      const resultado = await Compra.comprar(id, detalles);

      return res.json(resultado); // Devuelve el resultado de la compra como respuesta JSON
    } catch (error) {
      next(error); // Pasa el error al siguiente middleware
    }
  }
}
