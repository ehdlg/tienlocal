import Valoracion from '../modelos/Valoracion.js';
import { HTTPError } from '../utils/errores/index.js';

export default class ValoracionControlador {
  static async obtenerTodos(req, res, next) {
    try {
      const valoraciones = await Valoracion.obtenerTodos();

      return res.json(valoraciones);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerUno(req, res, next) {
    const { id } = req.params;

    try {
      const valoracion = await Valoracion.obtenerUno(id);

      if (null == valoracion)
        throw new HTTPError({ mensaje: 'Valoración no encontrada', estado: 404 });

      return res.json(valoracion);
    } catch (error) {
      next(error);
    }
  }

  static async crear(req, res, next) {
    const nuevaValoracion = req.datosValidados;

    try {
      const valoracionCreada = await Valoracion.crear(nuevaValoracion);

      return res.status(201).json(valoracionCreada);
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

      const valoracionActualizada = await Valoracion.actualizar(id, datosActualizacion);

      return res.json(valoracionActualizada);
    } catch (error) {
      next(error);
    }
  }

  static async borrar(req, res, next) {
    const { id } = req.params;

    try {
      const valoracionBorrada = await Valoracion.borrar(id);

      if (null == valoracionBorrada)
        throw new HTTPError({ mensaje: 'Valoración no encontrada', estado: 404 });

      return res.json(valoracionBorrada);
    } catch (error) {
      next(error);
    }
  }
}
