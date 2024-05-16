import { ELEMENTOS_NAV } from '../constantes';
import NavbarElemento from './NavbarElemento';
import estilos from '../estilos/Navbar.module.css';
import { useContext } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Contexto } from '../context';

function Navbar() {
  const { esUsuario, mostrarCarrito } = useContext(Contexto);
  return (
    <nav>
      <ul className={estilos.navbar}>
        {ELEMENTOS_NAV.map((elemento) => {
          return <NavbarElemento elemento={elemento} key={elemento.id} />;
        })}
        {esUsuario && (
          <li className={estilos.carrito} onClick={mostrarCarrito}>
            <ShoppingCartIcon />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
