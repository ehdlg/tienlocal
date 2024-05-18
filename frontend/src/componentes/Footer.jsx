import { Link } from 'react-router-dom';
import estilos from '../estilos/Footer.module.css'; // Importa los estilos CSS Modules

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={estilos.wrapper}>
      <div className={estilos.logo}>
        <p>
          Descubre y apoya productos locales de alta calidad a través de nuestra plataforma comunitaria dedicada al
          comercio justo y sostenible.
        </p>
      </div>

      <div className={estilos.links}>
        <ul>
          <li>
            <Link to={'sobre-nosotros'}>Sobre nosotros</Link>
          </li>
          <li>
            <Link to={'ayuda'}>Ayuda</Link>
          </li>
        </ul>
      </div>

      <div className={estilos.copyright}>
        <p>{year} TienLocal. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
