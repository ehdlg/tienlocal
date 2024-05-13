import useGetDatos from '../hooks/useGetDatos';
import { useContext, useEffect, useState } from 'react';
import { Contexto } from '../context';
import Loading from './Loading';
import { toast } from 'sonner';
import { API_URL } from '../constantes';
import { TrashIcon } from '@heroicons/react/24/solid';
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

        const datos = await respuesta.json();
        if (respuesta.status != 200) {
          toast.error('Ocurrió un error al intentar borrar el producto');

          console.log({ respuesta, datos });

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

  const productosOrdenados = productos.sort((a, b) => {
    return Number(a.precio) < Number(b.precio);
  });

  return (
    <>
      <div className={estilos.tabla}>
        <div className={estilos.encabezadoTabla}>
          <span>Nombre</span>
          <span>Precio</span>
          <span>Stock</span>
          <span>Acciones</span>
        </div>
        {productosOrdenados.map((producto) => (
          <div key={producto.nombre} className={estilos.filaTabla}>
            <span>{producto.nombre}</span>
            <span>{producto.precio}</span>
            <span>{producto.stock}</span>
            <div className={estilos.acciones}>
              <button className={estilos.botonEditar}>Editar</button>
              <button className={`${estilos.boton} ${estilos.botonEliminar}`} onClick={eliminarProducto(producto.id)}>
                <TrashIcon />
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductosEmpresa;
