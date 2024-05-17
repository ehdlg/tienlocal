import Login from './Login.js';

export default class Usuario extends Login {
  /**
   * Nombre de la tabla en la base de datos correspondiente a los usuarios.
   * @type {string}
   */
  static tabla = 'usuarios';

  /**
   * Obtiene las compras realizadas por un usuario específico.
   * @param {number} idUsuario - El ID del usuario.
   * @returns {Promise<Object[]>} Una promesa que se resuelve con un arreglo de objetos representando las compras del usuario.
   */
  static async obtenerComprasUsuario(idUsuario) {
    const consulta = 'SELECT id, fecha FROM compras WHERE id_usuario = ?';

    try {
      const [compras] = await this.db.execute(consulta, [idUsuario]);
      return compras; // Devuelve las compras del usuario.
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene los detalles de una compra específica realizada por un usuario.
   * @param {number} idCompra - El ID de la compra.
   * @returns {Promise<Object[]>} Una promesa que se resuelve con un arreglo de objetos representando los detalles de la compra.
   */
  static async obtenerDetalleComprasUsuario(idCompra) {
    const consulta = `SELECT cantidad, precio_unitario, (cantidad * precio_unitario) as total_producto, p.nombre
                      FROM detalle_compras dc
                      JOIN productos p
                      ON p.id = dc.id_producto
                      WHERE id_compra = ?`;
    try {
      const [detalleCompra] = await this.db.execute(consulta, [idCompra]);
      return detalleCompra; // Devuelve los detalles de la compra.
    } catch (error) {
      throw error;
    }
  }
}
