import { useCallback, useEffect, useState } from 'react';
import { API_URL, LIMITE_PRODUCTOS } from '../constantes';

function useGetProductos(limite = LIMITE_PRODUCTOS, offset = 0) {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const URL = `${API_URL}/productos?limite=${limite}&offset=${offset}`;

  const obtenerProductos = useCallback(async (URL) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(URL);

      if (response.status !== 200) {
        setError('No se ha podido establecer la conexión con la base de datos.');
      }

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      setError('No se ha podido establecer conexión con la base de datos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    obtenerProductos(URL);
  }, [URL, obtenerProductos, limite, offset]);

  return { products, error, loading };
}

export default useGetProductos;
