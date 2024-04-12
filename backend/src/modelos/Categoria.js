import { db } from '../db/config.js';

export default class Categoria {
  static async obtenerTodos() {
    const consulta = 'SELECT * FROM `categorias`;';

    try {
      const [categorias] = await db.query(consulta);

      return categorias;
    } catch (error) {
      throw error;
    }
  }

  static async obtenerUno(id) {
    const consulta = 'SELECT * FROM `categorias` WHERE id = ?';

    try {
      const [categoria] = await db.query(consulta, [id]);

      return categoria[0] || {};
    } catch (error) {
      throw error;
    }
  }

  static async crear(nombre) {
    const consulta = 'INSERT INTO categorias VALUES (nombre) VALUES (?);';

    try {
      const [resultado] = await db.execute(consulta, [nombre]);

      resultado.info =
        resultado.affectedRows === 1
          ? 'Categoría creada correctamente'
          : 'No se pudo crear la categoría';

      return resultado;
    } catch (error) {
      throw error;
    }
  }

  static async actualizar(id, datos = {}) {
    const consulta = 'UPDATE `categorias` SET ? WHERE id = ?;';

    try {
      const [resultado] = await db.query(consulta, [datos, id]);

      resultado.info =
        resultado.affectedRows === 1
          ? 'Categoría actualizada correctamente.'
          : 'No hubo nada que actualizar.';

      return resultado;
    } catch (error) {
      throw error;
    }
  }

  static async borrar(id) {
    const consulta = 'DELETE FROM `categorias` WHERE `id` = ?;';

    try {
      const [resultado] = await db.execute(consulta, [id]);

      resultado.info =
        resultado.affectedRows === 1
          ? `Categoría con ID:${id} eliminada.`
          : `No se pudo borrar la categoría, el ID:${id} no corresponde con ninguna categoría.`;

      return resultado;
    } catch (error) {
      throw error;
    }
  }
}
