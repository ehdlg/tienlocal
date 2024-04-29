import { crearArrayPaginas } from '../utils/funciones';
import estilos from '../estilos/Paginacion.module.css';

function Paginacion({ actualizar, pagina, numeroPaginas }) {
  const mostrarBotonSiguiente = pagina < numeroPaginas;
  const mostrarBotonAnterior = pagina > 1;

  const arrayPaginas = crearArrayPaginas(numeroPaginas);

  return (
    <div className={estilos.wrapper}>
      {
        <button
          onClick={actualizar.anterior}
          style={{ opacity: mostrarBotonAnterior ? 1 : 0 }}
          disabled={!mostrarBotonAnterior}
        >
          Anterior
        </button>
      }
      <div className={estilos.paginas}>
        {arrayPaginas.map((numeroPagina) => {
          const estilo =
            pagina === numeroPagina
              ? `${estilos.pagina} ${estilos.paginaSeleccionada} `
              : `${estilos.pagina} ${estilos.paginaNoSeleccionada} `;

          return (
            <button
              onClick={() => actualizar.ir(numeroPagina)}
              key={numeroPagina}
              className={estilo}
            >
              {numeroPagina}
            </button>
          );
        })}
      </div>
      {
        <button
          onClick={actualizar.siguiente}
          style={{ opacity: mostrarBotonSiguiente ? 1 : 0 }}
          disabled={!mostrarBotonSiguiente}
        >
          Siguiente
        </button>
      }
    </div>
  );
}

export default Paginacion;
