import Login from './Login.js';

export default class Usuario extends Login {
  static tabla = 'usuarios';

  static async obtenerComprasUsuario(idUsuario) {
    const consulta = 'SELECT id, fecha FROM compras WHERE id_usuario = ? ORDER BY fecha DESC';

    try {
      const [compras] = await this.db.execute(consulta, [idUsuario]);

      return compras;
    } catch (error) {
      throw error;
    }
  }

  static async obtenerDetalleComprasUsuario(idCompra) {
    const consulta = `SELECT cantidad, precio_unitario, (cantidad * precio_unitario) as total_producto, p.nombre
                      FROM detalle_compras dc
                      JOIN productos p
                      ON p.id = dc.id_producto
                      WHERE id_compra = ?`;
    try {
      const [detalleCompra] = await this.db.execute(consulta, [idCompra]);

      return detalleCompra;
    } catch (error) {
      throw error;
    }
  }
}
