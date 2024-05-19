import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import estilos from '../estilos/Ayuda.module.css'; // Importa los estilos del componente Ayuda

function Ayuda() {
  return (
    // Renderiza el contenido de Ayuda
    <div className={estilos.wrapper}>
      {/* Contenedor principal */}
      <h2>¿Cómo funciona TienLocal?</h2>
      <div className={estilos.seccion}>
        <h3>Explora Productos</h3>
        <p>
          En nuestra tienda, puedes ver los productos de diferentes empresas locales. Explora la variedad y encuentra lo
          que necesitas. Puedes ver todos los productos de las diferentes empresas y filtrarlos, así como añadirlos al
          carrito para su compra si has iniciado sesión como usuario. Puedes ver los productos{' '}
          <Link to={'/productos'} className={estilos.enlace}>
            aquí
          </Link>
        </p>
      </div>
      <div className={estilos.seccion}>
        <h3>Registro</h3>
        <p>
          Puedes registrarte como <strong>usuario</strong> o <strong>empresa</strong>.
        </p>
      </div>
      <div className={estilos.seccion}>
        <h3>Usuarios</h3>
        <p>
          Si eres usuario, puedes añadir productos al carrito, comprarlos, modificar tu perfil y ver tus compras.
        </p>{' '}
      </div>
      <div className={estilos.seccion}>
        <h3>Empresas</h3>
        <p>
          Si eres empresa, puedes crear productos y ponerlos a la venta. También puedes modificarlos desde la página de
          tu perfil.
        </p>
      </div>
      <div className={estilos.seccion}>
        <h3>Administradores</h3>
        <p>
          Si eres administrador, puedes ver estadísticas de la base de datos y editar o borrar registros de usuarios,
          productos o empresas.
        </p>
      </div>
    </div>
  );
}

export default Ayuda; // Exporta el componente Ayuda
