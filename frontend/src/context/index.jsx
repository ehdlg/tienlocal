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

  function cerrarSesion(perfilEliminado = false) {
    setLogin(null);

    localStorage.removeItem('login');

    if (perfilEliminado) return;

    toast.info('Sesión cerrada correctamente');
  }

  const valoresContexto = useMemo(() => {
    return {
      login,
      iniciarSesion,
      cerrarSesion,
      sesionIniciada: null != login,
      esUsuario: null != login && login.rol == 'usuario',
      esEmpresa: null != login && login.rol == 'empresa',
      esAdmin: null != login && login.rol == 'admin',
    };
  }, [login]);

  return <Contexto.Provider value={valoresContexto}>{children}</Contexto.Provider>;
}
