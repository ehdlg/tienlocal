import { crearArrayPaginas } from '../utils/funciones'; // Importa la función crearArrayPaginas desde el archivo funciones.js
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'; // Importa los iconos de flecha izquierda y derecha desde HeroIcons
import estilos from '../estilos/Paginacion.module.css'; // Importa los estilos CSS Modules para la paginación

function Paginacion({ actualizar, pagina, numeroPaginas }) {
  // Determina si debe mostrarse el botón de página siguiente y anterior
  const mostrarBotonSiguiente = pagina < numeroPaginas;
  const mostrarBotonAnterior = pagina > 1;

  // Crea un array de números de página para mostrar
  const arrayPaginas = crearArrayPaginas(numeroPaginas);

  return (
    <div className={estilos.wrapper}>
      {/* Botón de página anterior */}
      {
        <button
          onClick={actualizar.anterior}
          className={estilos.anteriorSiguiente}
          style={{ opacity: mostrarBotonAnterior ? 1 : 0 }}
          disabled={!mostrarBotonAnterior}
        >
          {<ArrowLeftIcon />} Anterior
        </button>
      }

      {/* Contenedor de las páginas */}
      <div className={estilos.paginas}>
        {/* Mapea cada número de página y renderiza un botón para cada uno */}
        {arrayPaginas.map((numeroPagina) => {
          // Determina el estilo del botón de página en función de si está seleccionado o no
          const estilo =
            pagina === numeroPagina
              ? `${estilos.pagina} ${estilos.paginaSeleccionada} `
              : `${estilos.pagina} ${estilos.paginaNoSeleccionada} `;

          return (
            <button onClick={() => actualizar.ir(numeroPagina)} key={numeroPagina} className={estilo}>
              {numeroPagina}
            </button>
          );
        })}
      </div>

      {/* Botón de página siguiente */}
      {
        <button
          onClick={actualizar.siguiente}
          className={estilos.anteriorSiguiente}
          style={{ opacity: mostrarBotonSiguiente ? 1 : 0 }}
          disabled={!mostrarBotonSiguiente}
        >
          Siguiente {<ArrowRightIcon />}
        </button>
      }
    </div>
  );
}

export default Paginacion; // Exporta el componente Paginacion
