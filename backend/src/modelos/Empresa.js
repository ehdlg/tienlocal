import Login from './Login.js';

export default class Empresa extends Login {
  static tabla = 'empresas';

  static async obtenerProductosEmpresa(idEmpresa) {
    const consulta = 'SELECT id, nombre, descripcion, precio, stock, imagen FROM productos WHERE id_empresa = ?';

    try {
      const [productos] = await this.db.execute(consulta, [idEmpresa]);

      return productos;
    } catch (error) {
      throw error;
    }
  }

  static async borrarProductoEmpresa(idProducto, idEmpresa) {
    const consulta = 'DELETE FROM productos WHERE id = ? AND id_empresa = ?';

    try {
      const [resultado] = await this.db.execute(consulta, [idProducto, idEmpresa]);

      const borradoExitoso = resultado.affectedRows > 0;

      resultado.estado = borradoExitoso ? 200 : 404;
      resultado.info = borradoExitoso ? 'Producto borrado' : 'No hay nada que borrar';

      return resultado;
    } catch (error) {
      throw error;
    }
  }
}
