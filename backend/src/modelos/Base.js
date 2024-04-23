import { db } from '../db/config.js';

export default class Base {
  static tabla = null;
  static db = db;

  static async obtenerTodos(limite = null, offset = null) {
    let consulta = `SELECT * FROM ${this.tabla}`;
    const parametros = [];

    if (null != limite && !isNaN(limite)) {
      consulta += ' LIMIT ?';
      parametros.push(limite);
    }

    if (null != offset && typeof offset == 'number') {
      consulta += ' OFFSET ?';
      parametros.push(offset);
    }

    console.log(limite, offset);
    console.log(consulta);
    try {
      const [filas] = await this.db.execute(consulta, parametros);

      return filas;
    } catch (error) {
      throw error;
    }
  }

  static async obtenerUno(id) {
    const consulta = `SELECT * FROM ${this.tabla} WHERE id = ?`;

    try {
      const [fila] = await this.db.execute(consulta, [id]);

      return fila[0] || null;
    } catch (error) {
      throw error;
    }
  }

  static async crear(nuevoRegistro = {}) {
    const consulta = `INSERT INTO ${this.tabla} SET ? ;`;

    try {
      const [fila] = await this.db.query(consulta, [nuevoRegistro]);

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
      const [fila] = await this.db.query(consulta, [datos, id]);

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

  static async obtenerValor(campo, valor) {
    const consulta = `SELECT ${campo} FROM ${this.tabla} WHERE ${campo} = ?`;

    try {
      const [resultado] = await this.db.execute(consulta, [valor]);

      return resultado[0];
    } catch (error) {
      throw error;
    }
  }
}
