import { Link } from 'react-router-dom';
import estilos from '../estilos/Producto.module.css';

function Producto({ producto }) {
  return (
    <div className={estilos.wrapper}>
      <Link to={`${producto.id}`}>
        <div className={estilos.img} />
      </Link>
      <Link to={`${producto.id}`}>
        <h3>{producto.nombre}</h3>
      </Link>
      <h4>{producto.precio}€</h4>
    </div>
  );
}

export default Producto;
