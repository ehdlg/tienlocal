import { useContext } from 'react';
import { Contexto } from '../context';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import useGetDatos from '../hooks/useGetDatos';
import Formulario from './Formulario';
import Loading from './Loading';
import Input from './Input';
import { validarNuevoProducto } from '../utils/funciones';
import { API_URL, INPUTS_NUEVO_PRODUCTO } from '../constantes';
import estilosFormulario from '../estilos/Formulario.module.css';

function NuevoProducto() {
  const { login } = useContext(Contexto);
  const navigate = useNavigate();

  if (login.rol != 'empresa') {
    return navigate('/perfil');
  }

  async function crearNuevoProducto(e) {
    e.preventDefault();

    const formulario = new FormData(e.target);

    const datosFormulario = Object.fromEntries(formulario.entries());

    const { errores, nuevoProducto } = validarNuevoProducto(datosFormulario);

    if (errores.length > 0) {
      errores.forEach((error) => {
        toast.error(error);
      });
      return;
    }

    try {
      const URL = `${API_URL}/empresas/${login.id}/productos`;
      const opcionesFetch = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${login.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProducto),
      };

      const respuesta = await fetch(URL, opcionesFetch);

      const datosRespuesta = await respuesta.json();

      if (respuesta.status == 422) {
        const { errores } = datosRespuesta;

        errores.forEach((error) => {
          toast.error(error);

          return;
        });
      }

      if (respuesta.status != 201) {
        toast.error('Ocurrió un error al intentar crear el nuevo producto');

        return;
      }

      toast.success('Nuevo producto creado');

      setTimeout(() => {
        return navigate('/perfil/productos');
      }, 500);
    } catch (error) {
      console.error(error);
    }
  }

  const { datos: categorias, loading, error } = useGetDatos('categorias');

  if (loading) return <Loading />;

  if (error) return <h1>Error: {error}</h1>;

  return (
    <>
      <h2 className={estilosFormulario.subtitulo}>Nuevo producto</h2>
      <Formulario manejarFormulario={crearNuevoProducto}>
        {INPUTS_NUEVO_PRODUCTO.map((input) => {
          return (
            <Input
              key={input.name}
              id={input.name}
              max={input.max}
              min={input.min}
              name={input.name}
              textoLabel={input.label}
              type={input.type}
              required={input.required}
              defaultValue={input.defaultValue}
            />
          );
        })}

        <select name='id_categoria' id='categorias-nuevoproducto' className={estilosFormulario.select}>
          <option value=''>Elige categoría</option>
          {categorias.map((categoria) => {
            return (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            );
          })}
        </select>

        <button type='submit' className={estilosFormulario.boton}>
          Crear nuevo producto
        </button>
      </Formulario>
    </>
  );
}

export default NuevoProducto;
