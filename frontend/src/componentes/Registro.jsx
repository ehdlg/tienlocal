import { useState, useContext } from 'react'; // Importa los hooks useState y useContext desde React
import { Contexto } from '../context'; // Importa el contexto
import { Link, Navigate } from 'react-router-dom'; // Importa el componente Link y Navigate de React Router
import { validarContrasena } from '../utils/validacion'; // Importa la función validarContrasena desde el archivo de utilidades
import Formulario from './Formulario'; // Importa el componente Formulario
import Input from './Input'; // Importa el componente Input
import { API_URL, TIPOS_USUARIO, EMPRESA_INPUTS, USUARIO_INPUTS } from '../constantes'; // Importa las constantes necesarias
import { toast } from 'sonner'; // Importa la función toast desde la librería sonner
import estilos from '../estilos/Registro.module.css'; // Importa los estilos CSS del registro
import estilosFormulario from '../estilos/Formulario.module.css'; // Importa los estilos CSS del formulario

function Registro() {
  const [tipoRegistro, setTipoRegistro] = useState(TIPOS_USUARIO.usuario); // Estado para el tipo de registro (usuario o empresa)
  const { sesionIniciada } = useContext(Contexto); // Obtiene el estado de inicio de sesión del contexto

  if (sesionIniciada) {
    // Si hay una sesión iniciada, redirige a la página de perfil
    return <Navigate to={'/perfil'} />;
  }

  function actualizarTipoRegistro(nuevoTipo) {
    // Función para actualizar el tipo de registro
    return function () {
      setTipoRegistro(nuevoTipo); // Actualiza el tipo de registro
    };
  }

  const inputs = tipoRegistro === TIPOS_USUARIO.usuario ? USUARIO_INPUTS : EMPRESA_INPUTS; // Determina los inputs según el tipo de registro seleccionado

  async function crearRegistro(e) {
    // Función para crear un nuevo registro
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    const RECURSO = tipoRegistro === TIPOS_USUARIO.usuario ? '/usuarios' : '/empresas'; // Determina el recurso según el tipo de registro

    const formulario = new FormData(e.target); // Obtiene los datos del formulario
    const datosFormulario = Object.fromEntries(formulario.entries()); // Convierte los datos del formulario en un objeto

    const erroresContrasena = validarContrasena(datosFormulario.contrasena, datosFormulario.repetirContrasena); // Valida las contraseñas

    if (erroresContrasena.length !== 0) {
      // Si hay errores en las contraseñas
      erroresContrasena.forEach((error) => {
        // Itera sobre los errores
        toast.error(error); // Muestra un mensaje de error para cada error
      });
      return;
    }

    try {
      const respuesta = await fetch(API_URL + RECURSO, {
        // Realiza la solicitud de registro
        method: 'POST', // Método POST
        body: JSON.stringify(datosFormulario), // Convierte los datos a formato JSON y los envía en el cuerpo de la solicitud
        headers: {
          'Content-Type': 'application/json', // Especifica el tipo de contenido como JSON
        },
      });

      if (respuesta.status !== 201 && respuesta.status !== 422) return toast.error('Ocurrió un error inesperado');

      const datos = await respuesta.json(); // Obtiene los datos de la respuesta

      if (respuesta.status !== 201) {
        // Si no se pudo crear el usuario
        const { errores } = datos; // Obtiene los errores de la respuesta

        errores.forEach((error) => {
          // Itera sobre los errores
          toast.error(error); // Muestra un mensaje de error para cada error
        });

        return;
      }

      toast.success('Usuario creado correctamente'); // Muestra un mensaje de éxito

      setTimeout(() => {
        window.location.href = '/login'; // Redirige al usuario a la página de inicio de sesión después de 1 segundo
      }, 1000);
    } catch (error) {
      toast.error('Ocurrió un error al intentar conectar con la base de datos, intentalo más tarde'); // Muestra un mensaje de error
    }
  }

  return (
    <>
      <h2 className={estilos.titulo}>Registro {tipoRegistro}: </h2> {/* Título del formulario de registro */}
      <span className={estilos.redireccion}>
        O <Link to={'/login'}>inicia sesión</Link> {/* Enlace para iniciar sesión */}
      </span>
      <Formulario manejarFormulario={crearRegistro} textoSubmit={'Registrar'}>
        {/* Renderiza el formulario de registro */}
        <div className={estilos.seleccion}>
          {/* Div para seleccionar el tipo de registro */}
          <button
            className={estilos.boton}
            onClick={actualizarTipoRegistro(TIPOS_USUARIO.usuario)}
            type='button'
            data-seleccionado={tipoRegistro === TIPOS_USUARIO.usuario}
          >
            Usuario
          </button>{' '}
          {/* Botón para seleccionar el registro como usuario */}
          <button
            className={estilos.boton}
            onClick={actualizarTipoRegistro(TIPOS_USUARIO.empresa)}
            type='button'
            data-seleccionado={tipoRegistro === TIPOS_USUARIO.empresa}
          >
            Empresa
          </button>
          {/* Botón para seleccionar el registro como empresa */}
        </div>
        {inputs.map((input) => {
          // Mapea los inputs del formulario
          const inputId = `registro-${input.name}`; // ID del input

          return (
            <Input // Renderiza el componente Input para cada input del formulario
              id={inputId} // Propiedad ID del input
              name={input.name} // Propiedad name del input
              textoLabel={input.label} // Propiedad textoLabel del input
              type={input.type} // Propiedad type del input
              key={inputId} // Propiedad key del input
              required={input.required} // Propiedad required del input
            />
          );
        })}
        <button className={estilosFormulario.boton} type='submit'>
          {/* Botón para enviar el formulario */}
          Registrar
        </button>
      </Formulario>
    </>
  );
}

export default Registro; // Exporta el componente Registro
