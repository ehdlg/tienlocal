import Header from './Header';
import Main from './Main';
import Carrito from './Carrito';
import Footer from './Footer';
import { useContext } from 'react';
import { Contexto } from '../context';

/**
 * Componente principal que define la estructura de la aplicación.
 * Renderiza el encabezado, el contenido principal, el pie de página y el carrito si el usuario está autenticado.
 * @returns {JSX.Element} Componente de React que define la estructura de la aplicación.
 */
function Root() {
  const { esUsuario } = useContext(Contexto);

  return (
    <>
      <Header />
      <Main />
      <Footer />
      {esUsuario && <Carrito />}
    </>
  );
}

export default Root;
