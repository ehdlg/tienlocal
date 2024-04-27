import Login from './Login.js';

export default class Empresa extends Login {
  static tabla = 'empresas';

  static async ObtenerTodosSinCredenciales() {
    const consulta = 'SELECT id, nombre, descripcion, ubicacion FROM empresas;';

    try {
      const empresas = await this.db.query(consulta);

      return empresas;
    } catch (error) {
      throw error;
    }
  }
}
