import { body, param } from 'express-validator';
import { comprobarEmail, comprobarContrasenaRepetida, comprobarNuevaContrasenaUsuario } from './utils.js';
import { regexContrasena } from './constantes.js';

// Reglas de validación para la creación de un usuario
export const crearUsuarioReglas = (() => {
  return [
    body('nombre')
      .exists()
      .withMessage('Debes enviar el campo nombre')
      .notEmpty()
      .withMessage('El campo de nombre no puede estar vacío')
      .isLength({ min: 2, max: 150 })
      .withMessage('El nombre debe tener una longitud de entre 2 y 150 caracteres'),

    body('apellidos')
      .exists()
      .withMessage('Debes enviar el campo apellidos')
      .notEmpty()
      .withMessage('El campo de apellidos no puede estar vacío')
      .isLength({ min: 2, max: 300 })
      .withMessage('Los apellidos no pueden ocupar más de 300 caracteres'),

    body('email').exists().isEmail().withMessage('El correo introducido no es válido').custom(comprobarEmail),

    body('contrasena')
      .exists()
      .withMessage('Debes enviar el campo contraseña')
      .matches(regexContrasena)
      .withMessage(
        `La contraseña debe contener una minúscula, 
        una mayúscula, un número y mínimo 8 caracteres`
      )
      .custom(comprobarContrasenaRepetida),
  ];
})();

// Reglas de validación para la actualización de un usuario
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

    body('email').optional().isEmail().withMessage('El correo introducido no es válido').custom(comprobarEmail),

    body('contrasena')
      .optional()
      .matches(regexContrasena)
      .withMessage(
        `La contraseña debe contener una minúscula, 
      una mayúscula, un número y mínimo 8 caracteres`
      )
      .bail()
      .custom(comprobarContrasenaRepetida)
      .bail()
      .custom(comprobarNuevaContrasenaUsuario), // Comprueba si la contraseña es nueva
  ];
})();
