import Base from './Base.js';

/**
 * Clase Compra.
 * Hereda de la clase Base, que contiene las operaciones básicas CRUD.
 * Establece el nombre de la tabla como 'compras'.
 */
export default class Compra extends Base {
  static tabla = 'compras';

  /**
   * Obtiene la última compra realizada.
   *
   * @returns {Promise<Object>} El último registro de compra.
   * @throws {Error} Si ocurre un error al ejecutar la consulta.
   */
  static async obtenerUltimaCompra() {
    const consulta = 'SELECT * FROM compras ORDER BY fecha DESC LIMIT 1';

    try {
      const [compra] = await this.db.query(consulta);

      return compra;
    } catch (error) {
      throw error;
    }
  }

  static async realizarCompra() {
    await this.db.beginTransaction();

    const nuevaCompra = Compra.crear();
  }
}
