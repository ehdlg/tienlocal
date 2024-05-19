import { Link, useLocation } from 'react-router-dom'; // Importa Link y useLocation desde react-router-dom
import { UserIcon, KeyIcon, BuildingStorefrontIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'; // Importa los iconos desde Heroicons
import { useContext } from 'react'; // Importa useContext desde react
import { Contexto } from '../context'; // Importa el contexto
import estilos from '../estilos/Perfil.module.css'; // Importa los estilos del componente Perfil

function AsidePerfil() {
  // Define el componente AsidePerfil
  const { esEmpresa } = useContext(Contexto); // Obtiene el estado esEmpresa del contexto
  const { pathname } = useLocation(); // Obtiene el pathname actual usando useLocation

  const editarContrasena = pathname.includes('contrasena'); // Verifica si se está editando la contraseña
  const productosSeleccionado = pathname.includes('productos'); // Verifica si se ha seleccionado la sección de productos
  const comprasSeleccionado = pathname.includes('compras'); // Verifica si se ha seleccionado la sección de compras

  return (
    // Renderiza el contenido del aside
    <aside className={estilos.aside}>
      {/* Contenedor del aside */}
      <Link
        to={''}
        className={estilos.link}
        data-seleccionado={!editarContrasena && !productosSeleccionado && !comprasSeleccionado}
      >
        <UserIcon /> {/* Icono de usuario */}
        Perfil
      </Link>
      <Link to={'contrasena'} className={estilos.link} data-seleccionado={editarContrasena}>
        <KeyIcon /> {/* Icono de contraseña */}
        Contraseña
      </Link>
      {esEmpresa ? ( // Si es una empresa
        <Link to={'productos'} className={estilos.link} data-seleccionado={productosSeleccionado}>
          <BuildingStorefrontIcon /> {/* Icono de tienda */}
          Mis productos
        </Link>
      ) : (
        // Si es un usuario
        <Link to={'compras'} className={estilos.link} data-seleccionado={comprasSeleccionado}>
          <ShoppingBagIcon /> {/* Icono de bolsa de compras */}
          Mis compras
        </Link>
      )}
    </aside>
  );
}

export default AsidePerfil; // Exporta el componente AsidePerfil
