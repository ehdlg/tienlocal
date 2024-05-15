import { useContext } from 'react';
import { Contexto } from '../context';
import useGetDatos from '../hooks/useGetDatos';
import estilos from '../estilos/Perfil.module.css';

function DetalleCompra({ idCompra }) {
  const { login } = useContext(Contexto);

  const { datos: detalleCompra, loading, error } = useGetDatos(`usuarios/${login.id}/compras/${idCompra}`);

  if (loading) return null;

  if (error) return <h1>Error: {error}</h1>;

  let totalCompra = 0;

  return (
    <div className={estilos.tabla}>
      <div className={estilos.encabezadoTabla}>
        <span>Producto</span>
        <span>Cantidad</span>
        <span>Precio unitario</span>
        <span>Total del producto</span>
      </div>
      {detalleCompra.map((detalle, index) => {
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
      <div className={estilos.totalCompra}>Total: {totalCompra}€</div>
    </div>
  );
}

export default DetalleCompra;
