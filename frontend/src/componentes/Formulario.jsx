import estilos from '../estilos/Formulario.module.css'; // Importa los estilos CSS Modules específicos para el componente Formulario

// Componente funcional Formulario que representa un formulario genérico
function Formulario({ manejarFormulario, children, estilo = estilos.formulario }) {
  // Renderiza el formulario con el estilo y la función de manejo de formulario proporcionados
  return (
    <form className={estilo} onSubmit={manejarFormulario}>
      {' '}
      {/* Utiliza el estilo y la función de manejo de formulario proporcionados */}
      {children} {/* Renderiza los elementos hijos del formulario */}
    </form>
  );
}

export default Formulario; // Exporta el componente Formulario
