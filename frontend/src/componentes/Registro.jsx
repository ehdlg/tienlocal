import { useState } from 'react';
import { Link } from 'react-router-dom';
import { validarContrasena } from '../utils/validacion';
import Formulario from './Formulario';
import { API_URL, TIPOS_USUARIO, EMPRESA_INPUTS, USUARIO_INPUTS } from '../constantes';
import { toast } from 'sonner';
import estilos from '../estilos/Registro.module.css';

function Registro() {
  const [tipoRegistro, setTipoRegistro] = useState(TIPOS_USUARIO.usuario);

  function actulizarTipoRegistro(nuevoTipo) {
    return function () {
      setTipoRegistro(nuevoTipo);
    };
  }

  const inputs = tipoRegistro === TIPOS_USUARIO.usuario ? USUARIO_INPUTS : EMPRESA_INPUTS;

  async function crearRegistro(e) {
    e.preventDefault();

    const RECURSO = tipoRegistro === TIPOS_USUARIO.usuario ? '/usuarios' : '/empresas';

    const formulario = new FormData(e.target);
    const datosFormulario = Object.fromEntries(formulario.entries());

    const { repetirContrasena, ...nuevoUsuario } = datosFormulario;

    const erroresContrasena = validarContrasena(nuevoUsuario.contrasena, repetirContrasena);

    if (erroresContrasena.length !== 0) {
      erroresContrasena.forEach((error) => {
        toast.error(error);
      });
      return;
    }

    try {
      const respuesta = await fetch(API_URL + RECURSO, {
        method: 'POST',
        body: JSON.stringify(nuevoUsuario),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (respuesta.status !== 201 && respuesta.status !== 422) return toast.error('Ocurrió un error inesperado');

      const datos = await respuesta.json();

      if (respuesta.status !== 201) {
        const { errores } = datos;

        errores.forEach((error) => {
          toast.error(error);
        });

        return;
      }

      toast.success('Usuario creado correctamente');

      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    } catch (error) {
      toast.error('Ocurrió un error al intentar conectar con la base de datos, intentalo más tarde');
    }
  }
  return (
    <>
      <h2 className={estilos.titulo}>Registro {tipoRegistro}: </h2>
      <span className={estilos.redireccion}>
        O <Link to={'/login'}>inicia sesion</Link>
      </span>
      <Formulario inputs={inputs} manejarFormulario={crearRegistro} textoSubmit={'Registrar'}>
        <div className={estilos.seleccion}>
          <button
            className={estilos.boton}
            onClick={actulizarTipoRegistro(TIPOS_USUARIO.usuario)}
            type='button'
            data-seleccionado={tipoRegistro === TIPOS_USUARIO.usuario}
          >
            Usuario
          </button>

          <button
            className={estilos.boton}
            onClick={actulizarTipoRegistro(TIPOS_USUARIO.empresa)}
            type='button'
            data-seleccionado={tipoRegistro === TIPOS_USUARIO.empresa}
          >
            Empresa
          </button>
        </div>
      </Formulario>
    </>
  );
}

export default Registro;
