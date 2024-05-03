import { regexContrasena } from '../constantes';

export function validarContrasena(contrasena, repetirContrasena) {
  const errores = [];

  if (!contrasena.match(regexContrasena)) {
    errores.push('La contraseña debe contener una minúscula, una mayúscula, un número y mínimo 8 caracteres');
  }

  if (contrasena !== repetirContrasena) {
    errores.push('Las contraseñas no coinciden');
  }

  return errores;
}
