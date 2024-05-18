import { Link } from 'react-router-dom';
import estilos from '../estilos/Ayuda.module.css';

function Ayuda() {
  return (
    <div className={estilos.wrapper}>
      <h2>¿Cómo funciona TienLocal?</h2>
      <div className={estilos.seccion}>
        <h3>Explora Productos</h3>
        <p>
          En nuestra tienda, puedes ver los productos de diferentes empresas locales. Explora la variedad y encuentra lo
          que necesitas. Puedes ver todos los productos de las diferentes empresas y filtrarlos, así como añadirlos al
          carrito para su compra. Puedes ver los productos{' '}
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
        <p>Si eres usuario, puedes comprar productos y ver tus compras anteriores en tu perfil.</p>
      </div>
      <div className={estilos.seccion}>
        <h3>Empresas</h3>
        <p>
          Si eres empresa, puedes crear productos y ponerlos a la venta. También puedes modificarlos desde la URL{' '}
          <code>/perfil</code>.
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

export default Ayuda;
