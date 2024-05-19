// Importa las utilidades necesarias de react-router-dom para la navegación entre componentes basada en la URL
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// Importa el componente Toaster de la librería Sonner para mostrar notificaciones al usuario
import { Toaster } from 'sonner';
// Importa los componentes de la aplicación
import Root from './Root';
import Home from './Home';
import Productos from './Productos';
import DetalleProducto from './DetalleProducto';
import Login from './Login';
import NoEncontrado from './NoEncontrado';
import Registro from './Registro';
import Perfil from './Perfil';
import EditarProducto from './EditarProducto';
import ProductosEmpresa from './ProductosEmpresa';
import EditarPerfil from './EditarPerfil';
import ComprasUsuario from './ComprasUsuario';
import NuevoProducto from './NuevoProducto';
import About from './About';
import Administrador from './Administrador';
import Analiticas from './Analiticas';
import ProductosAdministrador from './ProductosAdministrador';
import UsuariosAdministrador from './UsuariosAdministrador';
import EmpresasAdministrador from './EmpresasAdministrador';
import Compra from './Compra';
import Ayuda from './Ayuda';
// Importa el proveedor de contexto ContextoProvider para proporcionar contexto a la aplicación
import { ContextoProvider } from '../context';

// Crea un enrutador de navegación utilizando createBrowserRouter de react-router-dom
const router = createBrowserRouter([
  {
    // Define las rutas y los componentes correspondientes
    path: '/', // Ruta raíz de la aplicación
    element: <Root />, // Componente principal de la aplicación
    errorElement: <NoEncontrado />, // Componente a renderizar en caso de error
    children: [
      // Define rutas secundarias y sus componentes
      { path: '/', element: <Home /> }, // Ruta para la página de inicio
      { path: '/productos', element: <Productos /> }, // Ruta para la página de productos
      { path: '/productos/:id', element: <DetalleProducto /> }, // Ruta para la página de detalle de producto
      { path: 'productos/:id/editar', element: <EditarProducto /> }, // Ruta para la edición de productos
      { path: '/registro', element: <Registro /> }, // Ruta para la página de registro
      { path: '/login', element: <Login /> }, // Ruta para la página de inicio de sesión
      {
        path: '/perfil', // Ruta para el perfil de usuario
        element: <Perfil />, // Componente principal del perfil
        children: [
          // Define subrutas para el perfil de usuario
          { path: '', element: <EditarPerfil /> }, // Ruta para editar el perfil
          { path: 'contrasena', element: <EditarPerfil /> }, // Ruta para cambiar la contraseña
          { path: 'productos', element: <ProductosEmpresa /> }, // Ruta para gestionar productos de empresa
          { path: 'compras', element: <ComprasUsuario /> }, // Ruta para ver compras del usuario
        ],
      },
      { path: 'productos/nuevo', element: <NuevoProducto /> }, // Ruta para añadir un nuevo producto
      { path: 'sobre-nosotros', element: <About /> }, // Ruta para la página "Acerca de nosotros"
      {
        path: 'admin', // Ruta para la sección de administrador
        element: <Administrador />, // Componente principal de la sección de administrador
        children: [
          // Define subrutas para la sección de administrador
          { path: '', element: <Analiticas /> }, // Ruta para las analíticas del sitio
          { path: 'productos', element: <ProductosAdministrador /> }, // Ruta para gestionar productos
          { path: 'usuarios', element: <UsuariosAdministrador /> }, // Ruta para gestionar usuarios
          { path: 'empresas', element: <EmpresasAdministrador /> }, // Ruta para gestionar empresas
        ],
      },
      { path: 'compra', element: <Compra /> }, // Ruta para la página de compra
      { path: 'ayuda', element: <Ayuda /> }, // Ruta para la página de ayuda
    ],
  },
]);

// Función principal de la aplicación que renderiza el enrutador y otros componentes principales
function App() {
  return (
    // Proveedor de contexto que envuelve toda la aplicación para proporcionar contexto a sus componentes hijos
    <ContextoProvider>
      {/* Componente Toaster que proporciona notificaciones al usuario */}
      <Toaster richColors position={'top-right'} expand />
      {/* Proveedor de enrutador que envuelve toda la aplicación para proporcionar la funcionalidad de enrutamiento */}
      <RouterProvider router={router} />
    </ContextoProvider>
  );
}

// Exporta la función App como componente principal de la aplicación
export default App;
