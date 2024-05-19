import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

// Hook personalizado para gestionar el inicio de sesión del usuario
function useLogin() {
  // Obtenemos el estado de inicio de sesión guardado en el almacenamiento local
  const loginGuardado = JSON.parse(localStorage.getItem('login')) ?? null;

  // Inicializamos el estado local con el estado de inicio de sesión guardado o nulo si no hay ninguno
  const [login, setLogin] = useState(loginGuardado);

  // Función para iniciar sesión con un nuevo token JWT
  function iniciarSesion(nuevoToken) {
    // Decodificamos el token JWT para obtener la información del usuario
    const login = {
      ...jwtDecode(nuevoToken), // Decodificamos el token y agregamos sus datos al estado de inicio de sesión
      token: nuevoToken, // Almacenamos el token JWT en el estado de inicio de sesión
    };

    // Actualizamos el estado de inicio de sesión local
    setLogin(login);

    // Guardamos el estado de inicio de sesión en el almacenamiento local para mantener la sesión activa
    localStorage.setItem('login', JSON.stringify(login));
  }

  // Función para cerrar sesión y limpiar el estado de inicio de sesión
  function cerrarSesion() {
    // Limpiamos el estado de inicio de sesión local
    setLogin(null);

    // Eliminamos el estado de inicio de sesión del almacenamiento local para cerrar la sesión
    localStorage.removeItem('login');
  }

  // Devolvemos el estado de inicio de sesión y las funciones para iniciar y cerrar sesión
  return { login, iniciarSesion, cerrarSesion };
}

export default useLogin;
