import { useContext } from 'react'; // Importa el hook useContext de React para acceder al contexto
import { Contexto } from '../context'; // Importa el contexto Contexto desde '../context'
import { Link } from 'react-router-dom'; // Importa el componente Link de react-router-dom para crear enlaces de navegación
import { toast } from 'sonner'; // Importa la función toast de sonner para mostrar notificaciones
import { ELEMENTOS_SUBMENU_LOGEADO, ELEMENTOS_SUBMENU_NO_LOGEADO } from '../constantes'; // Importa los elementos de los submenús para usuarios logeados y no logeados desde '../constantes'
import estilos from '../estilos/Navbar.module.css'; // Importa los estilos CSS Modules específicos para el submenú de la barra de navegación

// Componente funcional NavbarSubelementos que representa los subelementos del perfil de usuario en la barra de navegación
function NavbarSubelementos() {
  const { sesionIniciada, cerrarSesion } = useContext(Contexto); // Extrae las variables de contexto sesionIniciada y cerrarSesion

  // Función para cerrar sesión del perfil de usuario
  function cerrarSesionPerfil() {
    cerrarSesion(); // Llama a la función cerrarSesion del contexto para cerrar la sesión del usuario
    toast.info('Sesión cerrada correctamente'); // Muestra una notificación informando que la sesión se ha cerrado correctamente
  }

  // Determina los subelementos a mostrar según si el usuario está logeado o no
  const subelementos = sesionIniciada ? ELEMENTOS_SUBMENU_LOGEADO : ELEMENTOS_SUBMENU_NO_LOGEADO;

  return (
    <ul className={estilos.submenu}>
      {' '}
      {/* Renderiza una lista no ordenada para los subelementos */}
      {subelementos.map((elemento) => {
        // Itera sobre los subelementos y los renderiza
        // Si el elemento es "Cerrar sesión", renderiza un elemento li con la función para cerrar sesión
        if (elemento.nombre === 'Cerrar sesión') {
          return (
            <li
              key={elemento.id}
              onClick={cerrarSesionPerfil}
              className={`${estilos.submenuElemento} ${estilos.elementoNav}`}
            >
              {elemento.nombre}
            </li>
          );
        }
        // Si el elemento es otro, renderiza un elemento li con un enlace a su URL correspondiente
        return (
          <li key={elemento.id} className={`${estilos.submenuElemento} ${estilos.elementoNav}`}>
            <Link to={elemento.url}>{elemento.nombre}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export default NavbarSubelementos; // Exporta el componente NavbarSubelementos
