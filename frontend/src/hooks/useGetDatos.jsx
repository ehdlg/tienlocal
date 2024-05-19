import { useCallback, useContext, useEffect, useState } from 'react';
import { API_URL, LIMITE_DEFECTO, OFFSET_DEFECTO } from '../constantes';
import { comprobarFiltros } from '../utils/funciones';
import { Contexto } from '../context';

// Hook personalizado para obtener datos de la API de forma genérica
function useGetDatos(recurso, limite = LIMITE_DEFECTO, offset = OFFSET_DEFECTO, filtros) {
  // Estado local para almacenar los datos, errores y el estado de carga
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtenemos el contexto de la aplicación para acceder al estado de inicio de sesión
  const { login } = useContext(Contexto);

  // Construimos la URL de la API con los parámetros proporcionados y los filtros
  let URL = `${API_URL}/${recurso}?limite=${limite}&offset=${offset}`;

  if (comprobarFiltros(filtros)) {
    for (const [filtro, valor] of Object.entries(filtros)) {
      if (null != valor && valor != 0 && valor != 'TODAS') {
        URL += `&${filtro}=${valor}`;
      }
    }
  }

  // Función para obtener los datos de la API
  const obtenerDatos = useCallback(async () => {
    setLoading(true);
    setError(null);

    let opcionesFetch = {
      method: 'GET',
    };

    // Si hay un inicio de sesión, agregamos el token de autorización a las opciones de la solicitud
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

      // Manejo de diferentes estados de respuesta
      if (respuesta.status === 404) return setError('El recurso no existe');
      if (respuesta.status !== 200) return setError('Error al obtener el recurso');

      // Convertimos la respuesta a formato JSON y actualizamos el estado local de los datos
      const datos = await respuesta.json();
      setDatos(datos);
    } catch (error) {
      setError(`Error: ${JSON.stringify(error)}`);
    } finally {
      setLoading(false); // Actualizamos el estado de carga a falso después de obtener los datos
    }
  }, [URL, login]);

  // Efecto para obtener los datos cuando cambian los filtros
  useEffect(() => {
    obtenerDatos();
  }, [obtenerDatos, filtros]);

  // Devolvemos los datos, errores y estado de carga
  return { datos, error, loading };
}

export default useGetDatos;
