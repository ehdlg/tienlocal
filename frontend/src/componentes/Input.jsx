import estilosFormulario from '../estilos/Formulario.module.css';

function Input({ textoLabel, id, type, name, defaultValue = '', required = false, min = undefined, max = undefined }) {
  const estilosInput =
    type == 'text' || type == 'password' || type == 'email'
      ? estilosFormulario.inputText
      : estilosFormulario.inputNumber;
  return (
    <label htmlFor={id} key={id} className={estilosFormulario.label}>
      {textoLabel}
      <input
        className={estilosInput}
        type={type}
        name={name}
        defaultValue={defaultValue}
        id={id}
        key={name}
        required={required}
        min={min}
        max={max}
      />
    </label>
  );
}

export default Input;
