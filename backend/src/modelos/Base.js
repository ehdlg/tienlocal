// Se importa la conexion a la base de datos
import { db } from '../db/config.js';

export default class Base {
  // Se establece el parametro estático de la clase tabla como null, en cada modelo se sobreescribira este valor con el nombre de la tabla
  static tabla = null;
  // Propiedad que contiene la conexión a la base de datos para ser utilizada en los modelos
  static db = db;

  /**
   * Obtiene todos los registros de la tabla, con opción de limitar y desplazar los resultados.
   * @param {number|null} limite - Número máximo de registros a obtener. Si es null, no se aplica límite.
   * @param {number|null} offset - Número de registros a desplazar. Si es null, no se aplica desplazamiento.
   * @returns {Promise<Array>} Lista de registros.
   * @throws {Error} Si ocurre un error durante la ejecución de la consulta.
   */
  static async obtenerTodos(limite = null, offset = null) {
    let consulta = `SELECT * FROM ${this.tabla}`;
    const parametros = [];

    if (null != limite && !isNaN(limite)) {
      consulta += ' LIMIT ?';
      parametros.push(limite);
    }

    if (null != offset && !isNaN(offset)) {
      consulta += ' OFFSET ?';
      parametros.push(offset);
    }

    try {
      const [filas] = await this.db.execute(consulta, parametros);
      return filas;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene un único registro por ID.
   * @param {number} id - ID del registro a obtener.
   * @returns {Promise<Object|null>} El registro encontrado o null si no se encuentra.
   * @throws {Error} Si ocurre un error durante la ejecución de la consulta.
   */
  static async obtenerUno(id) {
    const consulta = `SELECT * FROM ${this.tabla} WHERE id = ?`;

    try {
      const [fila] = await this.db.execute(consulta, [id]);
      return fila[0] || null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Crea un nuevo registro en la tabla.
   * @param {Object} nuevoRegistro - Objeto con los datos del nuevo registro.
   * @returns {Promise<Object>} Información del resultado de la operación.
   * @throws {Error} Si ocurre un error durante la ejecución de la consulta.
   */
  static async crear(nuevoRegistro = {}) {
    const consulta = `INSERT INTO ${this.tabla} SET ? ;`;

    try {
      const [fila] = await this.db.query(consulta, [nuevoRegistro]);
      fila.info = fila.affectedRows === 1 ? 'Registro creado correctamente' : 'No se pudo crear el registro';
      return fila;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Actualiza un registro existente en la tabla.
   * @param {number} id - ID del registro a actualizar.
   * @param {Object} datos - Objeto con los datos a actualizar.
   * @returns {Promise<Object>} Información del resultado de la operación.
   * @throws {Error} Si ocurre un error durante la ejecución de la consulta.
   */
  static async actualizar(id, datos = {}) {
    const consulta = `UPDATE ${this.tabla} SET ? WHERE id = ?;`;

    try {
      const [fila] = await this.db.query(consulta, [datos, id]);
      fila.info = fila.affectedRows === 1 ? 'Registro actualizado correctamente' : 'No hubo nada que actualizar.';
      return fila;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Borra un registro de la tabla por ID.
   * @param {number} id - ID del registro a borrar.
   * @returns {Promise<Object>} Información del resultado de la operación.
   * @throws {Error} Si ocurre un error durante la ejecución de la consulta.
   */
  static async borrar(id) {
    const consulta = `DELETE FROM ${this.tabla} WHERE id = ?;`;

    try {
      const [fila] = await this.db.execute(consulta, [id]);
      fila.info =
        fila.affectedRows === 1
          ? `Registro con ID:${id} eliminado de ${this.tabla}.`
          : `No se pudo borrar el registro, el ID:${id} no se encuentra en la tabla ${this.tabla}.`;
      return fila;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene un valor específico de un campo en la tabla.
   * @param {string} campo - Nombre del campo a buscar.
   * @param {string|number} valor - Valor del campo a buscar.
   * @returns {Promise<Object>} El resultado de la consulta.
   * @throws {Error} Si ocurre un error durante la ejecución de la consulta.
   */
  static async obtenerValor(campo, valor) {
    const consulta = `SELECT ${campo} FROM ${this.tabla} WHERE ${campo} = ?`;

    try {
      const [resultado] = await this.db.execute(consulta, [valor]);
      return resultado[0];
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene la cantidad total de registros en la tabla.
   * @returns {Promise<number>} La cantidad total de registros.
   * @throws {Error} Si ocurre un error durante la ejecución de la consulta.
   */
  static async obtenerCantidad() {
    const consulta = `SELECT COUNT(id) FROM ${this.tabla}`;

    try {
      const [cantidad] = await this.db.query(consulta);
      return cantidad;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene el último registro de la tabla basado en el campo 'creado'.
   * @returns {Promise<Object>} El último registro creado.
   * @throws {Error} Si ocurre un error durante la ejecución de la consulta.
   */
  static async obtenerUltimoRegistro() {
    const consulta = `SELECT creado FROM ${this.tabla} ORDER BY creado DESC LIMIT 1`;

    try {
      const [resultado] = await this.db.query(consulta);
      return resultado;
    } catch (error) {
      throw error;
    }
  }
}
