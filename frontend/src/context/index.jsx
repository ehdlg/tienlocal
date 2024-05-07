import { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'sonner';

export const Contexto = createContext(null);

export function ContextoProvider({ children }) {
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

    toast.info('Sesión cerrada correctamente');
  }

  return <Contexto.Provider value={{ login, iniciarSesion, cerrarSesion }}>{children}</Contexto.Provider>;
}
