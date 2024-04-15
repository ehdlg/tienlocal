import { matchedData, validationResult } from 'express-validator';

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
