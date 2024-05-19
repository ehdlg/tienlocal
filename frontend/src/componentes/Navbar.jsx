import { ELEMENTOS_NAV } from '../constantes'; // Importa los elementos de navegación desde las constantes
import NavbarElemento from './NavbarElemento'; // Importa el componente de elemento de navegación de la barra de navegación
import estilos from '../estilos/Navbar.module.css'; // Importa los estilos CSS Modules específicos para la barra de navegación
import { useContext } from 'react'; // Importa el hook useContext de React para acceder al contexto
import { ShoppingCartIcon } from '@heroicons/react/24/outline'; // Importa el icono del carrito desde HeroIcons
import { Contexto } from '../context'; // Importa el contexto de la aplicación

// Componente funcional Navbar que representa la barra de navegación de la aplicación
function Navbar() {
  const { esUsuario, mostrarCarrito } = useContext(Contexto); // Obtiene el estado del usuario y la función para mostrar el carrito del contexto

  return (
    <nav>
      <ul className={estilos.navbar}>
        {' '}
        {/* Renderiza la lista de elementos de navegación con los estilos proporcionados */}
        {/* Mapea los elementos de navegación y renderiza cada uno utilizando el componente NavbarElemento */}
        {ELEMENTOS_NAV.map((elemento) => {
          return <NavbarElemento elemento={elemento} key={elemento.id} />; // Renderiza el componente NavbarElemento para cada elemento de navegación con una clave única
        })}
        {/* Renderiza el icono del carrito solo si el usuario está autenticado */}
        {esUsuario && (
          <li className={estilos.carrito} onClick={mostrarCarrito}>
            {' '}
            {/* Agrega un evento de clic para mostrar el carrito al hacer clic en el icono */}
            <ShoppingCartIcon /> {/* Renderiza el icono del carrito */}
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar; // Exporta el componente Navbar
