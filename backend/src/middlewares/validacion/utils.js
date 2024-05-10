import Usuario from '../../modelos/Usuario.js';
import Empresa from '../../modelos/Empresa.js';
import bcrypt from 'bcrypt';

export async function comprobarEmail(email, { req }) {
  if (null != req.tokenVerificado && null != req.tokenVerificado.email && email == req.tokenVerificado.email)
    return true;

  try {
    const usuarioEmail = await Usuario.obtenerValor('email', email);

    const empresaEmail = await Empresa.obtenerValor('email', email);

    const emailExiste = null != usuarioEmail || null != empresaEmail;

    if (emailExiste) throw new Error('El email ya existe');
  } catch (error) {
    throw error;
  }
}

export async function comprobarNombreEmpresa(nombre) {
  try {
    const nombreEmpresa = await Empresa.obtenerValor('nombre', nombre);

    if (null != nombreEmpresa) throw new Error('El nombre de la empresa ya está registrado');
  } catch (error) {
    throw error;
  }
}

export async function comprobarContrasenaRepetida(contrasena, { req }) {
  try {
    const { repetirContrasena } = req.body;

    if (null == repetirContrasena || repetirContrasena == '')
      throw new Error('Debes enviar la confirmación de la contraseña');

    if (contrasena != repetirContrasena) throw new Error('Las contraseñas no coinciden');
  } catch (error) {
    throw error;
  }
}

export async function comprobarNuevaContrasenaUsuario(nuevaContrasena, { req }) {
  const { contrasenaActual } = req.body;
  const { id } = req.params;

  if (null == contrasenaActual || contrasenaActual == '') throw new Error('Debes enviar la contraseña actual');

  const usuario = await Usuario.obtenerUno(id);

  if (null == usuario) throw new Error('El usuario no existe');

  const contrasenaCorrecta = await bcrypt.compare(contrasenaActual, usuario.contrasena);

  if (!contrasenaCorrecta) throw new Error('La contraseña actual no es correcta');

  if (contrasenaActual == nuevaContrasena)
    throw new Error('La nueva contraseña es la misma que la anterior contraseña');
}

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

    if (contrasenaActual == nuevaContrasena)
      throw new Error('La nueva contraseña es la misma que la anterior contraseña');
  } catch (error) {
    throw error;
  }
}
