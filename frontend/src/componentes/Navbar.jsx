import { ELEMENTOS_NAV } from '../constantes';
import NavbarElemento from './NavbarElemento';
import estilos from '../estilos/Navbar.module.css';

function Navbar() {
  return (
    <nav>
      <ul className={estilos.navbar}>
        {ELEMENTOS_NAV.map((elemento) => {
          return <NavbarElemento elemento={elemento} key={elemento.id} />;
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
