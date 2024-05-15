import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function useLogin() {
  const loginGuardado = JSON.parse(localStorage.getItem('login')) ?? null;

  const [login, setLogin] = useState(loginGuardado);

  function iniciarSesion(nuevoToken) {
    const login = {
      ...jwtDecode(nuevoToken),
      token: nuevoToken,
    };

    setLogin(login);

    localStorage.setItem('login', JSON.stringify(login));
  }

  function cerrarSesion() {
    setLogin(null);

    localStorage.removeItem('login');
  }

  return { login, iniciarSesion, cerrarSesion };
}

export default useLogin;
