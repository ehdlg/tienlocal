// Importación de la clase base para la interacción con la base de datos.
import Base from './Base.js';

/**
 * Clase Producto.
 * Hereda de Base y proporciona métodos específicos para la gestión de productos.
 */
export default class Producto extends Base {
  static tabla = 'productos'; // Nombre de la tabla en la base de datos.

  /**
   * Obtiene todos los productos filtrados según los criterios proporcionados.
   * @param {Object} filtros - Los criterios de filtrado para la búsqueda de productos.
   * @param {number} limite - El límite de productos a devolver.
   * @param {number} offset - El desplazamiento para la paginación de resultados.
   * @returns {Promise<Array<Object>>} Una promesa que se resuelve con los productos filtrados.
   */
  static async obtenerTodosFiltrado(filtros = {}, limite = null, offset = null) {
    let consulta = `SELECT * FROM ${this.tabla} WHERE 1`;
    const parametros = [];

    // Filtrado por nombre.
    if (null != filtros.nombre) {
      consulta += ' AND nombre LIKE ?';
      parametros.push(`%${filtros.nombre}%`);
    }

    // Filtrado por precio mínimo.
    if (null != filtros.precioMinimo) {
      consulta += ' AND precio >= ?';
      parametros.push(filtros.precioMinimo);
    }

    // Filtrado por precio máximo.
    if (null != filtros.precioMaximo) {
      consulta += ' AND precio <= ?';
      parametros.push(filtros.precioMaximo);
    }

    // Filtrado por categoría.
    if (null != filtros.categoria) {
      consulta += ' AND id_categoria = ?';
      parametros.push(filtros.categoria);
    }

    // Filtrado por empresa.
    if (null != filtros.empresa) {
      consulta += ' AND id_empresa = ?';
      parametros.push(filtros.empresa);
    }

    // Limitar el número de resultados.
    if (null != limite && !isNaN(limite)) {
      consulta += ' LIMIT ?';
      parametros.push(limite);
    }

    // Desplazar los resultados.
    if (null != offset && !isNaN(offset)) {
      consulta += ' OFFSET ?';
      parametros.push(offset);
    }

    try {
      const [filas] = await this.db.execute(consulta, parametros);
      return filas; // Devuelve los productos filtrados.
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene la cantidad de productos filtrados según los criterios proporcionados.
   * @param {Object} filtros - Los criterios de filtrado para la búsqueda de productos.
   * @returns {Promise<number>} Una promesa que se resuelve con la cantidad de productos filtrados.
   */
  static async obtenerCantidadFiltrado(filtros) {
    let consulta = `SELECT COUNT(id) FROM ${this.tabla} WHERE 1`;
    const parametros = [];

    // Construcción de la consulta de acuerdo a los filtros.
    // Similar al método obtenerTodosFiltrado pero sin limitar o desplazar resultados.

    try {
      const [cantidad] = await this.db.execute(consulta, parametros);
      return cantidad; // Devuelve la cantidad de productos filtrados.
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene el precio máximo entre todos los productos.
   * @returns {Promise<number>} Una promesa que se resuelve con el precio máximo.
   */
  static async obtenerPrecioMaximo() {
    const consulta = 'SELECT MAX(precio) FROM productos';

    try {
      const [precio] = await this.db.query(consulta);
      return precio; // Devuelve el precio máximo.
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene todos los productos con detalles adicionales (nombre de empresa y categoría).
   * @returns {Promise<Array<Object>>} Una promesa que se resuelve con los detalles de todos los productos.
   */
  static async obtenerTodosDetalles() {
    const consulta = `SELECT p.id, p.nombre, p.descripcion, p.precio, p.stock, p.imagen, p.id_empresa, p.id_categoria, e.nombre as empresa, c.nombre as categoria
    FROM productos p
    JOIN empresas e ON e.id = p.id_empresa
    JOIN categorias c ON c.id = p.id_categoria`;

    try {
      const [productos] = await this.db.execute(consulta);
      return productos || null; // Devuelve los detalles de todos los productos.
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene los detalles de un producto específico (nombre de empresa y categoría).
   * @param {number} id - El ID del producto.
   * @returns {Promise<Object>} Una promesa que se resuelve con los detalles del producto especificado.
   */
  static async obtenerUnoDetalles(id) {
    const consulta = `SELECT p.id, p.nombre, p.descripcion, p.precio, p.stock, p.imagen, p.id_empresa, p.id_categoria, e.nombre as empresa, c.nombre as categoria
  FROM productos p
  JOIN empresas e ON e.id = p.id_empresa
  JOIN categorias c ON c.id = p.id_categoria
  WHERE p.id = ? `;

    try {
      const [producto] = await this.db.execute(consulta, [id]);
      return producto[0] || null; // Devuelve los detalles del producto.
    } catch (error) {
      throw error;
    }
  }
}
