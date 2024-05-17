import { body, param } from 'express-validator';
import {
  comprobarContrasenaRepetida,
  comprobarEmail,
  comprobarNombreEmpresa,
  comprobarNuevaContrasenaEmpresa,
} from './utils.js';
import { regexContrasena } from './constantes.js';

/**
 * Reglas de validación para crear una nueva empresa.
 * Estas reglas se aplicarán a los datos recibidos en la solicitud de creación de empresa.
 */
export const crearEmpresaReglas = (() => {
  return [
    body('nombre')
      .exists()
      .withMessage('Introduce el nombre de la empresa')
      .bail()
      .notEmpty()
      .withMessage('El nombre de la empresa no puede estar vacío')
      .isLength({ min: 1, max: 100 })
      .withMessage('El nombre de la empresa no puede ocupar más de 100 caracteres')
      .custom(comprobarNombreEmpresa),

    body('email').exists().withMessage('Introduce un email').bail().isEmail().custom(comprobarEmail),

    body('contrasena')
      .exists()
      .withMessage('Introduce una contraseña')
      .bail()
      .matches(regexContrasena)
      .withMessage(
        `La contraseña debe contener una minúscula, 
        una mayúscula, un número y mínimo 8 caracteres`
      )
      .custom(comprobarContrasenaRepetida),

    body('descripcion')
      .exists()
      .withMessage('Introduce una descripción para la empresa')
      .bail()
      .notEmpty()
      .withMessage('La descripción no puede estar vacía'),

    body('ubicacion')
      .exists()
      .withMessage('Introduce una ubicación para la empresa')
      .bail()
      .notEmpty()
      .withMessage('La ubación no puede estar vacía'),
  ];
})();

/**
 * Reglas de validación para actualizar una empresa existente.
 * Estas reglas se aplicarán a los datos recibidos en la solicitud de actualización de empresa.
 */
export const actualizarEmpresaReglas = (() => {
  return [
    param('id')
      .exists()
      .withMessage('Introduce un ID de empresa')
      .bail()
      .isInt()
      .withMessage('El ID de empresa introducido no es válido'),

    body('nombre')
      .optional()
      .notEmpty()
      .withMessage('El nombre de la empresa no puede estar vacío')
      .bail()
      .isLength({ min: 1, max: 100 })
      .withMessage('El nombre de la empresa no puede ocupar más de 100 caracteres'),

    body('email').optional().isEmail().bail().custom(comprobarEmail),

    body('contrasena')
      .optional()
      .matches(regexContrasena)
      .withMessage(
        `La contraseña debe contener una minúscula, 
        una mayúscula, un número y mínimo 8 caracteres`
      )
      .custom(comprobarContrasenaRepetida)
      .custom(comprobarNuevaContrasenaEmpresa),

    body('descripcion').optional().notEmpty().withMessage('La descripción no puede estar vacía'),

    body('ubicacion').optional().notEmpty().withMessage('Introduce una ubicación para la empresa'),
  ];
})();
