import Usuario from '../../modelos/Usuario.js';
import Empresa from '../../modelos/Empresa.js';
import bcrypt from 'bcrypt';

/**
 * Verifica si el email proporcionado ya existe en la base de datos de usuarios o empresas.
 *
 * @param {string} email - El email a comprobar.
 * @param {object} param1 - Un objeto con la solicitud (req) incluida.
 * @throws {Error} - Si el email ya existe en la base de datos.
 * @returns {boolean} - Devulve true si el email es el mismo que el verificado en el token.
 */
export async function comprobarEmail(email, { req }) {
  if (null != req.tokenVerificado && null != req.tokenVerificado.email && email == req.tokenVerificado.email) {
    return true;
  }

  try {
    const usuarioEmail = await Usuario.obtenerValor('email', email);
    const empresaEmail = await Empresa.obtenerValor('email', email);
    const emailExiste = null != usuarioEmail || null != empresaEmail;

    if (emailExiste) throw new Error('El email ya existe');
  } catch (error) {
    throw error;
  }
}

/**
 * Verifica si el nombre de la empresa ya está registrado en la base de datos.
 *
 * @param {string} nombre - El nombre de la empresa a comprobar.
 * @throws {Error} - Si el nombre de la empresa ya está registrado.
 */
export async function comprobarNombreEmpresa(nombre) {
  try {
    const nombreEmpresa = await Empresa.obtenerValor('nombre', nombre);

    if (null != nombreEmpresa) throw new Error('El nombre de la empresa ya está registrado');
  } catch (error) {
    throw error;
  }
}

/**
 * Verifica si la contraseña y su repetición son iguales.
 *
 * @param {string} contrasena - La contraseña a comprobar.
 * @param {object} param1 - Un objeto con la solicitud (req) incluida.
 * @throws {Error} - Si la confirmación de la contraseña no se proporciona o no coincide con la contraseña.
 */
export async function comprobarContrasenaRepetida(contrasena, { req }) {
  try {
    const { repetirContrasena } = req.body;

    if (null == repetirContrasena || repetirContrasena == '') {
      throw new Error('Debes enviar la confirmación de la contraseña');
    }

    if (contrasena != repetirContrasena) throw new Error('Las contraseñas no coinciden');
  } catch (error) {
    throw error;
  }
}

/**
 * Verifica si la nueva contraseña proporcionada para un usuario es válida.
 *
 * @param {string} nuevaContrasena - La nueva contraseña a establecer.
 * @param {object} param1 - Un objeto con la solicitud (req) incluida.
 * @throws {Error} - Si la contraseña actual no es correcta, o si la nueva contraseña es la misma que la anterior.
 */
export async function comprobarNuevaContrasenaUsuario(nuevaContrasena, { req }) {
  const { contrasenaActual } = req.body;
  const { id } = req.params;

  if (null == contrasenaActual || contrasenaActual == '') throw new Error('Debes enviar la contraseña actual');

  const usuario = await Usuario.obtenerUno(id);

  if (null == usuario) throw new Error('El usuario no existe');

  const contrasenaCorrecta = await bcrypt.compare(contrasenaActual, usuario.contrasena);

  if (!contrasenaCorrecta) throw new Error('La contraseña actual no es correcta');

  if (contrasenaActual == nuevaContrasena) {
    throw new Error('La nueva contraseña es la misma que la anterior contraseña');
  }
}

/**
 * Verifica si la nueva contraseña proporcionada para una empresa es válida.
 *
 * @param {string} nuevaContrasena - La nueva contraseña a establecer.
 * @param {object} param1 - Un objeto con la solicitud (req) incluida.
 * @throws {Error} - Si la contraseña actual no es correcta, o si la nueva contraseña es la misma que la anterior.
 */
export async function comprobarNuevaContrasenaEmpresa(nuevaContrasena, { req }) {
  try {
    const { contrasenaActual, repetirContrasena } = req.body;
    const { id } = req.params;

    if (null == contrasenaActual || contrasenaActual == '') throw new Error('Debes enviar la contraseña actual');
    if (null == repetirContrasena || repetirContrasena == '')
      throw new Error('Debes enviar la repetición de la nueva contraseña');
    if (repetirContrasena != nuevaContrasena) throw new Error('Las contraseñas no coinciden');

    const empresa = await Empresa.obtenerUno(id);

    if (null == empresa) throw new Error('La empresa no existe');

    const contrasenaCorrecta = await bcrypt.compare(contrasenaActual, empresa.contrasena);

    if (!contrasenaCorrecta) throw new Error('La contraseña actual no es correcta');

    if (contrasenaActual == nuevaContrasena) {
      throw new Error('La nueva contraseña es la misma que la anterior contraseña');
    }
  } catch (error) {
    throw error;
  }
}
