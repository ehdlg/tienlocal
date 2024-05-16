import useGetDatos from '../hooks/useGetDatos';
import { useState } from 'react';
import Formulario from './Formulario';
import { FILTROS_DEFECTO } from '../constantes';
import estilos from '../estilos/Filtros.module.css';

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

function Nombre({ valor }) {
  return (
    <div>
      <label htmlFor='nombreProducto'>Nombre del producto: </label>
      <input className={estilos.input} type='text' name='nombre' id='nombreProducto' defaultValue={valor} />
    </div>
  );
}

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

Filtros.Categorias = Categorias;
Filtros.Nombre = Nombre;
Filtros.Precio = Precio;
Filtros.Empresas = Empresas;

function Filtros({ filtros, actualizarFiltros }) {
  const { datos: categorias, error: errorCategoria } = useGetDatos('categorias');

  function reiniciarFiltros() {
    actualizarFiltros(FILTROS_DEFECTO);
  }

  const { datos: empresas, error: errorEmpresa } = useGetDatos('empresas');

  const { datos: precioMaximo } = useGetDatos('/productos/precioMaximo');

  const manejarFormulario = (e) => {
    e.preventDefault();

    const formulario = new FormData(e.target);
    const datos = formulario.entries();
    let nuevosFiltros = {};

    for (let [campo, valor] of datos) {
      if (campo != 'nombre') {
        valor = Number(valor);
      }

      nuevosFiltros = { ...nuevosFiltros, [campo]: valor };
    }

    actualizarFiltros(nuevosFiltros);
  };

  if (errorCategoria || errorEmpresa) return <h2 style={{ textAlign: 'center' }}>error</h2>;

  return (
    <Formulario manejarFormulario={manejarFormulario} estilo={estilos.formulario}>
      <fieldset className={estilos.wrapper}>
        <Filtros.Nombre valor={filtros.nombre} />
        <Filtros.Precio filtros={filtros} tipoPrecio={'precioMinimo'} precioMaximo={precioMaximo ?? 4000} />
        <Filtros.Precio filtros={filtros} tipoPrecio={'precioMaximo'} precioMaximo={precioMaximo ?? 4000} />
        <Filtros.Categorias categorias={categorias ?? []} categoriaSeleccionada={filtros.categoria} />
        <Filtros.Empresas empresas={empresas ?? []} empresaSeleccionada={filtros.empresa.toString()} />
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

export default Filtros;
