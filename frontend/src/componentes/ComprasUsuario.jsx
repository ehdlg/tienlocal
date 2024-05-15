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

function ComprasUsuario() {
  const { login, esUsuario, sesionIniciada } = useContext(Contexto);
  const [detallesAbiertos, setDetallesAbiertos] = useState({});

  function mostrarDetalles(idCompra) {
    return function () {
      setDetallesAbiertos((prevDetallesAbiertos) => ({
        ...prevDetallesAbiertos,
        [idCompra]: !prevDetallesAbiertos[idCompra],
      }));
    };
  }

  if (!sesionIniciada || !esUsuario) {
    toast.info('No eres un usuario de la página para acceder a esta sección');

    return <Navigate to={'/perfil'} />;
  }

  const { datos: compras, loading, error } = useGetDatos(`usuarios/${login.id}/compras`);

  if (loading) return <Loading />;

  if (error) return <h1>Error: {error}</h1>;

  return (
    <>
      <div className={estilos.wrapperCompra}>
        <h2 className={estilos.subtitulo}>Tus compras</h2>
        {compras.map((compra) => {
          const detalleAbierto = detallesAbiertos[compra.id];
          const estilosCompra = detalleAbierto ? `${estilos.abierto} ${estilos.compra}` : estilos.compra;

          const Icono = () =>
            !detalleAbierto ? (
              <BarsArrowDownIcon onClick={mostrarDetalles(compra.id)} />
            ) : (
              <BarsArrowUpIcon onClick={mostrarDetalles(compra.id)} />
            );
          return (
            <div key={compra.id} className={`${estilosCompra}`}>
              <div className={estilos.fechaCompra}>
                <h3>{formatearFecha(compra.fecha)}</h3>
                <Icono />
              </div>

              {detalleAbierto && <DetalleCompra idCompra={compra.id} />}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ComprasUsuario;
