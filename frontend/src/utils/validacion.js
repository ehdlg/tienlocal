import { regexContrasena } from '../constantes';

/**
 * Valida la contraseña y su coincidencia con la repetición de contraseña.
 * @param {string} contrasena - Contraseña a validar.
 * @param {string} repetirContrasena - Repetición de la contraseña.
 * @returns {string[]} Array de mensajes de error. Si está vacío, la contraseña es válida.
 */
export function validarContrasena(contrasena, repetirContrasena) {
  // Array para almacenar mensajes de error.
  const errores = [];

  // Valida si la contraseña cumple con la expresión regular definida.
  if (!contrasena.match(regexContrasena)) {
    errores.push('La contraseña debe contener una minúscula, una mayúscula, un número y mínimo 8 caracteres');
  }

  // Valida si la contraseña coincide con la repetición de contraseña.
  if (contrasena !== repetirContrasena) {
    errores.push('Las contraseñas no coinciden');
  }

  // Devuelve el array de mensajes de error.
  return errores;
}
