import Base from './Base.js';

/**
 * Clase DetalleCompra.
 * Hereda de la clase Base, que contiene las operaciones básicas CRUD.
 * Establece el nombre de la tabla como 'detalle_compras'.
 */
export default class DetalleCompra extends Base {
  static tabla = 'detalle_compras';
}
