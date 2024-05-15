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

function EditarPerfil() {
  const { login, cerrarSesion } = useContext(Contexto);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const editarContrasena = pathname.includes('contrasena');
  const subtitulo = editarContrasena ? 'Cambia tu contraseña' : 'Perfil';

  async function editarPefil(e) {
    e.preventDefault();

    const formulario = new FormData(e.target);
    const datosFormulario = Object.fromEntries(formulario.entries());

    const URL = `${API_URL}/${login.rol}s/${login.id}`;
    const opcionesFetch = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${login.token}`,
      },
      body: JSON.stringify(datosFormulario),
    };

    try {
      const respuesta = await fetch(URL, opcionesFetch);

      const datos = await respuesta.json();

      if (respuesta.status == 422) {
        const { errores } = datos;

        errores.forEach((error) => {
          toast.error(error);
        });

        return;
      }

      if (respuesta.status != 200) {
        toast.error('Ha ocurrido un error al intetar actualizar los datos');

        return;
      }

      toast.success('Tus datos han sido actualizados');
    } catch (error) {
      console.error(error);
    }
  }

  async function borrarPerfil() {
    const URL = `${API_URL}/${login.rol}s/${login.id}`;
    const opcionesFetch = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${login.token}`,
      },
    };

    if (!confirm('¿Estás seguro de que quieres borrar tu cuenta? Los cambios son irreversibles.')) return;

    try {
      const respuesta = await fetch(URL, opcionesFetch);

      const datos = await respuesta.json();

      if (respuesta.status != 200) {
        toast.error(datos);

        return;
      }

      toast.info('Tu cuenta ha sido eliminada');

      cerrarSesion();

      return navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  const { datos, loading, error } = useGetDatos(`${login.rol}s/${login.id}`);

  if (loading) return <Loading />;

  if (error) return <h1>Error: {error}</h1>;

  const inputsDatos = Object.entries(datos).map(([clave, valor]) => {
    return {
      name: clave,
      defaultValue: valor,
      type: 'text',
      required: false,
      label: clave,
    };
  });

  const inputs = editarContrasena ? INPUT_EDITAR_CONTRASENA : inputsDatos;

  return (
    <Formulario estilo={estilos.formulario} manejarFormulario={editarPefil}>
      <h2>{subtitulo}</h2>
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
