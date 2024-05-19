import { Link } from 'react-router-dom'; // Importa el componente Link de react-router-dom para la navegación entre páginas
import estilos from '../estilos/Footer.module.css'; // Importa los estilos CSS Modules específicos para el componente Footer

// Componente funcional Footer que representa el pie de página de la aplicación
function Footer() {
  // Obtiene el año actual para mostrar en el pie de página
  const year = new Date().getFullYear();

  // Renderiza el pie de página con información y enlaces importantes
  return (
    <footer className={estilos.wrapper}>
      {/* Contenedor del logo y descripción */}
      <div className={estilos.logo}>
        <p>
          Descubre y apoya productos locales de alta calidad a través de nuestra plataforma comunitaria dedicada al
          comercio justo y sostenible.
        </p>
      </div>

      {/* Contenedor de enlaces */}
      <div className={estilos.links}>
        <ul>
          <li>
            <Link to={'sobre-nosotros'}>Sobre nosotros</Link> {/* Enlace a la página "Sobre nosotros" */}
          </li>
          <li>
            <Link to={'ayuda'}>Ayuda</Link> {/* Enlace a la página "Ayuda" */}
          </li>
        </ul>
      </div>

      {/* Contenedor del texto de derechos de autor */}
      <div className={estilos.copyright}>
        <p>{year} TienLocal. Todos los derechos reservados.</p> {/* Texto con el año actual y derechos de autor */}
      </div>
    </footer>
  );
}

export default Footer; // Exporta el componente Footer
