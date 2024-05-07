import { Link } from 'react-router-dom';
import estilos from '../estilos/Navbar.module.css';
import NavbarSubelementos from './NavbarSubElementos';

function NavbarElemento({ elemento }) {
  const { nombre, url } = elemento;

  if (nombre == 'Mi cuenta') {
    return (
      <li className={`${estilos.elementoNav} ${estilos.miPerfil}`} tabIndex={0}>
        {nombre}
        <NavbarSubelementos />
      </li>
    );
  }

  return (
    <li className={`${estilos.elementoNav}`}>
      {' '}
      <Link to={url} className={`link`}>
        {nombre}
      </Link>
    </li>
  );
}

export default NavbarElemento;
