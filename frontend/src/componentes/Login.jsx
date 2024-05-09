import { useState, useContext } from 'react';
import Formulario from './Formulario';
import Input from './Input';
import { Link, Navigate } from 'react-router-dom';
import { API_URL, LOGIN_INPUTS, TIPOS_USUARIO } from '../constantes';
import { toast } from 'sonner';
import { Contexto } from '../context';
import estilos from '../estilos/Registro.module.css';
import estilosFormulario from '../estilos/Formulario.module.css';

function Login() {
  const { sesionIniciada, iniciarSesion } = useContext(Contexto);

  const [tipoRegistro, setTipoRegistro] = useState(TIPOS_USUARIO.usuario);

  if (sesionIniciada) {
    return <Navigate to='/perfil' />;
  }

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

      return <Navigate to='/perfil' />;
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
      <Formulario manejarFormulario={manejarFormulario}>
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

        {LOGIN_INPUTS.map((input) => {
          return (
            <Input id={input.name} name={input.name} textoLabel={input.label} key={input.name} type={input.type} />
          );
        })}

        <button type='submit' className={estilosFormulario.boton}>
          Iniciar sesión
        </button>
      </Formulario>
    </>
  );
}

export default Login;
