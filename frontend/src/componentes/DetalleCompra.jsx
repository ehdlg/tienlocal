import { useContext } from 'react';
import { Contexto } from '../context';
import useGetDatos from '../hooks/useGetDatos';
import estilos from '../estilos/Perfil.module.css';

/**
 * Componente para mostrar los detalles de una compra específica.
 * Muestra los productos comprados, la cantidad, el precio unitario y el total por producto.
 * Calcula y muestra el total de la compra.
 * @param {string} idCompra - El ID de la compra de la que se desean ver los detalles.
 */
function DetalleCompra({ idCompra }) {
  const { login } = useContext(Contexto);

  // Obtiene los datos de los detalles de la compra
  const { datos: detalleCompra, loading, error } = useGetDatos(`usuarios/${login.id}/compras/${idCompra}`);

  // Si se está cargando la información, no se muestra nada
  if (loading) return null;

  // Si ocurre un error al cargar los detalles de la compra, se muestra un mensaje de error
  if (error) return <h1>Error: {error}</h1>;

  // Variable para almacenar el total de la compra
  let totalCompra = 0;

  return (
    <div className={estilos.tabla}>
      <div className={estilos.encabezadoTabla}>
        <span>Producto</span>
        <span>Cantidad</span>
        <span>Precio unitario</span>
        <span>Total del producto</span>
      </div>
      {/* Mapea los detalles de la compra y muestra la información de cada producto */}
      {detalleCompra.map((detalle, index) => {
        // Calcula el total por producto
        totalCompra += parseFloat(detalle['total_producto']);

        return (
          <div key={index} className={estilos.filaTabla}>
            <span>{detalle.nombre}</span>
            <span>x{detalle.cantidad}</span>
            <span>{detalle.precio_unitario}€</span>
            <span>{detalle.total_producto}€</span>
          </div>
        );
      })}
      {/* Muestra el total de la compra */}
      <div className={estilos.totalCompra}>Total: {totalCompra}€</div>
    </div>
  );
}

export default DetalleCompra;
