import Compra from '../modelos/Compra.js';
import Empresa from '../modelos/Empresa.js';
import Producto from '../modelos/Producto.js';
import Usuario from '../modelos/Usuario.js';

export default class AdministradorControlador {
  /**
   * Obtiene las estadísticas y analíticas generales del sistema.
   * Las analíticas incluyen la cantidad y la fecha del último registro para empresas, usuarios, compras y productos.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<void>}
   */
  static async obtenerAnaliticas(req, res, next) {
    try {
      // Crea promesas para obtener la cantidad y el último registro de empresas
      const promesaEmpresa = Promise.all([Empresa.obtenerCantidad(), Empresa.obtenerUltimoRegistro()]);

      // Crea promesas para obtener la cantidad y el último registro de usuarios
      const promesaUsuario = Promise.all([Usuario.obtenerCantidad(), Usuario.obtenerUltimoRegistro()]);

      // Crea promesas para obtener la cantidad y el último registro de compras
      const promesaCompra = Promise.all([Compra.obtenerCantidad(), Compra.obtenerUltimoRegistro()]);

      // Crea promesas para obtener la cantidad y el último registro de productos
      const promesaProducto = Promise.all([Producto.obtenerCantidad(), Producto.obtenerUltimoRegistro()]);

      // Espera a que se resuelvan todas las promesas
      const [datosEmpresa, datosUsuario, datosCompra, datosProducto] = await Promise.all([
        promesaEmpresa,
        promesaUsuario,
        promesaCompra,
        promesaProducto,
      ]);

      // Construye un objeto con los datos obtenidos
      const datos = {
        empresa: {
          cantidad: datosEmpresa[0][0]['COUNT(id)'], // Cantidad de empresas
          ultimoRegistro: datosEmpresa[1][0].creado, // Fecha del último registro de empresa
        },
        usuario: {
          cantidad: datosUsuario[0][0]['COUNT(id)'], // Cantidad de usuarios
          ultimoRegistro: datosUsuario[1][0].creado, // Fecha del último registro de usuario
        },
        compras: {
          cantidad: datosCompra[0][0]['COUNT(id)'], // Cantidad de compras
          ultimoRegistro: datosCompra[1][0].creado, // Fecha de la última compra
        },
        productos: {
          cantidad: datosProducto[0][0]['COUNT(id)'], // Cantidad de productos
          ultimoRegistro: datosProducto[1][0].creado, // Fecha del último registro de producto
        },
      };

      // Devuelve los datos como respuesta JSON
      return res.json(datos);
    } catch (error) {
      next(error); // Pasa el error al siguiente middleware
    }
  }
}
