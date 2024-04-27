import { useCallback, useEffect, useState } from 'react';
import { API_URL } from '../constantes';

function useGetCategorias() {
  const [categorias, setCategorias] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const URL = `${API_URL}/categorias`;

  const obtenerCategorias = useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      const respuesta = await fetch(URL);

      if (respuesta.status !== 200) {
        return setError('Error al obtener las categorías de la base de datos');
      }

      const datos = await respuesta.json();

      setCategorias(datos);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    obtenerCategorias();
  }, [obtenerCategorias]);

  return { categorias, error, loading };
}

export default useGetCategorias;
