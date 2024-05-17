import useGetDatos from '../hooks/useGetDatos';
import { useContext, useEffect, useState } from 'react';
import { Contexto } from '../context';
import Loading from './Loading';
import { toast } from 'sonner';
import { API_URL } from '../constantes';
import Tabla from './Tabla';

function ProductosAdministrador() {
  const { login } = useContext(Contexto);
  const [productos, setProductos] = useState(null);

  const { datos, error, loading } = useGetDatos('productos/detalles');

  useEffect(() => {
    if (null == datos) return;

    setProductos(datos);
  }, [datos]);

  function eliminarProducto(id) {
    return async function () {
      const URL = `${API_URL}/productos/${id}`;
      const opcionesFetch = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${login.token}`,
        },
      };
      try {
        if (!confirm('¿Deseas borrar el producto?')) return;

        const respuesta = await fetch(URL, opcionesFetch);

        if (respuesta.status != 200) {
          toast.error('Ocurrió un error al intentar borrar el producto');

          return;
        }

        toast.success('Producto borrado');

        setProductos((prevProductos) => {
          return prevProductos.filter((producto) => producto.id != id);
        });
      } catch (error) {
        console.error(error);
      }
    };
  }

  if (error) return <h1>Error: {error}</h1>;

  if (loading || null == productos) return <Loading />;

  const mostrarProductos = productos.map((producto) => {
    return {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock,
      empresa: producto.empresa,
    };
  });

  return (
    <>
      <Tabla datos={mostrarProductos} eliminar={eliminarProducto} esProducto={true} />
    </>
  );
}

export default ProductosAdministrador;
