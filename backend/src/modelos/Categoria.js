import Base from './Base.js';

/**
 * Clase Categoria.
 * Hereda de la clase Base, que contiene las operaciones básicas CRUD.
 * Establece el nombre de la tabla como 'categorias'.
 */
export default class Categoria extends Base {
  static tabla = 'categorias';
}
