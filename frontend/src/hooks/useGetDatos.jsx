import { useCallback, useContext, useEffect, useState } from 'react';
import { API_URL, LIMITE_DEFECTO, OFFSET_DEFECTO } from '../constantes';
import { comprobarFiltros } from '../utils/funciones';
import { Contexto } from '../context';

function useGetDatos(recurso, limite = LIMITE_DEFECTO, offset = OFFSET_DEFECTO, filtros) {
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { login } = useContext(Contexto);

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

    let opcionesFetch = {
      method: 'GET',
    };

    if (null != login) {
      opcionesFetch = {
        ...opcionesFetch,
        headers: {
          Authorization: `Bearer ${login.token}`,
        },
      };
    }

    try {
      const respuesta = await fetch(URL, opcionesFetch);

      if (respuesta.status === 404) return setError('El producto no existe');
      if (respuesta.status !== 200) return setError('Error al obtener el recurso');

      const datos = await respuesta.json();

      setDatos(datos);
    } catch (error) {
      setError(`Error: ${JSON.stringify(error)}`);
    } finally {
      setLoading(false);
    }
  }, [URL, login]);

  useEffect(() => {
    obtenerDatos();
  }, [obtenerDatos, filtros]);

  return { datos, error, loading };
}

export default useGetDatos;
