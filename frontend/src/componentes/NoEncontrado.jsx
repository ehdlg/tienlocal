import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import estilos from '../estilos/NoEncontrado.module.css';

function NoEncontrado() {
  return (
    <>
      <Header />
      <main className={estilos.wrapper}>
        <h1>Página no encontrada</h1>
        <p className={estilos.mensaje}>Lo sentimos, la página que estás buscando no existe</p>
        <Link to={'/'} className={estilos.redireccion}>
          Ir a la página principal
        </Link>
      </main>
      <Footer />
    </>
  );
}

export default NoEncontrado;
