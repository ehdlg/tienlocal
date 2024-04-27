import { crearToken } from '../middlewares/auth/index.js';
import Empresa from '../modelos/Empresa.js';
import { HTTPError } from '../utils/errores/index.js';

export default class EmpresaControlador {
  static async obtenerTodos(req, res, next) {
    try {
      const empresas = await Empresa.ObtenerTodosSinCredenciales();

      return res.json(empresas);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerUno(req, res, next) {
    const { id } = req.params;

    try {
      const empresa = await Empresa.obtenerUno(id);

      if (null == empresa) throw new HTTPError({ mensaje: 'Empresa no encontrada', estado: 404 });

      return res.json(empresa);
    } catch (error) {
      next(error);
    }
  }

  static async crear(req, res, next) {
    const nuevaEmpresa = req.datosValidados;

    try {
      const empresaCreada = await Empresa.crear(nuevaEmpresa);

      return res.status(201).json(empresaCreada);
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

      const empresaActualizada = await Empresa.actualizar(id, datosActualizacion);

      return res.json(empresaActualizada);
    } catch (error) {
      next(error);
    }
  }

  static async borrar(req, res, next) {
    const { id } = req.params;

    try {
      const empresaBorrada = await Empresa.borrar(id);

      if (null == empresaBorrada)
        throw new HTTPError({ mensaje: 'Empresa no encontrada', estado: 404 });

      return res.json(empresaBorrada);
    } catch (error) {
      next(error);
    }
  }

  static login = crearToken;
}
