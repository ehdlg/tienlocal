import Header from './Header';
import Main from './Main';
import Carrito from './Carrito';
import Footer from './Footer';
import { useContext } from 'react';
import { Contexto } from '../context';

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
