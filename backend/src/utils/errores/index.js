/**
 * Clase para representar errores HTTP personalizados.
 * @extends Error
 */
export class HTTPError extends Error {
  /**
   * Crea una instancia de HTTPError.
   * @param {Object} options - Opciones para inicializar el error.
   * @param {string} options.mensaje - Mensaje de error.
   * @param {number} options.estado - Código de estado HTTP.
   */
  constructor({ mensaje, estado }) {
    super(mensaje); // Llama al constructor de la clase padre (Error) con el mensaje de error proporcionado
    this.estado = estado; // Establece el código de estado HTTP
  }
}
