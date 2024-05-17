import Compra from '../modelos/Compra.js';
import Empresa from '../modelos/Empresa.js';
import Producto from '../modelos/Producto.js';
import Usuario from '../modelos/Usuario.js';

export default class AdministradorControlador {
  static async obtenerAnaliticas(req, res, next) {
    try {
      const promesaEmpresa = Promise.all([Empresa.obtenerCantidad(), Empresa.obtenerUltimoRegistro()]);
      const promesaUsuario = Promise.all([Usuario.obtenerCantidad(), Usuario.obtenerUltimoRegistro()]);
      const promesaCompra = Promise.all([Compra.obtenerCantidad(), Compra.obtenerUltimoRegistro()]);
      const promesaProducto = Promise.all([Producto.obtenerCantidad(), Producto.obtenerUltimoRegistro()]);

      const [datosEmpresa, datosUsuario, datosCompra, datosProducto] = await Promise.all([
        promesaEmpresa,
        promesaUsuario,
        promesaCompra,
        promesaProducto,
      ]);

      const datos = {
        empresa: {
          cantidad: datosEmpresa[0][0]['COUNT(id)'],
          ultimoRegistro: datosEmpresa[1][0].creado,
        },
        usuario: {
          cantidad: datosUsuario[0][0]['COUNT(id)'],
          ultimoRegistro: datosUsuario[1][0].creado,
        },
        compras: {
          cantidad: datosCompra[0][0]['COUNT(id)'],
          ultimoRegistro: datosCompra[1][0].creado,
        },
        productos: {
          cantidad: datosProducto[0][0]['COUNT(id)'],
          ultimoRegistro: datosProducto[1][0].creado,
        },
      };

      return res.json(datos);
    } catch (error) {
      next(error);
    }
  }
}
