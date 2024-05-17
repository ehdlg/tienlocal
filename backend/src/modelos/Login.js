import Base from './Base.js';

/**
 * Clase Login.
 * Hereda de Base y proporciona métodos específicos para la gestión de inicio de sesión.
 */
export default class Login extends Base {
  static tabla = null; // La tabla se establece en las clases hijas según sea necesario.

  /**
   * Obtiene un registro por sus credenciales de correo electrónico.
   * @param {string} email - El correo electrónico del usuario.
   * @returns {Promise<Object|null>} El usuario correspondiente al correo electrónico proporcionado, o null si no se encuentra.
   */
  static async obtenerPorCredenciales(email) {
    // Consulta SQL para seleccionar un registro por su correo electrónico.
    const consulta = `SELECT * FROM ${this.tabla} WHERE email = ?`;

    try {
      // Ejecuta la consulta SQL con el correo electrónico como parámetro.
      const [fila] = await this.db.execute(consulta, [email]);
      return fila; // Devuelve el resultado de la consulta.
    } catch (error) {
      // En caso de error, lanza una excepción con el error.
      throw error;
    }
  }
}
