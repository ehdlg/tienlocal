import { useContext } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { Contexto } from '../context';
import estilos from '../estilos/Administrador.module.css';

function Administrador() {
  const { esAdmin } = useContext(Contexto);
  const { pathname } = useLocation();

  const empresasSeleccionado = pathname.includes('empresas');
  const usuariosSeleccionado = pathname.includes('usuarios');
  const productosSeleccionado = pathname.includes('productos');

  if (!esAdmin) {
    return <Navigate to='/perfil' />;
  }

  return (
    <>
      <h1>Bienvenido a la página de administrador</h1>
      <div className={estilos.links}>
        <Link to=''>
          <button
            className={estilos.boton}
            data-seleccionado={!empresasSeleccionado && !usuariosSeleccionado && !productosSeleccionado}
          >
            Analíticas
          </button>
        </Link>
        <Link to='usuarios'>
          <button className={estilos.boton} data-seleccionado={usuariosSeleccionado}>
            Usuarios
          </button>
        </Link>
        <Link to='empresas'>
          <button className={estilos.boton} data-seleccionado={empresasSeleccionado}>
            Empresas
          </button>
        </Link>
        <Link to='productos'>
          <button className={estilos.boton} data-seleccionado={productosSeleccionado}>
            Productos
          </button>
        </Link>
      </div>
      <Outlet />
    </>
  );
}

export default Administrador;
