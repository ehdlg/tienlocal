import estilosFormulario from '../estilos/Formulario.module.css';

function Input({ textoLabel, id, type, name, defaultValue = '', required = false, min, max }) {
  return (
    <label htmlFor={id} key={id} className={estilosFormulario.label}>
      {textoLabel}
      <input
        className={type == 'text' || type == 'password' || type == 'email' ? estilosFormulario.inputText : ''}
        type={type}
        name={name}
        defaultValue={defaultValue}
        id={id}
        key={name}
        required={required}
        min={type == 'number' && min ? min : ''}
        max={type == 'number' && max ? max : ''}
      />
    </label>
  );
}

export default Input;
