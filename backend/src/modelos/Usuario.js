import { db } from '../db/config.js';

export default class Usuario {
  static async obtenerTodos() {
    const consulta = 'SELECT * FROM `usuarios`;';

    try {
      const [usuarios] = await db.query(consulta);

      return usuarios;
    } catch (error) {
      throw error;
    }
  }

  static async obtenerUno(id) {
    const consulta = 'SELECT * FROM usuarios WHERE id = ?';

    try {
      const [usuario] = await db.query(consulta, [id]);

      return usuario[0] || {};
    } catch (error) {
      throw error;
    }
  }

  static async crear(nombre, apellidos, email, contrasena) {
    const consulta =
      'INSERT INTO `usuarios` (nombre, apellidos, email, contrasena) VALUES (?,?,?,?);';

    try {
      const [resultado] = await db.execute(consulta, [nombre, apellidos, email, contrasena]);

      resultado.info =
        resultado.affectedRows === 1
          ? 'Usuario creado correctamente'
          : 'No se pudo crear el usuario';

      return resultado;
    } catch (error) {
      throw error;
    }
  }

  static async actualizar(id, datos = {}) {
    const consulta = 'UPDATE `usuarios` SET ? WHERE id = ?;';

    try {
      const [resultado] = await db.query(consulta, [datos, id]);

      resultado.info =
        resultado.affectedRows === 1
          ? 'Usuario actualizado correctamente.'
          : 'No hubo nada que actualizar.';

      return resultado;
    } catch (error) {
      throw error;
    }
  }

  static async borrar(id) {
    const consulta = 'DELETE FROM usuarios WHERE `id` = ?;';

    try {
      const [resultado] = await db.execute(consulta, [id]);

      resultado.info =
        resultado.affectedRows === 1
          ? `Usuario con ID:${id} eliminado.`
          : `No se pudo borrar el usuario, el ID:${id} no corresponde con ningún usuario.`;

      return resultado;
    } catch (error) {
      throw error;
    }
  }
}
