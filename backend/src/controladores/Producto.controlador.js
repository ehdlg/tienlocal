import Producto from '../modelos/Producto.js';
import { HTTPError } from '../utils/errores/index.js';

export default class ProductoControlador {
  static async obtenerTodos(req, res, next) {
    try {
      const { nombre, precioMinimo, precioMaximo, categoria, empresa, limite, offset } = req.query;

      const filtros = {
        nombre,
        precioMinimo,
        precioMaximo,
        categoria,
        empresa,
      };

      const productos = await Producto.obtenerTodosFiltrado(filtros, limite, offset);

      return res.json(productos);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerUno(req, res, next) {
    const { id } = req.params;

    try {
      const producto = await Producto.obtenerUnoDetalles(id);

      if (null == producto) throw new HTTPError({ mensaje: 'Producto no encontrado', estado: 404 });

      return res.json(producto);
    } catch (error) {
      next(error);
    }
  }

  static async actualizar(req, res, next) {
    const { id, ...datosActualizacion } = req.datosValidados;

    try {
      if (Object.keys(datosActualizacion).length === 0) {
        throw new HTTPError({ mensaje: 'No se han recibido datos para actualizar', estado: 400 });
      }

      const productoActualizado = await Producto.actualizar(id, datosActualizacion);

      return res.json(productoActualizado);
    } catch (error) {
      next(error);
    }
  }

  static async borrar(req, res, next) {
    const { id } = req.params;

    try {
      const productoBorrado = await Producto.borrar(id);

      if (null == productoBorrado) throw new HTTPError({ mensaje: 'Producto no encontrado', estado: 404 });

      return res.json(productoBorrado);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerCantidad(req, res, next) {
    const { nombre, precioMinimo, precioMaximo, categoria, empresa } = req.query;

    const filtros = {
      nombre,
      precioMinimo,
      precioMaximo,
      categoria,
      empresa,
    };

    try {
      const [resultado] = await Producto.obtenerCantidadFiltrado(filtros);
      const [cantidad] = Object.values(resultado);

      return res.json(cantidad);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerPrecioMaximo(req, res, next) {
    try {
      const [resultado] = await Producto.obtenerPrecioMaximo();

      const [precio] = Object.values(resultado);

      return res.json(Number(precio));
    } catch (error) {
      next(error);
    }
  }
}
