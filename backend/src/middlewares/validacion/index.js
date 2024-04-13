import { validationResult } from 'express-validator';

export function validacion(req, res, next) {
  const errores = validationResult(req);

  if (errores.isEmpty()) return next();

  const errorsMessages = errores.array().map((error) => {
    return error.msg;
  });

  return res.status(422).json({ errores: errorsMessages });
}
