import Categoria from '../modelos/Categoria.js';
import { HTTPError } from '../utils/errores/index.js';

export default class CategoriaControlador {
  static async obtenerTodos(req, res, next) {
    try {
      const categorias = await Categoria.obtenerTodos();

      return res.json(categorias);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerUno(req, res, next) {
    const { id } = req.params;

    try {
      const categoria = await Categoria.obtenerUno(id);

      if (null == categoria)
        throw new HTTPError({ mensaje: 'Categoría no encontrada', estado: 404 });

      return res.json(categoria);
    } catch (error) {
      next(error);
    }
  }

  static async crear(req, res, next) {
    const nuevaCategoria = req.datosValidados;

    try {
      const categoriaCreada = await Categoria.crear(nuevaCategoria);

      return res.status(201).json(categoriaCreada);
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

      const categoriaActualizada = await Categoria.actualizar(id, datosActualizacion);

      return res.json(categoriaActualizada);
    } catch (error) {
      next(error);
    }
  }

  static async borrar(req, res, next) {
    const { id } = req.params;

    try {
      const categoriaBorrada = await Categoria.borrar(id);

      if (null == categoriaBorrada)
        throw new HTTPError({ mensaje: 'Categoría no encontrada', estado: 404 });

      return res.json(categoriaBorrada);
    } catch (error) {
      next(error);
    }
  }
}
