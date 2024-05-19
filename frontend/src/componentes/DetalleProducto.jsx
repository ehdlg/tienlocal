import useGetDatos from '../hooks/useGetDatos';
import Loading from './Loading';
import { useParams } from 'react-router-dom';
import { TagIcon, BuildingStorefrontIcon, ShoppingCartIcon, CurrencyEuroIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';
import { Contexto } from '../context';
import estilos from '../estilos/DetalleProducto.module.css';

/**
 * Componente para mostrar los detalles de un producto específico.
 * Muestra la imagen, nombre, categoría, empresa, precio y descripción del producto.
 * Permite a los usuarios agregar el producto al carrito si están autenticados.
 */
function DetalleProducto() {
  const { id } = useParams(); // Obtiene el ID del producto de los parámetros de la URL

  const { esUsuario, anadirCarrito } = useContext(Contexto); // Obtiene el contexto de la aplicación

  // Obtiene los datos del producto utilizando el hook personalizado useGetDatos
  const { datos: producto, loading, error } = useGetDatos(`productos/${id}`);

  // Si se está cargando la información, muestra el componente de carga
  if (loading) return <Loading />;

  // Si ocurre un error al cargar los datos del producto, muestra un mensaje de error
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div className={estilos.wrapper}>
      {/* Muestra la imagen del producto */}
      <div className={estilos.imagen}>
        <img src={producto.imagen} alt='' />
      </div>

      {/* Muestra los detalles del producto */}
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
        {/* Si el usuario está autenticado, muestra el botón para agregar el producto al carrito */}
        {esUsuario && (
          <button onClick={anadirCarrito(producto)} className={estilos.boton}>
            <ShoppingCartIcon />
            Añadir al carrito
          </button>
        )}
      </div>

      {/* Muestra la descripción del producto */}
      <div className={estilos.descripcion}>
        <p>{producto.descripcion}</p>
      </div>
    </div>
  );
}

export default DetalleProducto;
