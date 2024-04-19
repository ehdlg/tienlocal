import { matchedData, validationResult, body } from 'express-validator';

export function validacion(req, res, next) {
  const errores = validationResult(req);

  if (errores.isEmpty()) {
    const datosValidados = matchedData(req);

    req.datosValidados = datosValidados;

    return next();
  }

  const errorsMessages = errores.array().map((error) => {
    return error.msg;
  });

  return res.status(422).json({ errores: errorsMessages });
}

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
