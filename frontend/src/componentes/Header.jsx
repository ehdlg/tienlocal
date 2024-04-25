import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import estilos from '../estilos/Header.module.css';

function Header() {
  return (
    <header className={estilos.wrapper}>
      <div className={estilos.content}>
        <Link className={`link ${estilos.logoTitulo}`} to={'/'}>
          <span className={estilos.titulo}>TienLocal</span>
          <img src='logo.png' alt='Logo de Tienlocal' className={estilos.logo} />
        </Link>
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
