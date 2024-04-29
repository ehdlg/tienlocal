import { useCallback, useEffect, useState } from 'react';
import { API_URL, LIMITE_DEFECTO, OFFSET_DEFECTO } from '../constantes';
import { comprobarFiltros } from '../utils/funciones';

function useGetDatos(recurso, limite = LIMITE_DEFECTO, offset = OFFSET_DEFECTO, filtros) {
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  let URL = `${API_URL}/${recurso}?limite=${limite}&offset=${offset}`;

  if (comprobarFiltros(filtros)) {
    for (const [filtro, valor] of Object.entries(filtros)) {
      if (null != valor && valor != 0 && valor != 'TODAS') {
        URL += `&${filtro}=${valor}`;
      }
    }
  }

  const obtenerDatos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const respuesta = await fetch(URL);

      if (respuesta.status !== 200) return setError('Error al obtener el recurso');

      const datos = await respuesta.json();

      setDatos(datos);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [URL]);

  useEffect(() => {
    obtenerDatos();
  }, [obtenerDatos, filtros]);

  return { datos, error, loading };
}

export default useGetDatos;
