import { crearToken } from '../middlewares/auth/index.js';
import Empresa from '../modelos/Empresa.js';
import Producto from '../modelos/Producto.js';
import { HTTPError } from '../utils/errores/index.js';

export default class EmpresaControlador {
  /**
   * Obtiene todas las empresas de la base de datos y excluye las contraseñas de los resultados.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<void>}
   */
  static async obtenerTodos(req, res, next) {
    try {
      // Obtiene todas las empresas de la base de datos
      const empresas = await Empresa.obtenerTodos();
      // Excluye la contraseña de cada empresa antes de devolver los resultados
      const infoEmpresas = empresas.map(({ contrasena, ...infoEmpresa }) => infoEmpresa);
      return res.json(infoEmpresas);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene una empresa específica por ID, excluyendo la contraseña de los resultados.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<void>}
   */
  static async obtenerUno(req, res, next) {
    const { id } = req.params; // Extrae el ID de los parámetros de la solicitud

    try {
      const empresa = await Empresa.obtenerUno(id);

      // Si no se encuentra la empresa, lanza un error 404
      if (null == empresa) throw new HTTPError({ mensaje: 'Empresa no encontrada', estado: 404 });

      // Excluye la contraseña antes de devolver la información de la empresa
      const { contrasena, id: idEmpresa, ...infoEmpresa } = empresa;

      return res.json(infoEmpresa);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Crea una nueva empresa con los datos validados.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<void>}
   */
  static async crear(req, res, next) {
    const nuevaEmpresa = req.datosValidados; // Datos validados de la solicitud

    try {
      const empresaCreada = await Empresa.crear(nuevaEmpresa);
      return res.status(201).json(empresaCreada); // Devuelve la empresa creada con estado 201
    } catch (error) {
      next(error);
    }
  }

  /**
   * Actualiza una empresa existente con los datos proporcionados.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<void>}
   */
  static async actualizar(req, res, next) {
    const { id, ...datosActualizacion } = req.datosValidados; // Extrae el ID y los datos de actualización de la solicitud

    try {
      // Verifica si hay datos para actualizar
      if (Object.keys(datosActualizacion).length === 0) {
        throw new HTTPError({ mensaje: 'No se han recibido datos para actualizar', estado: 400 });
      }

      const empresaActualizada = await Empresa.actualizar(id, datosActualizacion);
      return res.json(empresaActualizada); // Devuelve la empresa actualizada
    } catch (error) {
      next(error);
    }
  }

  /**
   * Borra una empresa existente por ID.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<void>}
   */
  static async borrar(req, res, next) {
    const { id } = req.params; // Extrae el ID de los parámetros de la solicitud

    try {
      const empresaBorrada = await Empresa.borrar(id);

      // Si no se encuentra la empresa, lanza un error 404
      if (null == empresaBorrada) throw new HTTPError({ mensaje: 'Empresa no encontrada', estado: 404 });

      return res.json(empresaBorrada); // Devuelve la empresa borrada
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene todos los productos de una empresa específica por ID de empresa.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<void>}
   */
  static async obtenerTodosEmpresa(req, res, next) {
    const { id } = req.params; // Extrae el ID de la empresa de los parámetros de la solicitud

    try {
      const productos = await Empresa.obtenerProductosEmpresa(id);
      return res.json(productos); // Devuelve los productos de la empresa
    } catch (error) {
      next(error);
    }
  }

  /**
   * Inicia sesión para una empresa y crea un token JWT.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<void>}
   */
  static login = crearToken;

  /**
   * Borra un producto específico de una empresa por ID de empresa y ID de producto.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<void>}
   */
  static async borrarProductoEmpresa(req, res, next) {
    const { id, idProducto } = req.params; // Extrae los IDs de la empresa y del producto de los parámetros de la solicitud

    try {
      const resultado = await Empresa.borrarProductoEmpresa(idProducto, id);
      const { estado } = resultado;
      return res.status(estado).json(resultado); // Devuelve el resultado de la operación
    } catch (error) {
      next(error);
    }
  }

  /**
   * Crea un nuevo producto para una empresa específica.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<void>}
   */
  static async nuevoProductoEmpresa(req, res, next) {
    try {
      const { id, ...resto } = req.datosValidados; // Extrae el ID de la empresa y los datos del producto validados

      const nuevoProducto = {
        id_empresa: id, // Asigna el ID de la empresa al nuevo producto
        ...resto,
      };

      const productoCreado = await Producto.crear(nuevoProducto);
      return res.status(201).json(productoCreado); // Devuelve el producto creado con estado 201
    } catch (error) {
      next(error);
    }
  }

  /**
   * Actualiza un producto existente de una empresa específica.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<void>}
   */
  static async editarProductoEmpresa(req, res, next) {
    const { datosValidados } = req;

    try {
      const { id, idProducto, ...nuevosDatos } = datosValidados; // Extrae los IDs y los nuevos datos del producto validados

      // Verifica si hay datos para actualizar
      if (Object.keys(nuevosDatos).length === 0) {
        throw new HTTPError({ mensaje: 'No se han recibido datos para actualizar', estado: 400 });
      }

      const productoActualizado = await Producto.actualizar(idProducto, nuevosDatos);
      return res.json(productoActualizado); // Devuelve el producto actualizado
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene la cantidad total de empresas registradas en la base de datos.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<void>}
   */
  static async obtenerCantidad(req, res, next) {
    try {
      const [resultado] = await Empresa.obtenerCantidad();
      const [cantidad] = Object.values(resultado);
      return res.json(cantidad); // Devuelve la cantidad total de empresas
    } catch (error) {
      next(error);
    }
  }
}
