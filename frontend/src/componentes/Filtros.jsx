import useGetDatos from '../hooks/useGetDatos'; // Importa el hook personalizado useGetDatos para obtener datos de la API
import { useState } from 'react'; // Importa el hook useState de React para gestionar el estado local
import Formulario from './Formulario'; // Importa el componente Formulario
import { FILTROS_DEFECTO } from '../constantes'; // Importa los filtros por defecto desde las constantes
import estilos from '../estilos/Filtros.module.css'; // Importa los estilos CSS específicos para el componente Filtros

// Componente funcional Categorias que renderiza un selector de categorías
function Categorias({ categorias, categoriaSeleccionada }) {
  return (
    <div>
      <label htmlFor='filtros-categoria'>Categoría</label>
      <select name='categoria' id='filtros-categorias' defaultValue={categoriaSeleccionada}>
        <option value='0'>Todas</option>
        {categorias.map((categoria) => {
          return (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          );
        })}
      </select>
    </div>
  );
}

// Componente funcional Nombre que renderiza un campo de entrada para el nombre del producto
function Nombre({ valor }) {
  return (
    <div>
      <label htmlFor='nombreProducto'>Nombre del producto: </label>
      <input className={estilos.input} type='text' name='nombre' id='nombreProducto' defaultValue={valor} />
    </div>
  );
}

// Componente funcional Precio que renderiza un rango de precios
function Precio({ filtros, tipoPrecio, precioMaximo }) {
  const [precio, setPrecio] = useState(filtros[tipoPrecio]);

  return (
    <div className={`${estilos.filtrosPrecio} filtros-${tipoPrecio}`}>
      <label htmlFor={`filtro-${tipoPrecio}`}>
        Precio {tipoPrecio === 'precioMinimo' ? 'mínimo' : 'máximo'}: {precio > 0 && <>{precio}€</>}
      </label>
      <input
        type='range'
        name={tipoPrecio}
        id={`filtro-${tipoPrecio}`}
        min={0}
        max={precioMaximo}
        step={1}
        onChange={(e) => setPrecio(Number(e.target.value))}
        defaultValue={precio}
      />
    </div>
  );
}

// Componente funcional Empresas que renderiza un selector de empresas
function Empresas({ empresas, empresaSeleccionada }) {
  return (
    <div className='empresa'>
      <label htmlFor='filtros-empresa'>Empresa</label>
      <select name='empresa' id='filtros-empresa' defaultValue={empresaSeleccionada}>
        <option value='0'>Todas</option>
        {empresas.map((empresa) => {
          return (
            <option key={empresa.id} value={empresa.id}>
              {empresa.nombre}
            </option>
          );
        })}
      </select>
    </div>
  );
}

// Asigna los componentes secundarios al componente Filtros para su uso externo
Filtros.Categorias = Categorias;
Filtros.Nombre = Nombre;
Filtros.Precio = Precio;
Filtros.Empresas = Empresas;

// Componente funcional Filtros que renderiza un formulario con filtros para productos
function Filtros({ filtros, actualizarFiltros }) {
  // Obtiene las categorías de la API utilizando el hook useGetDatos
  const { datos: categorias, error: errorCategoria } = useGetDatos('categorias');

  // Función para reiniciar los filtros a los valores por defecto
  function reiniciarFiltros() {
    actualizarFiltros(FILTROS_DEFECTO);
  }

  // Obtiene las empresas de la API utilizando el hook useGetDatos
  const { datos: empresas, error: errorEmpresa } = useGetDatos('empresas');

  // Obtiene el precio máximo de la API utilizando el hook useGetDatos
  const { datos: precioMaximo } = useGetDatos('/productos/precioMaximo');

  // Función para manejar el envío del formulario y actualizar los filtros
  const manejarFormulario = (e) => {
    e.preventDefault();

    const formulario = new FormData(e.target);
    const datos = formulario.entries();
    let nuevosFiltros = {};

    for (let [campo, valor] of datos) {
      if (campo !== 'nombre') {
        valor = Number(valor);
      }

      nuevosFiltros = { ...nuevosFiltros, [campo]: valor };
    }

    actualizarFiltros(nuevosFiltros);
  };

  // Renderiza un mensaje de error si hay errores al obtener datos de la API
  if (errorCategoria || errorEmpresa) return <h2 style={{ textAlign: 'center' }}>Error</h2>;

  // Renderiza el formulario de filtros con sus respectivos campos
  return (
    <Formulario manejarFormulario={manejarFormulario} estilo={estilos.formulario}>
      <fieldset className={estilos.wrapper}>
        <Filtros.Nombre valor={filtros.nombre} />
        <Filtros.Precio filtros={filtros} tipoPrecio={'precioMinimo'} precioMaximo={precioMaximo ?? 4000} />
        <Filtros.Precio filtros={filtros} tipoPrecio={'precioMaximo'} precioMaximo={precioMaximo ?? 4000} />
        <Filtros.Categorias categorias={categorias ?? []} categoriaSeleccionada={filtros.categoria} />
        <Filtros.Empresas empresas={empresas ?? []} empresaSeleccionada={filtros.empresa} />
      </fieldset>
      <div className={estilos.botonesFormulario}>
        <button type='submit'>Establecer</button>
        <button type='button' onClick={reiniciarFiltros}>
          Reiniciar
        </button>
      </div>
    </Formulario>
  );
}

export default Filtros; // Exporta el componente Filtros
