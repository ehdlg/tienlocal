import Base from './Base.js';

export default class Login extends Base {
  static tabla = null;

  static async obtenerPorCredenciales(email) {
    const consulta = `SELECT * FROM ${this.tabla} WHERE email = ?`;

    try {
      const [fila] = await this.db.execute(consulta, [email]);

      return fila;
    } catch (error) {
      throw error;
    }
  }
}
