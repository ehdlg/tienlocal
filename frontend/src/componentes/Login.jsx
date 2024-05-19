import { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { API_URL, LOGIN_INPUTS, TIPOS_USUARIO } from '../constantes';
import { toast } from 'sonner';
import { Contexto } from '../context';
import estilos from '../estilos/Registro.module.css';
import estilosFormulario from '../estilos/Formulario.module.css';
import Formulario from './Formulario';
import Input from './Input';

/**
 * Componente para el inicio de sesión de usuarios.
 */
function Login() {
  const { sesionIniciada, iniciarSesion } = useContext(Contexto);
  const [tipoRegistro, setTipoRegistro] = useState(TIPOS_USUARIO.usuario);

  // Redireccionar al perfil si ya hay una sesión iniciada
  if (sesionIniciada) {
    return <Navigate to='/perfil' />;
  }

  // Función para actualizar el tipo de registro (usuario, empresa, administrador)
  function actualizarTipoRegistro(nuevoTipo) {
    return function () {
      setTipoRegistro(nuevoTipo);
    };
  }

  // Función para manejar el envío del formulario de inicio de sesión
  async function manejarFormulario(e) {
    e.preventDefault();

    const datos = new FormData(e.target);
    const email = datos.get('email');
    const contrasena = datos.get('contrasena');
    const credenciales = { email, contrasena };

    try {
      // Determinar el recurso dependiendo del tipo de registro seleccionado
      const recurso =
        tipoRegistro === TIPOS_USUARIO.usuario
          ? 'usuarios'
          : tipoRegistro === TIPOS_USUARIO.empresa
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

      if (respuesta.status === 422) {
        const { errores } = datos;
        errores.forEach((error) => {
          toast.error(error);
        });
        return;
      }

      if (respuesta.status !== 200) {
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
          {Object.values(TIPOS_USUARIO).map((tipo) => (
            <button
              key={tipo}
              className={estilos.boton}
              onClick={actualizarTipoRegistro(tipo)}
              type='button'
              data-seleccionado={tipoRegistro === tipo}
            >
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </button>
          ))}
        </div>

        {/* Renderizar los campos de entrada para el inicio de sesión */}
        {LOGIN_INPUTS.map((input) => (
          <Input
            key={input.name}
            id={input.name}
            name={input.name}
            textoLabel={input.label}
            type={input.type}
            required={true}
          />
        ))}

        <button type='submit' className={estilosFormulario.boton}>
          Iniciar sesión
        </button>
      </Formulario>
    </>
  );
}

export default Login;
