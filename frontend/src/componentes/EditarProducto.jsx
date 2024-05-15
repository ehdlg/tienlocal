import { useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useGetDatos from '../hooks/useGetDatos';
import Formulario from './Formulario';
import Input from './Input';
import Loading from './Loading';
import { API_URL, INPUTS_EDITAR_PRODUCTO } from '../constantes';
import estilosFormulario from '../estilos/Formulario.module.css';
import { Contexto } from '../context';
import { toast } from 'sonner';

function EditarProducto() {
  const { id } = useParams();
  const { login, sesionIniciada, esUsuario } = useContext(Contexto);

  async function editarProducto(e) {
    e.preventDefault();

    const formulario = new FormData(e.target);

    const productoEditado = Object.fromEntries(formulario.entries());

    if (productoEditado.imagen == '') delete productoEditado.imagen;

    try {
      const URL = `${API_URL}/empresas/${login.id}/productos/${id}`;
      const opcionesFetch = {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${login.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoEditado),
      };

      const respuesta = await fetch(URL, opcionesFetch);

      const datos = await respuesta.json();

      if (respuesta.status == 422) {
        const { errores } = datos;

        errores.forEach((error) => {
          toast.error(error);
        });

        return;
      }

      if (respuesta.status != 200) {
        toast.error('Ocurrió un  error, no se pudo editar el producto.');

        console.log({ respuesta, datos });

        return;
      }

      toast.success('El producto fue editado correctamente');
    } catch (error) {
      console.error(error);
    }
  }

  const { datos: producto, error: errorProducto, loading: loadingProducto } = useGetDatos(`productos/${id}`);
  const { datos: categorias, loading: loadingCategoria } = useGetDatos('categorias');

  if (loadingProducto || loadingCategoria) return <Loading />;

  if (errorProducto) return <h1>Error: {errorProducto}</h1>;

  const esPropietario = sesionIniciada && !esUsuario && producto['id_empresa'] == login.id;

  if (!esPropietario) {
    toast.info('No tienes permisos para editar este producto');

    return <Navigate to={'/perfil'} />;
  }

  return (
    <>
      <h2 className={estilosFormulario.subtitulo}>Editar producto</h2>
      <Formulario manejarFormulario={editarProducto}>
        {INPUTS_EDITAR_PRODUCTO.map((input) => {
          return (
            <Input
              key={input.name}
              id={input.name}
              name={input.name}
              type={input.type}
              textoLabel={input.label}
              defaultValue={producto[input.name]}
              min={input.min}
              max={input.max}
              step={input.step}
            />
          );
        })}

        <select name='id_categoria' id='categorias-editarproducto' defaultValue={producto['id_categoria']}>
          {categorias.map((categoria) => {
            return (
              <option value={categoria.id} key={categoria.id}>
                {categoria.nombre}
              </option>
            );
          })}
        </select>
        <button type='submit' className={estilosFormulario.boton}>
          Editar producto
        </button>
      </Formulario>
    </>
  );
}

export default EditarProducto;
