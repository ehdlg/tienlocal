import { body, param } from 'express-validator';
import { comprobarEmail } from './utils.js';
import { regexContrasena } from './constantes.js';

export const crearUsuarioReglas = (() => {
  return [
    body('nombre')
      .exists()
      .withMessage('Debe incluir un nombre')
      .isLength({ min: 2, max: 150 })
      .withMessage('El nombre debe tener una longitud de entre 2 y 150 caracteres'),

    body('apellidos')
      .exists()
      .isLength({ min: 2, max: 300 })
      .withMessage('Los apellidos no pueden ocupar más de 300 caracteres'),

    body('email')
      .exists()
      .isEmail()
      .withMessage('El correo introducido no es válido')
      .custom(comprobarEmail),

    body('contrasena')
      .matches(regexContrasena)
      .withMessage(
        `La contraseña debe contener una minúscula, 
        una mayúscula, un número y mínimo 8 caracteres`
      ),
  ];
})();

export const actualizarUsuarioReglas = (() => {
  return [
    param('id').exists().isInt().withMessage('El ID no es correcto, debe ser un entero mayor a 0.'),

    body('nombre')
      .optional()
      .isLength({ min: 2, max: 150 })
      .withMessage('El nombre debe tener una longitud de entre 2 y 150 caracteres'),

    body('apellidos')
      .optional()
      .isLength({ min: 2, max: 300 })
      .withMessage('Los apellidos no pueden ocupar más de 300 caracteres'),

    body('email')
      .optional()
      .isEmail()
      .withMessage('El correo introducido no es válido')
      .custom(comprobarEmail),

    body('contrasena')
      .optional()
      .matches(regexContrasena)
      .withMessage(
        `La contraseña debe contener una minúscula, 
      una mayúscula, un número y mínimo 8 caracteres`
      ),
  ];
})();
