import estilos from '../estilos/Formulario.module.css';

function Formulario({ manejarFormulario, children, estilo = estilos.formulario }) {
  return (
    <form className={estilo} onSubmit={manejarFormulario}>
      {children}
    </form>
  );
}

export default Formulario;
