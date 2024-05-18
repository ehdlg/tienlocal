import Base from './Base.js';
import Usuario from './Usuario.js';
import Producto from './Producto.js';

/**
 * Clase Compra.
 * Hereda de la clase Base, que contiene las operaciones básicas CRUD.
 * Establece el nombre de la tabla como 'compras'.
 */
export default class Compra extends Base {
  static tabla = 'compras';

  /**
   * Obtiene la última compra realizada.
   *
   * @returns {Promise<Object>} El último registro de compra.
   * @throws {Error} Si ocurre un error al ejecutar la consulta.
   */
  static async obtenerUltimaCompra() {
    const consulta = 'SELECT * FROM compras ORDER BY fecha DESC LIMIT 1';

    try {
      const [compra] = await this.db.query(consulta);

      return compra;
    } catch (error) {
      throw error;
    }
  }

  static async comprar(idUsuario, detalleCompras) {
    const conexion = await this.db.getConnection();

    try {
      await conexion.beginTransaction();

      const detalles = [];
      //Se comprueba que existe el usuario
      const usuario = await Usuario.obtenerUno(idUsuario);

      //Si no existe el usuario, se lanza un error
      if (null == usuario) throw new Error(`El usuario con ID:${idUsuario} no existe`);

      // Se crea el registro de la compra
      const [compra] = await conexion.execute('INSERT INTO compras (id_usuario) VALUES (?)', [idUsuario]);
      // Se obtiene le id del nuevo registro de compra para usarlo en la creacion de detalles de compra
      const idCompra = compra.insertId;

      //Recorrer cada producto
      for (const detalle of detalleCompras) {
        const { cantidad, id: idProducto, precio } = detalle;

        //Se comprueba si existe producto y su stock
        const [resultado] = await conexion.query('SELECT stock FROM productos WHERE id = ?', [idProducto]);

        const [fila] = resultado;

        //Si no existe el producto, se lanza un error
        if (null == fila) throw new Error(`Producto con ID:${idProducto} no encontrado, operación cancelada`);

        const { stock } = fila;

        // Si la cantidad comprada es mayor al stock, se lanza un error
        if (cantidad > stock)
          throw new Error(`La cantidad para el producto con ID:${idProducto} supera el stock disponible `);

        //Actualizar el stock del producto
        const nuevoStock = stock - cantidad;
        await Producto.actualizar(idProducto, { stock: nuevoStock });

        //Insertar los detalles de la comppra del producto en la tabla detalle_compras
        const insertDetalle = `INSERT INTO 
                                detalle_compras (id_compra, id_producto, cantidad, precio_unitario)
                                VALUES(?, ?, ?, ?);`;

        const [detalleProducto] = await conexion.execute(insertDetalle, [idCompra, idProducto, cantidad, precio]);
        detalles.push(detalleProducto);
      }

      conexion.commit();

      return detalles;
    } catch (error) {
      //Si hay algun error, hacer rollback de la operacion y lanzar el error
      await conexion.rollback();
      throw error;
    } finally {
      //Terminar la conexión
      conexion.end();
    }
  }
}
