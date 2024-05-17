import { useContext, useEffect, useState } from 'react';
import Tabla from './Tabla';
import { API_URL } from '../constantes';
import { toast } from 'sonner';
import useGetDatos from '../hooks/useGetDatos';
import Loading from './Loading';
import { Contexto } from '../context';

function EmpresasAdministrador() {
  const { login } = useContext(Contexto);
  const [empresas, setEmpresas] = useState(null);

  const { datos, loading, error } = useGetDatos('empresas');

  useEffect(() => {
    if (null == datos) return;

    setEmpresas(datos);
  }, [datos]);

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
        if (!confirm('¿Deseas eliminar la empresa?')) return;

        const respuesta = await fetch(URL, opcionesFetch);

        if (respuesta.status != 200) {
          toast.error('Ocurrió un error al intentar eliminar la empresa');

          return;
        }

        toast.success('Empreasa eliminada');

        setEmpresas((prevEmpresas) => {
          return prevEmpresas.filter((empresa) => empresa.id != id);
        });
      } catch (error) {
        console.error(error);
      }
    };
  }

  if (error) return <h1>Error: {error}</h1>;

  if (loading || null == empresas) return <Loading />;

  const empresasMostrar = empresas.map((empresa) => {
    return {
      id: empresa.id,
      nombre: empresa.nombre,
      ubicacion: empresa.ubicacion,
    };
  });

  console.log(empresas);
  return <Tabla datos={empresasMostrar} eliminar={eliminarEmpresa}></Tabla>;
}

export default EmpresasAdministrador;
