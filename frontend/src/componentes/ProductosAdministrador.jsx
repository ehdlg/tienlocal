import useGetDatos from '../hooks/useGetDatos'; // Importa el hook personalizado useGetDatos
import { useContext, useEffect, useState } from 'react'; // Importa los hooks useContext, useEffect y useState desde React
import { Contexto } from '../context'; // Importa el contexto
import Loading from './Loading'; // Importa el componente Loading
import { toast } from 'sonner'; // Importa la función toast desde la librería sonner
import { API_URL } from '../constantes'; // Importa la constante API_URL desde el archivo constantes
import Tabla from './Tabla'; // Importa el componente Tabla

function ProductosAdministrador() {
  const { login } = useContext(Contexto); // Obtiene el estado de inicio de sesión del contexto
  const [productos, setProductos] = useState(null); // Estado para almacenar la lista de productos

  const { datos, error, loading } = useGetDatos('productos/detalles'); // Obtiene los datos de los productos

  useEffect(() => {
    // Efecto para actualizar el estado de productos cuando se obtienen los datos
    if (null == datos) return;

    setProductos(datos); // Actualiza el estado de productos con los datos obtenidos
  }, [datos]);

  function eliminarProducto(id) {
    // Función para eliminar un producto
    return async function () {
      // Función asincrónica
      const URL = `${API_URL}/productos/${id}`; // URL para la solicitud de eliminación
      const opcionesFetch = {
        // Opciones para la solicitud de eliminación
        method: 'DELETE', // Método DELETE
        headers: {
          // Encabezados de autenticación
          Authorization: `Bearer ${login.token}`, // Token de autenticación
        },
      };
      try {
        if (!confirm('¿Deseas borrar el producto?')) return; // Solicita confirmación antes de eliminar el producto

        const respuesta = await fetch(URL, opcionesFetch); // Realiza la solicitud de eliminación

        if (respuesta.status != 200) {
          // Si la solicitud no es exitosa
          toast.error('Ocurrió un error al intentar borrar el producto'); // Muestra un mensaje de error
          return;
        }

        toast.success('Producto borrado'); // Muestra un mensaje de éxito

        setProductos((prevProductos) => {
          // Actualiza el estado de productos eliminando el producto borrado
          return prevProductos.filter((producto) => producto.id != id); // Filtra los productos para excluir el producto eliminado
        });
      } catch (error) {
        console.error(error); // Muestra el error en la consola
      }
    };
  }

  if (error) return <h1>Error: {error}</h1>; // Si hay un error, muestra un mensaje de error

  if (loading || null == productos) return <Loading />; // Si está cargando o no hay productos, muestra el componente Loading

  const mostrarProductos = productos.map((producto) => {
    // Mapea los productos para mostrarlos en la tabla
    return {
      // Devuelve un objeto con los datos del producto
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock,
      empresa: producto.empresa,
    };
  });

  return (
    <>
      {/* Fragmento para envolver el componente Tabla */}
      <Tabla datos={mostrarProductos} eliminar={eliminarProducto} esProducto={true} />{' '}
      {/* Renderiza el componente Tabla */}
    </>
  );
}

export default ProductosAdministrador; // Exporta el componente ProductosAdministrador
