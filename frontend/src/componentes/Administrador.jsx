import { useContext } from 'react'; // Importa el hook useContext de React
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom'; // Importa varios componentes de react-router-dom
import { Contexto } from '../context'; // Importa el contexto
import estilos from '../estilos/Administrador.module.css'; // Importa los estilos del componente Administrador

function Administrador() {
  const { esAdmin } = useContext(Contexto); // Obtiene el estado de esAdmin del contexto
  const { pathname } = useLocation(); // Obtiene la ruta actual usando useLocation

  const empresasSeleccionado = pathname.includes('empresas'); // Verifica si la ruta incluye 'empresas'
  const usuariosSeleccionado = pathname.includes('usuarios'); // Verifica si la ruta incluye 'usuarios'
  const productosSeleccionado = pathname.includes('productos'); // Verifica si la ruta incluye 'productos'

  if (!esAdmin) {
    // Redirecciona si el usuario no es administrador
    return <Navigate to='/perfil' />; // Redirige a la página de perfil
  }

  return (
    // Renderiza el contenido del componente Administrador
    <>
      {/* Fragmento de React */}
      <h1>Bienvenido a la página de administrador</h1> {/* Título de la página */}
      <div className={estilos.links}>
        {' '}
        {/* Contenedor de los botones */}
        <Link to=''>
          {/* Enlace para las analíticas */}
          <button
            className={estilos.boton}
            data-seleccionado={!empresasSeleccionado && !usuariosSeleccionado && !productosSeleccionado}
          >
            Analíticas {/* Texto del botón */}
          </button>
        </Link>
        <Link to='usuarios'>
          {/* Enlace para ver usuarios */}
          <button className={estilos.boton} data-seleccionado={usuariosSeleccionado}>
            Usuarios {/* Texto del botón */}
          </button>
        </Link>
        <Link to='empresas'>
          {/* Enlace para ver empresas */}
          <button className={estilos.boton} data-seleccionado={empresasSeleccionado}>
            Empresas {/* Texto del botón */}
          </button>
        </Link>
        <Link to='productos'>
          {' '}
          {/* Enlace para ver productos */}
          <button className={estilos.boton} data-seleccionado={productosSeleccionado}>
            Productos {/* Texto del botón */}
          </button>
        </Link>
      </div>
      <Outlet /> {/* Renderiza las rutas secundarias */}
    </>
  );
}

export default Administrador; // Exporta el componente Administrador
