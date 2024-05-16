import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AsidePerfil from './AsidePerfil';
import { Contexto } from '../context';
import estilos from '../estilos/Perfil.module.css';

function Perfil() {
  const { login } = useContext(Contexto);

  if (null == login) {
    return <Navigate to={'/login'} />;
  }

  if (login.rol == 'admin') {
    return <Navigate to={'/admin'} />;
  }

  return (
    <>
      <div className={estilos.wrapper}>
        <AsidePerfil />
        <Outlet />
      </div>
    </>
  );
}

export default Perfil;
