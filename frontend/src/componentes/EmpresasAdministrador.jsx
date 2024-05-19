import { useContext, useEffect, useState } from 'react';
import Tabla from './Tabla';
import { API_URL } from '../constantes';
import { toast } from 'sonner';
import useGetDatos from '../hooks/useGetDatos';
import Loading from './Loading';
import { Contexto } from '../context';

/**
 * Componente para mostrar y administrar las empresas como un administrador.
 */
function EmpresasAdministrador() {
  const { login } = useContext(Contexto);
  const [empresas, setEmpresas] = useState(null);

  // Obtiene los datos de las empresas
  const { datos, loading, error } = useGetDatos('empresas');

  useEffect(() => {
    if (null == datos) return;

    // Actualiza el estado de las empresas cuando se obtienen los datos
    setEmpresas(datos);
  }, [datos]);

  // Función para eliminar una empresa
  function eliminarEmpresa(id) {
    return async function () {
      const URL = `${API_URL}/empresas/${id}`;
      const opcionesFetch = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${login.token}`,
        },
      };
      try {
        // Pregunta al usuario si desea eliminar la empresa
        if (!confirm('¿Deseas eliminar la empresa?')) return;

        // Realiza la solicitud para eliminar la empresa
        const respuesta = await fetch(URL, opcionesFetch);

        // Si hay un error, muestra un mensaje de error
        if (respuesta.status != 200) {
          toast.error('Ocurrió un error al intentar eliminar la empresa');
          return;
        }

        // Muestra un mensaje de éxito y actualiza la lista de empresas
        toast.success('Empresa eliminada');
        setEmpresas((prevEmpresas) => {
          return prevEmpresas.filter((empresa) => empresa.id != id);
        });
      } catch (error) {
        console.error(error);
      }
    };
  }

  // Si hay un error al cargar los datos, muestra un mensaje de error
  if (error) return <h1>Error: {error}</h1>;

  // Mientras se cargan los datos o si no hay datos de empresas, muestra el componente de carga
  if (loading || null == empresas) return <Loading />;

  // Formatea los datos de las empresas para mostrarlos en la tabla
  const empresasMostrar = empresas.map((empresa) => {
    return {
      id: empresa.id,
      nombre: empresa.nombre,
      ubicacion: empresa.ubicacion,
    };
  });

  return <Tabla datos={empresasMostrar} eliminar={eliminarEmpresa}></Tabla>;
}

export default EmpresasAdministrador;
