import estilosFormulario from '../estilos/Formulario.module.css';

function Input({ textoLabel, id, type, name, defaultValue = '', required = false }) {
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
      />
    </label>
  );
}

export default Input;
