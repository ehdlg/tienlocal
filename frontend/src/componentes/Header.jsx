import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import estilos from '../estilos/Header.module.css';

function Header() {
  return (
    <header className={estilos.wrapper}>
      <div className={estilos.content}>
        <Link className='link' to={'/'}>
          <span className={estilos.titulo}>Tienlocal</span>
        </Link>
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
