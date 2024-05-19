import Header from './Header'; // Importa el componente Header desde './Header'
import Footer from './Footer'; // Importa el componente Footer desde './Footer'
import { Link } from 'react-router-dom'; // Importa el componente Link de react-router-dom para crear enlaces de navegación
import estilos from '../estilos/NoEncontrado.module.css'; // Importa los estilos CSS Modules específicos para la página de error 404

// Componente funcional NoEncontrado que representa la página de error 404
function NoEncontrado() {
  return (
    <>
      {' '}
      {/* Fragmento para englobar múltiples elementos sin crear un nodo extra en el DOM */}
      <Header /> {/* Renderiza el componente Header */}
      <main className={estilos.wrapper}>
        {' '}
        {/* Renderiza el contenido principal de la página */}
        <h1>Página no encontrada</h1> {/* Título de la página de error */}
        <p className={estilos.mensaje}>Lo sentimos, la página que estás buscando no existe</p> {/* Mensaje de error */}
        <Link to={'/'} className={estilos.redireccion}>
          {' '}
          {/* Renderiza un enlace que redirige a la página principal */}
          Ir a la página principal
        </Link>
      </main>
      <Footer /> {/* Renderiza el componente Footer */}
    </>
  );
}

export default NoEncontrado; // Exporta el componente NoEncontrado
