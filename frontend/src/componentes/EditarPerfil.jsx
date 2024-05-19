import { useContext } from 'react';
import { Contexto } from '../context';
import useGetDatos from '../hooks/useGetDatos';
import { useLocation, useNavigate } from 'react-router-dom';
import Formulario from './Formulario';
import Input from './Input';
import Loading from './Loading';
import { toast } from 'sonner';
import { TrashIcon } from '@heroicons/react/24/solid';
import { API_URL, INPUT_EDITAR_CONTRASENA } from '../constantes';
import estilos from '../estilos/Perfil.module.css';

/**
 * Componente para editar el perfil del usuario o empresa.
 * Permite cambiar la contraseña y otros detalles del perfil.
 */
function EditarPerfil() {
  const { login, cerrarSesion } = useContext(Contexto);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Determina si se está editando la contraseña
  const editarContrasena = pathname.includes('contrasena');
  // Determina el subtitulo del formulario
  const subtitulo = editarContrasena ? 'Cambia tu contraseña' : 'Perfil';

  // Función para manejar la edición del perfil
  async function editarPefil(e) {
    e.preventDefault();

    // Obtiene los datos del formulario
    const formulario = new FormData(e.target);
    const datosFormulario = Object.fromEntries(formulario.entries());

    // Construye la URL de la API
    const URL = `${API_URL}/${login.rol}s/${login.id}`;
    // Configura las opciones para la solicitud de actualización
    const opcionesFetch = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${login.token}`,
      },
      body: JSON.stringify(datosFormulario),
    };

    try {
      // Realiza la solicitud de actualización
      const respuesta = await fetch(URL, opcionesFetch);
      const datos = await respuesta.json();

      // Si hay errores de validación, muestra los mensajes de error
      if (respuesta.status == 422) {
        const { errores } = datos;
        errores.forEach((error) => {
          toast.error(error);
        });
        return;
      }

      // Si hay un error inesperado, muestra un mensaje de error
      if (respuesta.status != 200) {
        toast.error('Ha ocurrido un error al intentar actualizar los datos');
        return;
      }

      // Muestra un mensaje de éxito
      toast.success('Tus datos han sido actualizados');
    } catch (error) {
      console.error(error);
    }
  }

  // Función para borrar el perfil del usuario o empresa
  async function borrarPerfil() {
    const URL = `${API_URL}/${login.rol}s/${login.id}`;
    const opcionesFetch = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${login.token}`,
      },
    };

    // Muestra una confirmación antes de borrar el perfil
    if (!confirm('¿Estás seguro de que quieres borrar tu cuenta? Los cambios son irreversibles.')) return;

    try {
      // Realiza la solicitud de eliminación del perfil
      const respuesta = await fetch(URL, opcionesFetch);
      const datos = await respuesta.json();

      // Si hay un error, muestra un mensaje de error
      if (respuesta.status != 200) {
        toast.error(datos);
        return;
      }

      // Muestra un mensaje informativo y cierra la sesión del usuario
      toast.info('Tu cuenta ha sido eliminada');
      cerrarSesion();
      return navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  // Obtiene los datos del perfil del usuario o empresa
  const { datos, loading, error } = useGetDatos(`${login.rol}s/${login.id}`);

  // Si se están cargando los datos, muestra el componente de carga
  if (loading) return <Loading />;

  // Si hay un error al cargar los datos, muestra un mensaje de error
  if (error) return <h1>Error: {error}</h1>;

  // Crea los inputs del formulario para editar el perfil
  const inputsDatos = Object.entries(datos)
    .filter(([clave]) => clave != 'creado')
    .map(([clave, valor]) => {
      return {
        name: clave,
        defaultValue: valor,
        type: 'text',
        required: false,
        label: clave,
      };
    });

  // Determina qué inputs mostrar en el formulario
  const inputs = editarContrasena ? INPUT_EDITAR_CONTRASENA : inputsDatos;

  return (
    <Formulario estilo={estilos.formulario} manejarFormulario={editarPefil}>
      <h2>{subtitulo}</h2>
      {/* Muestra los inputs del formulario */}
      {inputs.map((input) => {
        return (
          <Input
            id={input.name}
            name={input.name}
            textoLabel={input.label}
            type={input.type}
            defaultValue={input.defaultValue}
            key={input.name}
          />
        );
      })}

      {/* Botones para editar o borrar el perfil */}
      <div className={estilos.formularioFooter}>
        <button className={`${estilos.boton} ${estilos.botonEditar}`} type='submit'>
          Editar
        </button>
        <button className={`${estilos.boton} ${estilos.botonEliminar}`} type='button' onClick={borrarPerfil}>
          <TrashIcon />
          Borrar cuenta
        </button>
      </div>
    </Formulario>
  );
}

export default EditarPerfil;
