import { matchedData, validationResult, body } from 'express-validator';

/**
 * Middleware de validación que comprueba si hay errores de validación en la solicitud.
 * Si no hay errores, pasa los datos validados a la solicitud para su uso posterior.
 * Si hay errores, devuelve un mensaje de error con los errores de validación.
 */
export function validacion(req, res, next) {
  const errores = validationResult(req);

  // Si no hay errores de validación, continúa con el siguiente middleware
  if (errores.isEmpty()) {
    const datosValidados = matchedData(req); // Obtiene los datos validados de la solicitud
    req.datosValidados = datosValidados; // Asigna los datos validados a la solicitud
    return next();
  }

  // Si hay errores de validación, devuelve un mensaje de error con los errores encontrados
  const errorsMessages = errores.array().map((error) => {
    return error.msg;
  });

  return res.status(422).json({ errores: errorsMessages }); // Devuelve los errores de validación al cliente
}

/**
 * Reglas de validación para el inicio de sesión de un usuario.
 * Estas reglas se aplicarán a los datos recibidos en la solicitud de inicio de sesión.
 */
export const loginReglas = (() => {
  return [
    body('email')
      .exists()
      .withMessage('Debes introducir un email')
      .bail()
      .isEmail()
      .withMessage('El email introducido no es válido'),

    body('contrasena').exists().withMessage('Debes introducir una contraseña'),
  ];
})();
