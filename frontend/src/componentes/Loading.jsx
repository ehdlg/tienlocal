import estilos from '../estilos/Loading.module.css';

function Loading() {
  return (
    <div className={estilos.wrapper}>
      <div className={estilos.spinner}></div>
    </div>
  );
}

export default Loading;
