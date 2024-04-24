import { useCallback, useEffect, useState } from 'react';
import { API_URL } from '../constantes';

function useGetProducto(id) {
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const obtenerProducto = useCallback(async (id) => {
    const URL = `${API_URL}/productos/${id}`;

    setLoading(true);
    setError(null);

    try {
      const respuesta = await fetch(URL);

      if (respuesta.status !== 200) {
        return setError('Producto no encontrado');
      }

      const datos = await respuesta.json();

      setProducto(datos);
    } catch (error) {
      setError('Hubo un error al conectar con la base de datos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    obtenerProducto(id);
  }, [id, obtenerProducto]);

  return { producto, error, loading };
}

export default useGetProducto;
