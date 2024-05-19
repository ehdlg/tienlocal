import estilos from '../estilos/Loading.module.css';

/**
 * Componente que muestra un indicador de carga
 */
function Loading() {
  return (
    <div className={estilos.wrapper}>
      <div className={estilos.spinner}></div>
    </div>
  );
}

export default Loading;
