import Base from './Base.js';

/**
 * Clase que representa las valoraciones en la base de datos.
 * Hereda de la clase Base que proporciona métodos básicos de interacción con la base de datos.
 */
export default class Valoracion extends Base {
  /**
   * Nombre de la tabla en la base de datos correspondiente a las valoraciones.
   * @type {string}
   */
  static tabla = 'valoraciones';
}
