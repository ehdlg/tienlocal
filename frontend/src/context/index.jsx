import { createContext, useMemo } from 'react';
import useLogin from '../hooks/useLogin'; // Importamos el hook personalizado useLogin
import useCarrito from '../hooks/useCarrito'; // Importamos el hook personalizado useCarrito

// Creamos un nuevo contexto utilizando createContext de React
export const Contexto = createContext(null);

// Componente funcional que actúa como proveedor de contexto para la aplicación
export function ContextoProvider({ children }) {
  // Usamos los hooks personalizados para obtener funciones y datos relacionados con el inicio de sesión y el carrito
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

  // Creamos un objeto que contiene todos los valores y funciones que queremos proporcionar a través del contexto
  const valoresContexto = useMemo(() => {
    return {
      login,
      iniciarSesion,
      cerrarSesion,
      sesionIniciada: null != login, // Determina si hay una sesión iniciada
      esUsuario: null != login && login.rol == 'usuario', // Determina si el usuario actual es un usuario regular
      esEmpresa: null != login && login.rol == 'empresa', // Determina si el usuario actual es una empresa
      esAdmin: null != login && login.rol == 'admin', // Determina si el usuario actual es un administrador
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

  // Enviamos los valores del contexto a todos los componentes hijos
  return <Contexto.Provider value={valoresContexto}>{children}</Contexto.Provider>;
}
