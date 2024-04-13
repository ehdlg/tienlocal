import { db } from '../db/config.js';

export default class Base {
  static tabla = null;

  static async obtenerTodos() {
    const consulta = `SELECT * FROM ${this.tabla}`;

    try {
      const [filas] = await db.query(consulta);

      return filas;
    } catch (error) {
      throw error;
    }
  }

  static async obtenerUno(id) {
    const consulta = `SELECT * FROM ${this.tabla} WHERE id = ?`;

    try {
      const [fila] = await db.execute(consulta, [id]);

      return fila[0] || {};
    } catch (error) {
      throw error;
    }
  }

  static async crear(nuevoRegistro = {}) {
    const consulta = `INSERT INTO ${this.tabla} SET ? ;`;

    try {
      const [fila] = await db.query(consulta, [nuevoRegistro]);

      fila.info =
        fila.affectedRows === 1 ? 'Registro creado correctamente' : 'No se pudo crear el registro';

      return fila;
    } catch (error) {
      throw error;
    }
  }

  static async actualizar(id, datos = {}) {
    const consulta = `UPDATE ${this.tabla} SET ? WHERE id = ?;`;

    try {
      const [fila] = await db.query(consulta, [datos, id]);

      fila.info =
        fila.affectedRows === 1
          ? 'Registro actualizado correctamente'
          : 'No hubo nada que actualizar.';

      return fila;
    } catch (error) {
      throw error;
    }
  }

  static async borrar(id) {
    const consulta = `DELETE FROM ${this.tabla} WHERE id = ?;`;

    try {
      const [fila] = await db.execute(consulta, [id]);

      fila.info =
        fila.affectedRows === 1
          ? `Registro con ID:${id} eliminado de ${this.tabla}.`
          : `No se pudo borrar el registro, el ID:${id} no se encuentra en la tabla ${this.tabla}.`;

      return fila;
    } catch (error) {
      throw error;
    }
  }
}
