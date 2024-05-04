import estilos from '../estilos/Formulario.module.css';

function Formulario({ inputs, manejarFormulario, textoSubmit, children }) {
  return (
    <form className={estilos.formulario} onSubmit={manejarFormulario}>
      {children}
      {inputs.map((input) => {
        const inputId = `registro-${input.name}`;
        return (
          <label htmlFor={inputId} key={inputId} className={estilos.label}>
            {input.label}
            <input
              className={
                input.type == 'text' || input.type == 'password' || input.type == 'email' ? estilos.inputText : ''
              }
              type={input.type}
              name={input.name}
              id={inputId}
              key={input.name}
              required={input.required}
            />
          </label>
        );
      })}

      <button className={estilos.boton} type='submit'>
        {textoSubmit}
      </button>
    </form>
  );
}

export default Formulario;
