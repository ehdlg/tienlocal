import { useContext } from 'react'; // Importa el hook useContext desde React
import { Navigate, Outlet } from 'react-router-dom'; // Importa Navigate y Outlet desde react-router-dom
import AsidePerfil from './AsidePerfil'; // Importa el componente AsidePerfil desde su archivo
import { Contexto } from '../context'; // Importa el contexto desde su archivo
import estilos from '../estilos/Perfil.module.css'; // Importa los estilos CSS Modules para el perfil

function Perfil() {
  const { login } = useContext(Contexto); // Obtiene el estado de inicio de sesión desde el contexto

  // Si no hay un inicio de sesión, redirige al usuario a la página de inicio de sesión
  if (null == login) {
    return <Navigate to={'/login'} />;
  }

  // Si el rol del usuario es admin, redirige al usuario a la página de administrador
  if (login.rol == 'admin') {
    return <Navigate to={'/admin'} />;
  }

  // Renderiza el perfil del usuario
  return (
    <>
      <div className={estilos.wrapper}>
        <AsidePerfil /> {/* Renderiza el componente AsidePerfil */}
        <Outlet /> {/* Renderiza el contenido dinámico de la ruta secundaria */}
      </div>
    </>
  );
}

export default Perfil; // Exporta el componente Perfil
