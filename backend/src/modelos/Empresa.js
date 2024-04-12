import { db } from '../db/config.js';

export default class Empresa {
  static async obtenerTodos() {
    const consulta = 'SELECT * FROM `empresas`;';
    try {
      const [empresas] = await db.query(consulta);

      return empresas;
    } catch (error) {
      throw error;
    }
  }

  static async obtenerUno(id) {
    const consulta = 'SELECT * FROM empresas WHERE id = ?';

    try {
      const [empresa] = await db.query(consulta, [id]);

      return empresa[0] || {};
    } catch (error) {
      throw error;
    }
  }

  static async crear(nombre, email, contrasena, descripcion, ubicacion) {
    const consulta = `INSERT INTO empresas VALUES 
      (nombre, email, contrasena, descripcion, ubicacion) 
      VALUES (?,?,?,?);`;

    try {
      const [resultado] = await db.execute(consulta, [
        nombre,
        email,
        contrasena,
        descripcion,
        ubicacion,
      ]);

      resultado.info =
        resultado.affectedRows === 1
          ? 'Empresa creada correctamente'
          : 'No se pudo crear la empresa';

      return resultado;
    } catch (error) {
      throw error;
    }
  }

  static async actualizar(id, datos = {}) {
    const consulta = 'UPDATE `empresas` SET ? WHERE id = ?;';

    try {
      const [resultado] = await db.query(consulta, [datos, id]);

      resultado.info =
        resultado.affectedRows === 1
          ? 'Empresa actualizada correctamente.'
          : 'No hubo nada que actualizar.';

      return resultado;
    } catch (error) {
      throw error;
    }
  }

  static async borrar(id) {
    const consulta = 'DELETE FROM `empresas` WHERE `id` = ?;';

    try {
      const [resultado] = await db.execute(consulta, [id]);

      resultado.info =
        resultado.affectedRows === 1
          ? `Empresa con ID:${id} eliminada.`
          : `No se pudo borrar la empresa, el ID:${id} no corresponde con ninguna empresa.`;

      return resultado;
    } catch (error) {
      throw error;
    }
  }
}
