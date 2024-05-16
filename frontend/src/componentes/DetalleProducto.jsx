import useGetDatos from '../hooks/useGetDatos';
import Loading from './Loading';
import { useParams } from 'react-router-dom';
import { TagIcon, BuildingStorefrontIcon, ShoppingCartIcon, CurrencyEuroIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';
import { Contexto } from '../context';
import estilos from '../estilos/DetalleProducto.module.css';

function DetalleProducto() {
  const { id } = useParams();

  const { esUsuario, anadirCarrito } = useContext(Contexto);

  const { datos: producto, loading, error } = useGetDatos(`productos/${id}`);

  if (loading) return <Loading />;

  if (error) return <h1>Error: {error}</h1>;

  return (
    <div className={estilos.wrapper}>
      <div className={estilos.imagen}>
        <img src={producto.imagen} alt='' />
      </div>

      <div className={estilos.datos}>
        <h2 className={estilos.nombre}>{producto.nombre}</h2>
        <div className={estilos.info}>
          <TagIcon />
          <h3>{producto.categoria}</h3>
        </div>
        <div className={estilos.info}>
          <BuildingStorefrontIcon />

          <h6>{producto.empresa}</h6>
        </div>
        <div className={estilos.info}>
          <CurrencyEuroIcon />
          <h3>{producto.precio}</h3>
        </div>
        {esUsuario && (
          <button onClick={anadirCarrito(producto)} className={estilos.boton}>
            <ShoppingCartIcon />
            Añadir al carrito
          </button>
        )}
      </div>

      <div className={estilos.descripcion}>
        <p>{producto.descripcion}</p>
      </div>
    </div>
  );
}

export default DetalleProducto;
