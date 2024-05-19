import { useContext, useState } from 'react';
import { Contexto } from '../context';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import useGetDatos from '../hooks/useGetDatos';
import DetalleCompra from './DetalleCompra';
import Loading from './Loading';
import { formatearFecha } from '../utils/funciones';
import { BarsArrowDownIcon, BarsArrowUpIcon } from '@heroicons/react/24/outline';
import estilos from '../estilos/Perfil.module.css';

/**
 * Componente para mostrar las compras realizadas por un usuario.
 * Permite al usuario ver el historial de sus compras, con la posibilidad de expandir y ver los detalles de cada compra.
 */
function ComprasUsuario() {
  const { login, esUsuario, sesionIniciada } = useContext(Contexto);
  const [detallesAbiertos, setDetallesAbiertos] = useState({});

  // Función para mostrar u ocultar los detalles de una compra
  function mostrarDetalles(idCompra) {
    return function () {
      setDetallesAbiertos((prevDetallesAbiertos) => ({
        ...prevDetallesAbiertos,
        [idCompra]: !prevDetallesAbiertos[idCompra],
      }));
    };
  }

  // Redirige al perfil si no hay sesión iniciada o el usuario no está registrado
  if (!sesionIniciada || !esUsuario) {
    toast.info('No eres un usuario de la página para acceder a esta sección');
    return <Navigate to={'/perfil'} />;
  }

  // Obtiene los datos de las compras del usuario
  const { datos: compras, loading, error } = useGetDatos(`usuarios/${login.id}/compras`);

  // Muestra un spinner de carga mientras se cargan los datos
  if (loading) return <Loading />;

  // Muestra un mensaje de error si ocurrió un error al cargar los datos
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div className={estilos.wrapperCompra}>
      <h2 className={estilos.subtitulo}>Tus compras</h2>
      {/* Mapea las compras y muestra los detalles de cada una */}
      {compras.map((compra) => {
        const detalleAbierto = detallesAbiertos[compra.id];
        const estilosCompra = detalleAbierto ? `${estilos.abierto} ${estilos.compra}` : estilos.compra;

        // Icono para mostrar u ocultar los detalles de la compra
        const Icono = () =>
          !detalleAbierto ? (
            <BarsArrowDownIcon onClick={mostrarDetalles(compra.id)} />
          ) : (
            <BarsArrowUpIcon onClick={mostrarDetalles(compra.id)} />
          );

        return (
          <div key={compra.id} className={estilosCompra}>
            <div className={estilos.fechaCompra}>
              <h3>{formatearFecha(compra.fecha)}</h3>
              <Icono />
            </div>

            {/* Muestra los detalles de la compra si está abierta */}
            {detalleAbierto && <DetalleCompra idCompra={compra.id} />}
          </div>
        );
      })}
    </div>
  );
}

export default ComprasUsuario;
