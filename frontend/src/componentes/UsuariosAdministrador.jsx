import { useContext, useEffect, useState } from 'react';
import Tabla from './Tabla';
import { API_URL } from '../constantes';
import { toast } from 'sonner';
import useGetDatos from '../hooks/useGetDatos';
import Loading from './Loading';
import { Contexto } from '../context';

function UsuariosAdministrador() {
  const { login } = useContext(Contexto);
  const [usuarios, setUsuarios] = useState(null);

  const { datos, loading, error } = useGetDatos('usuarios');

  console.log(datos);

  useEffect(() => {
    if (null == datos) return;

    setUsuarios(datos);
  }, [datos]);

  function eliminarUsuario(id) {
    return async function () {
      const URL = `${API_URL}/usuarios/${id}`;
      const opcionesFetch = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${login.token}`,
        },
      };
      try {
        if (!confirm('¿Deseas eliminar el usuario?')) return;

        const respuesta = await fetch(URL, opcionesFetch);

        if (respuesta.status != 200) {
          toast.error('Ocurrió un error al intentar eliminar el usuario');

          return;
        }

        toast.success('Usuario eliminado');

        setUsuarios((prevUsuarios) => {
          return prevUsuarios.filter((usuario) => usuario.id != id);
        });
      } catch (error) {
        console.error(error);
      }
    };
  }

  if (error) return <h1>Error: {error}</h1>;

  if (loading || null == usuarios) return <Loading />;

  const usuariosMostrar = usuarios.map((usuario) => {
    return {
      id: usuario.id,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
    };
  });

  console.log(usuarios);
  return <Tabla datos={usuariosMostrar} eliminar={eliminarUsuario}></Tabla>;
}

export default UsuariosAdministrador;
