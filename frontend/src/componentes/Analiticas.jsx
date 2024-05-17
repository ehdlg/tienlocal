import useGetDatos from '../hooks/useGetDatos';
import { formatearFecha } from '../utils/funciones';
import Loading from './Loading';
import estilos from '../estilos/Perfil.module.css';

function Analiticas() {
  const { datos, loading, error } = useGetDatos('administrador/analiticas');

  if (loading) return <Loading />;

  if (error) return <h1>Error: {error}</h1>;

  return (
    <>
      <h3>Analíticas de la Base de Datos</h3>
      <div className={estilos.tabla}>
        <div className={estilos.encabezadoTabla}>
          <span>Tabla</span>
          <span>Cantidad</span>
          <span>Último Registro</span>
        </div>
        {Object.keys(datos).map((tabla) => (
          <div key={tabla} className={estilos.filaTabla}>
            <span>{tabla}</span>
            <span>{datos[tabla].cantidad}</span>
            <span>{formatearFecha(datos[tabla].ultimoRegistro)}</span>
          </div>
        ))}
      </div>
    </>
  );
}
export default Analiticas;
