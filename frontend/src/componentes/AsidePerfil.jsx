import { Link, useLocation } from 'react-router-dom';
import { UserIcon, KeyIcon, BuildingStorefrontIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useContext } from 'react';
import { Contexto } from '../context';
import estilos from '../estilos/Perfil.module.css';

function AsidePerfil() {
  const { esEmpresa } = useContext(Contexto);
  const { pathname } = useLocation();

  const editarContrasena = pathname.includes('contrasena');
  const productosSeleccionado = pathname.includes('productos');

  return (
    <aside className={estilos.aside}>
      <Link to={''} className={estilos.link} data-seleccionado={!editarContrasena && !productosSeleccionado}>
        <UserIcon />
        Perfil
      </Link>
      <Link to={'contrasena'} className={estilos.link} data-seleccionado={editarContrasena}>
        <KeyIcon />
        Contraseña
      </Link>
      {esEmpresa ? (
        <Link to={'productos'} className={estilos.link} data-seleccionado={productosSeleccionado}>
          <BuildingStorefrontIcon />
          Mis productos
        </Link>
      ) : (
        <Link to={'compras'} className={estilos.link} data-seleccionado={'sojdf'}>
          <ShoppingBagIcon />
          Mis compras
        </Link>
      )}
    </aside>
  );
}

export default AsidePerfil;
