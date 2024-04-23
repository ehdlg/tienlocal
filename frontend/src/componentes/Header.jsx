import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Tienlocal</h1>
      <nav>
        <ul>
          <Link>Productos</Link>
          <Link>Mi cuenta</Link>
          <Link>Sobre Tienlocal</Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
