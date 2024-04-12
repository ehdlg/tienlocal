import { db } from '../db/config.js';

export default class Producto {
  static async obtenerTodos() {
    const consulta = 'SELECT * FROM `productos`;';

    try {
      const [productos] = await db.query(consulta);

      return productos;
    } catch (error) {
      throw error;
    }
  }

  static async obtenerUno(id) {
    const consulta = 'SELECT * FROM productos WHERE id = ?';

    try {
      const [producto] = await db.query(consulta, [id]);

      return producto[0] || {};
    } catch (error) {
      throw error;
    }
  }

  static async crear(nombre, descripcion, precio, stock, empresa_id, categoria_id) {
    const consulta = `INSERT INTO productos 
      (nombre, descripcion, precio, stock, empresa_id, categoria_id) 
      VALUES (?,?,?,?);`;

    try {
      const [resultado] = await db.execute(consulta, [
        nombre,
        descripcion,
        precio,
        stock,
        empresa_id,
        categoria_id,
      ]);

      resultado.info =
        resultado.affectedRows === 1
          ? 'Producto creado correctamente'
          : 'No se pudo crear el producto';

      return resultado;
    } catch (error) {
      throw error;
    }
  }

  static async actualizar(id, datos = {}) {
    const consulta = 'UPDATE `productos` SET ? WHERE id = ?;';

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
    const consulta = 'DELETE FROM `productos` WHERE `id` = ?;';
    try {
      const [resultado] = await db.execute(consulta, [id]);

      resultado.info =
        resultado.affectedRows === 1
          ? `Producto con ID:${id} eliminado.`
          : `No se pudo borrar el producto, el ID:${id} no corresponde con ningún producto.`;

      return resultado;
    } catch (error) {
      throw error;
    }
  }
}
