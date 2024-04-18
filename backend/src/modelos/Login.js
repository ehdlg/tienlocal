import Base from './Base.js';

export default class Login extends Base {
  static tabla = null;

  static async obtenerPorCredenciales(email, contrasena) {
    const consulta = `SELECT * FROM ${this.tabla} WHERE email = ? AND contrasena = ?`;

    try {
      const fila = await this.db.execute(consulta, [email, contrasena]);

      return fila;
    } catch (error) {
      throw error;
    }
  }
}
