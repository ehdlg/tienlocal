import Login from './Login.js';

/**
 * Clase Empresa.
 * Hereda de Login y proporciona métodos específicos para la gestión de productos relacionados con empresas.
 */
export default class Empresa extends Login {
  static tabla = 'empresas';

  /**
   * Obtiene los productos de una empresa específica.
   * @param {number} idEmpresa - El ID de la empresa.
   * @returns {Promise<Array>} Lista de productos de la empresa.
   */
  static async obtenerProductosEmpresa(idEmpresa) {
    // Consulta SQL para seleccionar los productos de una empresa por su ID.
    const consulta = 'SELECT id, nombre, descripcion, precio, stock, imagen FROM productos WHERE id_empresa = ?';

    try {
      // Ejecuta la consulta SQL con el ID de la empresa como parámetro.
      const [productos] = await this.db.execute(consulta, [idEmpresa]);
      return productos;
    } catch (error) {
      // En caso de error, lanza una excepción con el error.
      throw error;
    }
  }

  /**
   * Borra un producto específico de una empresa.
   * @param {number} idProducto - El ID del producto a borrar.
   * @param {number} idEmpresa - El ID de la empresa propietaria del producto.
   * @returns {Promise<Object>} Resultado de la operación de borrado.
   */
  static async borrarProductoEmpresa(idProducto, idEmpresa) {
    // Consulta SQL para eliminar un producto de una empresa por su ID de producto y ID de empresa.
    const consulta = 'DELETE FROM productos WHERE id = ? AND id_empresa = ?';

    try {
      // Ejecuta la consulta SQL con los IDs de producto y empresa como parámetros.
      const [resultado] = await this.db.execute(consulta, [idProducto, idEmpresa]);

      // Verifica si se borró al menos un registro y establece el estado y la información del resultado en consecuencia.
      const borradoExitoso = resultado.affectedRows > 0;
      resultado.estado = borradoExitoso ? 200 : 404;
      resultado.info = borradoExitoso ? 'Producto borrado' : 'No hay nada que borrar';

      return resultado;
    } catch (error) {
      // En caso de error, lanza una excepción con el error.
      throw error;
    }
  }
}
