import { useContext } from 'react';
import { Contexto } from '../context';
import { Link } from 'react-router-dom';
import { ELEMENTOS_SUBMENU_LOGEADO, ELEMENTOS_SUBMENU_NO_LOGEADO } from '../constantes';
import estilos from '../estilos/Navbar.module.css';

function NavbarSubelementos() {
  const { sesionIniciada, cerrarSesion } = useContext(Contexto);

  const subelementos = sesionIniciada ? ELEMENTOS_SUBMENU_LOGEADO : ELEMENTOS_SUBMENU_NO_LOGEADO;

  return (
    <ul className={estilos.submenu}>
      {subelementos.map((elemento) => {
        if (elemento.nombre == 'Cerrar sesión') {
          return (
            <li
              key={elemento.id}
              onClick={() => cerrarSesion(false)}
              className={`${estilos.submenuElemento} ${estilos.elementoNav}`}
            >
              {elemento.nombre}
            </li>
          );
        }
        return (
          <li key={elemento.id} className={`${estilos.submenuElemento} ${estilos.elementoNav}`}>
            <Link to={elemento.url}>{elemento.nombre}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export default NavbarSubelementos;
