import { body, param } from 'express-validator';
import Empresa from '../../modelos/Empresa.js';
import Categoria from '../../modelos/Categoria.js';

async function existeEmpresa(id) {
  try {
    const empresa = await Empresa.obtenerUno(id);

    if (null == empresa) throw new Error('La empresa no existe.');
  } catch (error) {
    throw error;
  }
}

async function existeCategoria(id) {
  try {
    const categoria = await Categoria.obtenerUno(id);

    if (null == categoria) throw new Error('La categoria no existe');
  } catch (error) {
    throw error;
  }
}

export const crearProductoReglas = (() => {
  return [
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

    body('empresa_id')
      .exists()
      .withMessage('Debes indicar el ID de la empresa')
      .bail()
      .isInt({ min: 1 })
      .withMessage('ID de empresa no válido')
      .custom(existeEmpresa),

    body('categoria_id')
      .exists()
      .withMessage('Debes indicar el ID de la categoría')
      .bail()
      .isInt({ min: 1 })
      .withMessage('ID de categoría no válido')
      .custom(existeCategoria),
  ];
})();

export const actualizarProductoReglas = (() => {
  return [
    param('id').exists().isInt().withMessage('El ID de producto introducido no es válido'),

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
