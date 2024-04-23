import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { Link, Outlet } from 'react-router-dom';

function Root() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default Root;
