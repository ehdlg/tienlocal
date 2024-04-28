import { useCallback, useEffect, useState } from 'react';
import { API_URL } from '../constantes';
function useGetEmpresas() {
  const [empresas, setEmpresas] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const obtenerEmpresas = useCallback(async () => {
    const URL = `${API_URL}/empresas`;

    setError(null);
    setLoading(false);

    try {
      const respuesta = await fetch(URL);

      if (respuesta.status !== 200)
        return setError('No se ha podido establecer conexión con la base de datos');

      const datos = await respuesta.json();

      setEmpresas(datos);
    } catch (error) {
      setError('No se ha podido establecer conexión con la base de datos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    obtenerEmpresas();
  }, [obtenerEmpresas]);

  return { empresas, error, loading };
}

export default useGetEmpresas;
