import { useContext, useEffect, useState } from 'react';
import Tabla from './Tabla';
import { API_URL } from '../constantes';
import { toast } from 'sonner';
import useGetDatos from '../hooks/useGetDatos';
import Loading from './Loading';
import { Contexto } from '../context';

/**
 * Componente UsuariosAdministrador
 *
 * Este componente permite a un administrador ver y eliminar usuarios desde una interfaz de administración.
 * Utiliza diversos hooks de React y funcionalidades de contexto para manejar el estado y las operaciones
 * de eliminación de usuarios.
 */
function UsuariosAdministrador() {
  // Acceso al contexto global para obtener información del usuario logueado
  const { login } = useContext(Contexto);

  // Estado local para almacenar la lista de usuarios
  const [usuarios, setUsuarios] = useState(null);

  // Hook personalizado para obtener los datos de los usuarios desde la API
  const { datos, loading, error } = useGetDatos('usuarios');

  // Efecto que actualiza el estado de los usuarios cuando se obtienen nuevos datos
  useEffect(() => {
    if (null == datos) return;
    setUsuarios(datos);
  }, [datos]);

  /**
   * Función para eliminar un usuario
   * @param {number} id - ID del usuario a eliminar
   * @returns {function} - Función asincrónica que realiza la eliminación del usuario
   */
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

  // Renderizado condicional en caso de error en la obtención de datos
  if (error) return <h1>Error: {error}</h1>;

  // Renderizado condicional mientras los datos están cargando o son nulos
  if (loading || null == usuarios) return <Loading />;

  // Formateo de los datos de los usuarios para mostrarlos en la tabla
  const usuariosMostrar = usuarios.map((usuario) => {
    return {
      id: usuario.id,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
    };
  });

  // Renderizado del componente Tabla con los datos de los usuarios y la función para eliminar usuarios
  return <Tabla datos={usuariosMostrar} eliminar={eliminarUsuario}></Tabla>;
}

// Exportación del componente UsuariosAdministrador
export default UsuariosAdministrador;
