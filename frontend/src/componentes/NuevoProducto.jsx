import { useContext } from 'react'; // Importa el hook useContext de React para acceder al contexto de la aplicación
import { Contexto } from '../context'; // Importa el contexto de la aplicación
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate de react-router-dom para la navegación programática
import { toast } from 'sonner'; // Importa la función toast de la librería Sonner para mostrar mensajes de notificación
import useGetDatos from '../hooks/useGetDatos'; // Importa el hook useGetDatos para obtener datos de la API
import Formulario from './Formulario'; // Importa el componente Formulario para el formulario de creación de productos
import Loading from './Loading'; // Importa el componente Loading para mostrar un indicador de carga
import Input from './Input'; // Importa el componente Input para los campos de entrada del formulario
import { validarNuevoProducto } from '../utils/funciones'; // Importa la función validarNuevoProducto para validar los datos del nuevo producto
import { API_URL, INPUTS_NUEVO_PRODUCTO } from '../constantes'; // Importa las constantes API_URL e INPUTS_NUEVO_PRODUCTO
import estilosFormulario from '../estilos/Formulario.module.css'; // Importa los estilos CSS Modules específicos para el formulario

// Componente NuevoProducto: muestra un formulario para crear un nuevo producto
function NuevoProducto() {
  const { login } = useContext(Contexto); // Obtiene el estado de inicio de sesión del contexto
  const navigate = useNavigate(); // Obtiene la función de navegación navigate del hook useNavigate

  // Redirige a la página de perfil si el usuario no es una empresa
  if (login.rol !== 'empresa') {
    return navigate('/perfil');
  }

  // Función para crear un nuevo producto
  async function crearNuevoProducto(e) {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario

    const formulario = new FormData(e.target); // Crea un nuevo objeto FormData con los datos del formulario

    const datosFormulario = Object.fromEntries(formulario.entries()); // Convierte los datos del formulario en un objeto JavaScript

    const { errores, nuevoProducto } = validarNuevoProducto(datosFormulario); // Valida los datos del nuevo producto

    // Si hay errores de validación, muestra un mensaje de error por cada uno
    if (errores.length > 0) {
      errores.forEach((error) => {
        toast.error(error); // Muestra un mensaje de error utilizando la función toast de Sonner
      });
      return; // Detiene la ejecución de la función
    }

    try {
      const URL = `${API_URL}/empresas/${login.id}/productos`; // URL para la creación de un nuevo producto
      const opcionesFetch = {
        method: 'POST', // Método HTTP POST para enviar los datos del nuevo producto
        headers: {
          Authorization: `Bearer ${login.token}`, // Token de autenticación en el encabezado de la solicitud
          'Content-Type': 'application/json', // Tipo de contenido JSON en el encabezado de la solicitud
        },
        body: JSON.stringify(nuevoProducto), // Convierte el objeto nuevoProducto a JSON y lo envía en el cuerpo de la solicitud
      };

      const respuesta = await fetch(URL, opcionesFetch); // Realiza la solicitud HTTP POST para crear el nuevo producto

      const datosRespuesta = await respuesta.json(); // Convierte la respuesta en formato JSON

      // Si la respuesta indica un error de validación (código de estado 422), muestra los errores
      if (respuesta.status === 422) {
        const { errores } = datosRespuesta;
        errores.forEach((error) => {
          toast.error(error); // Muestra un mensaje de error por cada error de validación
        });
      }

      // Si la respuesta indica que se creó el producto correctamente (código de estado 201), muestra un mensaje de éxito y redirige a la página de productos del perfil
      if (respuesta.status !== 201) {
        toast.error('Ocurrió un error al intentar crear el nuevo producto'); // Muestra un mensaje de error
        return; // Detiene la ejecución de la función
      }

      toast.success('Nuevo producto creado'); // Muestra un mensaje de éxito utilizando la función toast de Sonner

      // Después de un breve retraso, redirige a la página de productos del perfil
      setTimeout(() => {
        return navigate('/perfil/productos'); // Redirige a la página de productos del perfil utilizando la función navigate
      }, 500);
    } catch (error) {
      console.error(error); // Muestra el error en la consola del navegador
    }
  }

  // Obtiene las categorías de productos desde la API
  const { datos: categorias, loading, error } = useGetDatos('categorias');

  // Si se está cargando la información, muestra un indicador de carga
  if (loading) return <Loading />;

  // Si hay un error al obtener los
  // Si hay un error al obtener los datos de categorías, muestra un mensaje de error
  if (error) return <h1>Error: {error}</h1>;

  return (
    <>
      <h2 className={estilosFormulario.subtitulo}>Nuevo producto</h2>
      {/* Renderiza el componente Formulario para el formulario de creación de productos */}
      <Formulario manejarFormulario={crearNuevoProducto}>
        {/* Mapea cada campo de entrada del formulario y renderiza el componente Input correspondiente */}
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
              step={input.step}
              defaultValue={input.defaultValue}
            />
          );
        })}
        {/* Renderiza un select para elegir la categoría del nuevo producto */}
        <select name='id_categoria' id='categorias-nuevoproducto' className={estilosFormulario.select}>
          <option value=''>Elige categoría</option>
          {/* Mapea las categorías disponibles y renderiza una opción para cada una */}
          {categorias.map((categoria) => {
            return (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            );
          })}
        </select>
        {/* Renderiza un botón para enviar el formulario */}
        <button type='submit' className={estilosFormulario.boton}>
          Crear nuevo producto
        </button>
      </Formulario>
    </>
  );
}

export default NuevoProducto; // Exporta el componente NuevoProducto
