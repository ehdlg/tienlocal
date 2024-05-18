import { useContext } from 'react';
import { Contexto } from '../context';
import ProductoCarrito from './ProductoCarrito';
import { toast } from 'sonner';
import { Navigate, useNavigate } from 'react-router-dom';
import estilos from '../estilos/Carrito.module.css';
import { API_URL } from '../constantes';

function Compra() {
  const { carrito, login, esUsuario, vaciarCarrito } = useContext(Contexto);
  const navigate = useNavigate();

  if (!esUsuario) {
    toast.info('Debes ser usuario registrado para acceder a las compras');

    return <Navigate to={'/perfil'} />;
  }

  const carritoVacio = carrito.length === 0;

  if (carritoVacio) return <h2>No hay productos añadidos al carrito aún.</h2>;

  const totalCarrito = carrito.reduce(
    (total, producto) => total + parseFloat(producto.precio) * parseFloat(producto.cantidad),
    0
  );

  async function comprar() {
    const URL = `${API_URL}/compras/${login.id}`;
    const opcionesFetch = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${login.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ detalles: carrito }),
    };

    try {
      const respuesta = await fetch(URL, opcionesFetch);

      if (respuesta.status != 200) {
        toast.error('Ocurrió un erroor al realizar la compra');

        return;
      }

      toast.success('¡Compra realizada con exito!');

      vaciarCarrito();

      return navigate('/perfil/compras');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={estilos.pasarelaPago}>
      <h2>Resumen de la Compra</h2>
      <div className={estilos.contenido}>
        {carrito.map((producto) => (
          <ProductoCarrito producto={producto} key={producto.id} />
        ))}
      </div>
      <div className={estilos.total}>
        <h3>Total:</h3>
        <p>{totalCarrito.toFixed(2)} €</p>
      </div>

      <div className={estilos.comprar}>
        <button className={estilos.botonComprar} onClick={comprar}>
          Comprar
        </button>
      </div>
    </div>
  );
}

export default Compra;
