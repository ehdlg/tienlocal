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

/**
 * Componente para editar un producto existente.
 * Permite al usuario propietario del producto o a un administrador editar los detalles del producto.
 */
function EditarProducto() {
  const { id } = useParams();
  const { login, sesionIniciada, esUsuario, esAdmin } = useContext(Contexto);

  // Función para manejar la edición del producto
  async function editarProducto(e) {
    e.preventDefault();

    // Obtiene los datos del formulario
    const formulario = new FormData(e.target);
    const productoEditado = Object.fromEntries(formulario.entries());

    // Si la imagen no se ha cambiado, elimina la propiedad imagen del objeto
    if (productoEditado.imagen == '') delete productoEditado.imagen;

    try {
      // Construye la URL de la API
      const URL = `${API_URL}/empresas/${login.id}/productos/${id}`;
      // Configura las opciones para la solicitud de actualización del producto
      const opcionesFetch = {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${login.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoEditado),
      };

      // Realiza la solicitud de actualización del producto
      const respuesta = await fetch(URL, opcionesFetch);
      const datos = await respuesta.json();

      // Si hay errores de validación, muestra los mensajes de error
      if (respuesta.status == 422) {
        const { errores } = datos;
        errores.forEach((error) => {
          toast.error(error);
        });
        return;
      }

      // Si hay un error inesperado, muestra un mensaje de error
      if (respuesta.status != 200) {
        toast.error('Ocurrió un error, no se pudo editar el producto.');
        return;
      }

      // Muestra un mensaje de éxito
      toast.success('El producto fue editado correctamente');
    } catch (error) {
      console.error(error);
    }
  }

  // Obtiene los datos del producto a editar
  const { datos: producto, error: errorProducto, loading: loadingProducto } = useGetDatos(`productos/${id}`);
  // Obtiene la lista de categorías
  const { datos: categorias, loading: loadingCategoria } = useGetDatos('categorias');

  // Si se están cargando los datos, muestra el componente de carga
  if (loadingProducto || loadingCategoria) return <Loading />;

  // Si hay un error al cargar los datos, muestra un mensaje de error
  if (errorProducto) return <h1>Error: {errorProducto}</h1>;

  // Determina si el usuario actual es el propietario del producto o un administrador
  const esPropietario = (sesionIniciada && !esUsuario && producto['id_empresa'] == login.id) || esAdmin;

  // Si el usuario no es el propietario del producto o un administrador, muestra un mensaje y redirige
  if (!esPropietario || !esAdmin) {
    toast.info('No tienes permisos para editar este producto');
    return <Navigate to={'/perfil'} />;
  }

  return (
    <>
      <h2 className={estilosFormulario.subtitulo}>Editar producto</h2>
      <Formulario manejarFormulario={editarProducto}>
        {/* Mapea los inputs para editar el producto */}
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

        {/* Select para seleccionar la categoría del producto */}
        <select name='id_categoria' id='categorias-editarproducto' defaultValue={producto['id_categoria']}>
          {categorias.map((categoria) => {
            return (
              <option value={categoria.id} key={categoria.id}>
                {categoria.nombre}
              </option>
            );
          })}
        </select>
        {/* Botón para enviar el formulario de edición */}
        <button type='submit' className={estilosFormulario.boton}>
          Editar producto
        </button>
      </Formulario>
    </>
  );
}

export default EditarProducto;
