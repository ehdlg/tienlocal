import { body, param } from 'express-validator';
import Usuario from '../../modelos/Usuario.js';

async function comprobarEmail(email) {
  try {
    const emailExiste = await Usuario.obtenerValor('email', email);

    if (null != emailExiste) throw new Error('El email ya existe.');
  } catch (error) {
    throw error;
  }
}

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
      .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/)
      .withMessage(
        `La contraseña debe contener una minúscula, 
        una mayúscula, un número y mínimo 8 caracteres`
      ),
  ];
})();
