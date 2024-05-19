import estilosFormulario from '../estilos/Formulario.module.css'; // Importa los estilos CSS Modules específicos para el componente Input

// Componente funcional Input que representa un campo de entrada en un formulario
function Input({
  textoLabel, // Texto del label asociado al campo de entrada
  id, // ID único del campo de entrada
  type, // Tipo de campo de entrada (text, password, email, etc.)
  step, // Incremento numérico válido para el campo de entrada
  name, // Nombre del campo de entrada
  defaultValue = '', // Valor predeterminado del campo de entrada
  required = false, // Indicador de si el campo de entrada es obligatorio
  min = undefined, // Valor mínimo permitido para el campo de entrada (solo para campos numéricos)
  max = undefined, // Valor máximo permitido para el campo de entrada (solo para campos numéricos)
}) {
  // Determina los estilos del campo de entrada según el tipo de campo
  const estilosInput =
    type === 'text' || type === 'password' || type === 'email'
      ? estilosFormulario.inputText // Estilos para campos de texto, contraseña y email
      : estilosFormulario.inputNumber; // Estilos para campos numéricos

  return (
    <label htmlFor={id} key={id} className={estilosFormulario.label}>
      {/* Renderiza el label asociado al campo de entrada con los estilos proporcionados */}
      {textoLabel} {/* Renderiza el texto del label */}
      <input
        className={estilosInput} // Aplica los estilos al campo de entrada
        type={type} // Define el tipo de campo de entrada
        name={name} // Define el nombre del campo de entrada
        defaultValue={defaultValue} // Define el valor predeterminado del campo de entrada
        id={id} // Define el ID único del campo de entrada
        key={name} // Clave única para el campo de entrada
        required={required} // Indica si el campo de entrada es obligatorio
        min={min} // Define el valor mínimo permitido (solo para campos numéricos)
        max={max} // Define el valor máximo permitido (solo para campos numéricos)
        step={step} // Define el incremento numérico válido para el campo de entrada
      />
    </label>
  );
}

export default Input; // Exporta el componente Input
