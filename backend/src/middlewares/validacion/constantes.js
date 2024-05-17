/**
 * Expresión regular para validar contraseñas.
 * La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un dígito y tener una longitud mínima de 8 caracteres.
 */
export const regexContrasena = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/;
