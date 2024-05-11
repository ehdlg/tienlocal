import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Contexto } from '../context';
import { toast } from 'sonner';
import useGetDatos from '../hooks/useGetDatos';
import Formulario from './Formulario';
import Input from './Input';
import Loading from './Loading';
import { UserIcon, KeyIcon, TrashIcon } from '@heroicons/react/24/outline';
import { API_URL, INPUT_EDITAR_CONTRASENA, TIPO_EDICION } from '../constantes';
import estilos from '../estilos/Perfil.module.css';

function Perfil() {
  const { login, cerrarSesion } = useContext(Contexto);

  if (null == login) {
    return <Navigate to={'/login'} />;
  }

  if (login.rol == 'admin') {
    return <Navigate to={'/dashboard'} />;
  }

  const [tipoEdicion, setTipoEdicion] = useState(TIPO_EDICION.INFO);
  function manejarTipoEdicion(nuevoTipoEdicion) {
    if (nuevoTipoEdicion == tipoEdicion) return;

    return function () {
      setTipoEdicion(nuevoTipoEdicion);
    };
  }

  const subtitulo = tipoEdicion == TIPO_EDICION.INFO ? 'Perfil' : 'Cambia tu contraseña';

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

        console.log(datos);
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

      cerrarSesion(true);

      return <Navigate to='/' />;
    } catch (error) {
      console.error(error);
    }
  }

  const { datos, loading, error } = useGetDatos(`${login.rol}s/${login.id}`);

  if (loading) return <Loading />;

  if (error) return <h1>Error: {error}</h1>;

  const inputsDatos = Object.entries(datos).map(([key, value]) => {
    return {
      name: key,
      defaultValue: value,
      type: 'text',
      required: false,
      label: key,
    };
  });

  const inputs = tipoEdicion == TIPO_EDICION.INFO ? inputsDatos : INPUT_EDITAR_CONTRASENA;

  return (
    <>
      <div className={estilos.wrapper}>
        <aside className={estilos.aside}>
          <button
            className={estilos.boton}
            onClick={manejarTipoEdicion(TIPO_EDICION.INFO)}
            data-seleccionado={tipoEdicion == TIPO_EDICION.INFO}
          >
            <UserIcon />
            Perfil
          </button>
          <button
            className={estilos.boton}
            onClick={manejarTipoEdicion(TIPO_EDICION.CONTRASENA)}
            data-seleccionado={tipoEdicion == TIPO_EDICION.CONTRASENA}
          >
            <KeyIcon />
            Contraseña
          </button>
        </aside>

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
      </div>
    </>
  );
}

export default Perfil;
