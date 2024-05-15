import { createContext, useMemo } from 'react';
import useLogin from '../hooks/useLogin';
import useCarrito from '../hooks/useCarrito';

export const Contexto = createContext(null);

export function ContextoProvider({ children }) {
  const { login, iniciarSesion, cerrarSesion } = useLogin();
  const {
    carrito,
    anadirCarrito,
    eliminarProductoCarrito,
    vaciarCarrito,
    verificarProductoEnCarrito,
    mostrarCarrito,
    carritoAbierto,
    modificarCantidadProducto,
  } = useCarrito();

  const valoresContexto = useMemo(() => {
    return {
      login,
      iniciarSesion,
      cerrarSesion,
      sesionIniciada: null != login,
      esUsuario: null != login && login.rol == 'usuario',
      esEmpresa: null != login && login.rol == 'empresa',
      esAdmin: null != login && login.rol == 'admin',
      carrito,
      anadirCarrito,
      eliminarProductoCarrito,
      vaciarCarrito,
      verificarProductoEnCarrito,
      carritoAbierto,
      mostrarCarrito,
      modificarCantidadProducto,
    };
  }, [
    login,
    iniciarSesion,
    cerrarSesion,
    carrito,
    anadirCarrito,
    eliminarProductoCarrito,
    vaciarCarrito,
    verificarProductoEnCarrito,
    carritoAbierto,
    mostrarCarrito,
    modificarCantidadProducto,
  ]);

  return <Contexto.Provider value={valoresContexto}>{children}</Contexto.Provider>;
}
