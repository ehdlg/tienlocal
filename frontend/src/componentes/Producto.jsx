import estilos from '../estilos/Producto.module.css';

function Producto({ producto }) {
  return (
    <div className={estilos.wrapper}>
      <div className={estilos.img} />
      <h3>{producto.nombre}</h3>
      <h4>{producto.precio}€</h4>
    </div>
  );
}

export default Producto;
