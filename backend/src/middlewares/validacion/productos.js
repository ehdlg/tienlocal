import { body, param } from 'express-validator';
import Empresa from '../../modelos/Empresa.js';
import Categoria from '../../modelos/Categoria.js';

async function existeEmpresa(id) {
  try {
    const empresa = await Empresa.obtenerUno(id);

    console.log(empresa);

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
      .withMessage('El nombre de producto es obligatorio')
      .isLength({ min: 1, max: 100 })
      .withMessage('El nombre de producto no debe ser mayor a 100 caracteres.'),
    body('descripcion').optional(),

    body('precio').isFloat({ min: 0.01 }).withMessage('El precio debe ser mayor a 0'),

    body('stock').isInt({ min: 0 }).withMessage('El stock debe ser mayor o igual a 0'),

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
