import Producto from '../modelos/Producto.js';
import { HTTPError } from '../utils/errores/index.js';

export default class UsuarioControlador {
  static async obtenerTodos(req, res, next) {
    try {
      const productos = await Producto.obtenerTodos();

      return res.json(productos);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerUno(req, res, next) {
    const { id } = req.params;

    try {
      const producto = await Producto.obtenerUno(id);

      if (null == producto) throw new HTTPError({ mensaje: 'Producto no encontrado', estado: 404 });

      return res.json(producto);
    } catch (error) {
      next(error);
    }
  }

  static async crear(req, res, next) {
    const nuevoProducto = req.datosValidados;

    try {
      const productoCreado = await Producto.crear(nuevoProducto);

      return res.status(201).json(productoCreado);
    } catch (error) {
      next(error);
    }
  }

  static async actualizar(req, res, next) {
    const { id, ...datosActualizacion } = req.datosValidados;

    try {
      if (Object.keys(datosActualizacion).length === 0) {
        throw new Error('No se han recibido datos para actualizar');
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

      if (null == productoBorrado)
        throw new HTTPError({ mensaje: 'Producto no encontrado', estado: 404 });

      return res.json(productoBorrado);
    } catch (error) {
      next(error);
    }
  }
}
