import { Link } from 'react-router-dom'; // Importa el componente Link de react-router-dom para crear enlaces de navegación
import Navbar from './Navbar'; // Importa el componente Navbar
import estilos from '../estilos/Header.module.css'; // Importa los estilos CSS Modules específicos para el componente Header

// Componente funcional Header que representa la cabecera de la aplicación
function Header() {
  return (
    <header className={estilos.wrapper}>
      {' '}
      {/* Define el contenedor principal de la cabecera con el estilo proporcionado */}
      <div className={estilos.content}>
        {' '}
        {/* Define el contenido de la cabecera con el estilo proporcionado */}
        {/* Enlace que lleva a la página de inicio */}
        <Link className={`link ${estilos.logoTitulo}`} to={'/'}>
          <span className={estilos.titulo}>TienLocal</span> {/* Título de la aplicación */}
          <img src='logo.png' alt='Logo de Tienlocal' className={estilos.logo} /> {/* Logo de la aplicación */}
        </Link>
        {/* Renderiza el componente Navbar que contiene los enlaces de navegación */}
        <Navbar />
      </div>
    </header>
  );
}

export default Header; // Exporta el componente Header
