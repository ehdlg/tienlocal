import Compra from '../modelos/Compra.js';

export default class CompraControlador {
  static async obtenerCantidad(req, res, next) {
    try {
      const [resultado] = await Compra.obtenerCantidad();
      const [cantidad] = Object.values(resultado);

      return res.json(cantidad);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerFechaUltimaCompra(req, res, next) {
    try {
      const [resultado] = await Compra.obtenerUltimaCompra();

      return res.json(resultado.fecha);
    } catch (error) {
      next(error);
    }
  }
}
