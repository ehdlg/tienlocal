import Base from './Base.js';

export default class Producto extends Base {
  static tabla = 'productos';

  static async obtenerTodosFiltrado(filtros = {}, limite = null, offset = null) {
    let consulta = `SELECT * FROM ${this.tabla} WHERE 1`;
    const parametros = [];

    if (null != filtros.nombre) {
      consulta += ' AND nombre LIKE ?';

      parametros.push(`%${filtros.nombre}%`);
    }

    if (null != filtros.precioMinimo) {
      consulta += ' AND precio >= ?';

      parametros.push(filtros.precioMinimo);
    }

    if (null != filtros.precioMaximo) {
      consulta += ' AND precio <= ?';

      parametros.push(filtros.precioMaximo);
    }

    if (null != filtros.categoria) {
      consulta += ' AND id_categoria = ?';
      parametros.push(filtros.categoria);
    }

    if (null != filtros.empresa) {
      consulta += ' AND id_empresa = ?';
      parametros.push(filtros.empresa);
    }

    if (null != limite && !isNaN(limite)) {
      consulta += ' LIMIT ?';
      parametros.push(limite);
    }

    if (null != offset && !isNaN(offset)) {
      consulta += ' OFFSET ?';
      parametros.push(offset);
    }

    try {
      const [filas] = await this.db.execute(consulta, parametros);

      return filas;
    } catch (error) {
      throw error;
    }
  }

  static async obtenerCantidadFiltrado(filtros) {
    let consulta = `SELECT COUNT(id) FROM ${this.tabla} WHERE 1`;
    const parametros = [];

    if (null != filtros.nombre) {
      consulta += ' AND nombre LIKE ?';

      parametros.push(`%${filtros.nombre}%`);
    }

    if (null != filtros.precioMinimo) {
      consulta += ' AND precio >= ?';

      parametros.push(filtros.precioMinimo);
    }

    if (null != filtros.precioMaximo) {
      consulta += ' AND precio <= ?';

      parametros.push(filtros.precioMaximo);
    }

    if (null != filtros.categoria) {
      consulta += ' AND id_categoria = ?';
      parametros.push(filtros.categoria);
    }

    if (null != filtros.empresa) {
      consulta += ' AND id_empresa = ?';
      parametros.push(filtros.empresa);
    }

    try {
      const [cantidad] = await this.db.execute(consulta, parametros);

      return cantidad;
    } catch (error) {
      throw error;
    }
  }

  static async obtenerPrecioMaximo() {
    const consulta = 'SELECT MAX(precio) FROM productos';

    try {
      const [precio] = await this.db.query(consulta);

      return precio;
    } catch (error) {
      throw error;
    }
  }

  static async obtenerUnoDetalles(id) {
    const consulta = `SELECT p.id, p.nombre, p.descripcion, p.precio, p.stock, p.imagen, e.nombre as empresa, c.nombre as categoria
    FROM productos p
    JOIN empresas e ON e.id = p.id_empresa
    JOIN categorias c ON c.id = p.id_categoria
    WHERE p.id = ? `;

    try {
      const [producto] = await this.db.execute(consulta, [id]);

      return producto[0] || null;
    } catch (error) {
      throw error;
    }
  }

  static async obtenerProductosEmpresa(idEmpresa) {
    const consulta = 'SELECT id, nombre, descripcion, precio, stock, imagen FROM productos WHERE id_empresa = ?';

    try {
      const [productos] = await this.db.execute(consulta, [idEmpresa]);

      return productos;
    } catch (error) {
      throw error;
    }
  }
}
