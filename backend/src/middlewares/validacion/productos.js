import { body, param } from 'express-validator';
import Producto from '../../modelos/Producto.js';
import Empresa from '../../modelos/Empresa.js';
import Categoria from '../../modelos/Categoria.js';

// Función asincrónica que verifica si existe una empresa con el ID proporcionado
async function existeEmpresa(id) {
  try {
    const empresa = await Empresa.obtenerUno(id);

    if (null == empresa) throw new Error('La empresa no existe.');
  } catch (error) {
    throw error;
  }
}

// Función asincrónica que verifica si existe una categoría con el ID proporcionado
async function existeCategoria(id) {
  try {
    const categoria = await Categoria.obtenerUno(id);

    if (null == categoria) throw new Error('La categoria no existe');
  } catch (error) {
    throw error;
  }
}

// Reglas de validación para la creación de un producto
export const crearProductoReglas = (() => {
  return [
    param('id')
      .exists()
      .withMessage('Introduce el ID de la empresa')
      .isInt()
      .withMessage('El ID de la empresa debe ser un entero'),

    body('nombre')
      .exists()
      .withMessage('Introduce el nombre del producto')
      .isLength({ min: 1, max: 100 })
      .withMessage('El nombre de producto no debe ser mayor a 100 caracteres.'),

    body('descripcion').optional(),

    body('precio')
      .exists()
      .withMessage('Introduce el precio del producto')
      .isFloat({ min: 0.01 })
      .withMessage('El precio debe ser mayor a 0'),

    body('stock')
      .exists()
      .withMessage('Introduce el stock del producto')
      .isInt({ min: 0 })
      .withMessage('El stock debe ser mayor o igual a 0'),

    body('imagen').optional().isURL().withMessage('La imagen debe ser una URL'),

    body('id_categoria')
      .exists()
      .withMessage('Debes indicar el ID de la categoría')
      .notEmpty()
      .withMessage('Debes indicar una categoría')
      .bail()
      .isInt({ min: 1 })
      .withMessage('ID de categoría no válido')
      .custom(existeCategoria), // Verifica si la categoría con el ID proporcionado existe
  ];
})();

// Reglas de validación para la actualización de un producto
export const actualizarProductoReglas = (() => {
  return [
    param('id').exists().isInt().withMessage('El ID de empresa introducido no es válido'),

    param('idProducto')
      .exists()
      .isInt()
      .withMessage('El ID de producto introducido no es válido')
      .custom(async (idProducto, { req }) => {
        const { id } = req.params;
        const { tokenVerificado } = req;

        const producto = await Producto.obtenerUno(idProducto);

        if (null == producto) throw new Error('El producto no existe');

        if (tokenVerificado.rol != 'admin' && producto['id_empresa'] != id)
          throw new Error('El producto que intentas modificar no es de tu empresa');
      }),

    body('nombre')
      .optional()
      .isLength({ min: 1, max: 100 })
      .withMessage('El nombre de producto no debe ser mayor a 100 caracteres.'),

    body('descripcion').optional(),

    body('precio').optional().isFloat({ min: 0.01 }).withMessage('El precio debe ser mayor a 0'),

    body('stock').optional().isInt({ min: 0 }).withMessage('El stock debe ser mayor o igual a 0'),

    body('imagen').optional().isURL().withMessage('La imagen debe ser una URL'),

    body('categoria_id').optional().isInt({ min: 1 }).withMessage('ID de categoría no válido').custom(existeCategoria),
  ];
})();
