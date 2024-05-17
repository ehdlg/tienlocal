import useGetDatos from '../hooks/useGetDatos';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Contexto } from '../context';
import Loading from './Loading';
import { toast } from 'sonner';
import { API_URL } from '../constantes';
import Tabla from './Tabla';
import estilos from '../estilos/Perfil.module.css';

function ProductosEmpresa() {
  const { login } = useContext(Contexto);
  const [productos, setProductos] = useState(null);

  let { datos, error, loading } = useGetDatos(`empresas/${login.id}/productos`);

  useEffect(() => {
    if (null == datos) return;

    setProductos(datos);
  }, [datos]);

  function eliminarProducto(id) {
    return async function () {
      const URL = `${API_URL}/empresas/${login.id}/productos/${id}`;
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

  if (loading || null == productos) return <Loading />;

  if (error) return <h1>Error: {error}</h1>;

  const mostrarProductos = productos.map((producto) => {
    return {
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock,
    };
  });

  return (
    <>
      <Tabla productos={mostrarProductos} eliminarProducto={eliminarProducto}>
        <Link to={'/productos/nuevo'}>
          <button className={`${estilos.boton}  ${estilos.botonCrear}`}>Crear nuevo producto</button>
        </Link>
      </Tabla>
    </>
  );
}

export default ProductosEmpresa;
