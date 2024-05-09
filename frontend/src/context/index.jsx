import { createContext, useMemo, useState } from 'react';
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

  const valoresContexto = useMemo(() => {
    return {
      login,
      iniciarSesion,
      cerrarSesion,
      sesionIniciada: login != null,
    };
  }, [login]);

  return <Contexto.Provider value={valoresContexto}>{children}</Contexto.Provider>;
}
