import { useState, useContext } from 'react';
import Formulario from './Formulario';
import { Link } from 'react-router-dom';
import { API_URL, LOGIN_INPUTS, TIPOS_USUARIO } from '../constantes';
import { toast } from 'sonner';
import { Contexto } from '../context';
import estilos from '../estilos/Registro.module.css';

function Login() {
  const [tipoRegistro, setTipoRegistro] = useState(TIPOS_USUARIO.usuario);

  const { iniciarSesion } = useContext(Contexto);

  function actulizarTipoRegistro(nuevoTipo) {
    return function () {
      setTipoRegistro(nuevoTipo);
    };
  }

  async function manejarFormulario(e) {
    e.preventDefault();

    const datos = new FormData(e.target);

    const email = datos.get('email');
    const contrasena = datos.get('contrasena');

    const credenciales = {
      email,
      contrasena,
    };

    try {
      const recurso =
        tipoRegistro == TIPOS_USUARIO.usuario
          ? 'usuarios'
          : tipoRegistro == TIPOS_USUARIO.empresa
          ? 'empresas'
          : 'administrador';

      const respuesta = await fetch(`${API_URL}/${recurso}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credenciales),
      });

      const datos = await respuesta.json();

      if (respuesta.status == 422) {
        const { errores } = datos;

        errores.forEach((error) => {
          toast.error(error);
        });

        return;
      }

      if (respuesta.status != 200) {
        const { error } = datos;
        toast.error(error);

        return;
      }

      const { token } = datos;

      iniciarSesion(token);

      toast.success('Inicio de sesión correcto. Bienvenido.');

      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h2 className={estilos.titulo}>Inicio de sesión</h2>
      <span className={estilos.redireccion}>
        O <Link to={'/registro'}>regístrate</Link>
      </span>
      <Formulario manejarFormulario={manejarFormulario} inputs={LOGIN_INPUTS} textoSubmit={'Iniciar sesión'}>
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

          <button
            className={estilos.boton}
            onClick={actulizarTipoRegistro(TIPOS_USUARIO.administrador)}
            type='button'
            data-seleccionado={tipoRegistro === TIPOS_USUARIO.administrador}
          >
            Administrador
          </button>
        </div>
      </Formulario>
    </>
  );
}

export default Login;
