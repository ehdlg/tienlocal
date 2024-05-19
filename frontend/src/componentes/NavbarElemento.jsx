import { Link } from 'react-router-dom'; // Importa el componente Link de react-router-dom para crear enlaces de navegación
import estilos from '../estilos/Navbar.module.css'; // Importa los estilos CSS Modules específicos para los elementos de la barra de navegación
import NavbarSubelementos from './NavbarSubElementos'; // Importa el componente NavbarSubelementos para renderizar los subelementos del perfil de usuario

// Componente funcional NavbarElemento que representa un elemento de la barra de navegación
function NavbarElemento({ elemento }) {
  const { nombre, url } = elemento; // Extrae el nombre y la URL del elemento de navegación

  // Renderiza el elemento de navegación "Mi cuenta" con sus subelementos
  if (nombre === 'Mi cuenta') {
    return (
      <li className={`${estilos.elementoNav} ${estilos.miPerfil}`} tabIndex={0}>
        {nombre} {/* Renderiza el nombre del elemento */}
        <NavbarSubelementos /> {/* Renderiza los subelementos del perfil de usuario */}
      </li>
    );
  }

  // Renderiza otros elementos de navegación con un enlace
  return (
    <li className={`${estilos.elementoNav}`}>
      {' '}
      {/* Agrega estilos específicos al elemento de navegación */}
      <Link to={url} className={`link`}>
        {' '}
        {/* Crea un enlace utilizando el componente Link de react-router-dom */}
        {nombre} {/* Renderiza el nombre del elemento dentro del enlace */}
      </Link>
    </li>
  );
}

export default NavbarElemento; // Exporta el componente NavbarElemento
