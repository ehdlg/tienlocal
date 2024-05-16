import Base from './Base.js';

export default class Compra extends Base {
  static tabla = 'compras';

  static async obtenerUltimaCompra() {
    const consulta = 'SELECT * FROM compras ORDER BY fecha DESC LIMIT 1';

    try {
      const [compra] = await this.db.query(consulta);

      return compra;
    } catch (error) {
      throw error;
    }
  }
}
