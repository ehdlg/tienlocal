import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
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
import { ContextoProvider } from '../context';
import NuevoProducto from './NuevoProducto';
import About from './About';
import Administrador from './Administrador';
import Analiticas from './Analiticas';
import ProductosAdministrador from './ProductosAdministrador';
import UsuariosAdministrador from './UsuariosAdministrador';
import EmpresasAdministrador from './EmpresasAdministrador';
import Compra from './Compra';
import Ayuda from './Ayuda';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    //TODO make error Component
    errorElement: <NoEncontrado />,
    //TODO add all the components to their respective routes
    children: [
      {
        element: <Home />,
        path: '/',
      },
      {
        element: <Productos />,
        path: '/productos',
      },
      {
        element: <DetalleProducto />,
        path: '/productos/:id',
      },
      {
        element: <EditarProducto />,
        path: 'productos/:id/editar',
      },
      {
        element: <Registro />,
        path: '/registro',
      },
      {
        element: <Login />,
        path: '/login',
      },
      {
        element: <Perfil />,
        path: '/perfil',
        children: [
          {
            path: '',
            element: <EditarPerfil />,
          },
          {
            path: 'contrasena',
            element: <EditarPerfil />,
          },
          {
            path: 'productos',
            element: <ProductosEmpresa />,
          },
          {
            path: 'compras',
            element: <ComprasUsuario />,
          },
        ],
      },
      {
        element: <NuevoProducto />,
        path: 'productos/nuevo',
      },
      {
        element: <About />,
        path: 'sobre-nosotros',
      },
      {
        element: <Administrador />,
        path: 'admin',
        children: [
          {
            path: '',
            element: <Analiticas />,
          },
          {
            path: 'productos',
            element: <ProductosAdministrador />,
          },
          {
            path: 'usuarios',
            element: <UsuariosAdministrador />,
          },
          {
            path: 'empresas',
            element: <EmpresasAdministrador />,
          },
        ],
      },
      {
        path: 'compra',
        element: <Compra />,
      },
      {
        path: 'ayuda',
        element: <Ayuda />,
      },
    ],
  },
]);

function App() {
  return (
    <ContextoProvider>
      <Toaster richColors position={'top-right'} expand />
      <RouterProvider router={router} />
    </ContextoProvider>
  );
}

export default App;
