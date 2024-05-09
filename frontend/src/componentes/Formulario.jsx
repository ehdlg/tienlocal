import estilos from '../estilos/Formulario.module.css';

function Formulario({ manejarFormulario, children }) {
  return (
    <form className={estilos.formulario} onSubmit={manejarFormulario}>
      {children}
    </form>
  );
}

export default Formulario;
