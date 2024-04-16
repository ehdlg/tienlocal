import Usuario from '../../modelos/Usuario.js';
import Empresa from '../../modelos/Empresa.js';

export async function comprobarEmail(email) {
  try {
    const usuarioEmail = await Usuario.obtenerValor('email', email);

    const empresaEmail = await Empresa.obtenerValor('email', email);

    const emailExiste = null != usuarioEmail || null != empresaEmail;

    if (emailExiste) throw new Error('El email ya existe.');
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
