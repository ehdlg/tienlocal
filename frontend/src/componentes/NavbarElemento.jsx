import { Link } from 'react-router-dom';
import estilos from '../estilos/Navbar.module.css';

function NavbarElemento({ elemento }) {
  const { nombre, url, activo } = elemento;

  return (
    <Link to={url} className={`link ${estilos.elementoNav}`}>
      {nombre}
    </Link>
  );
}

export default NavbarElemento;
