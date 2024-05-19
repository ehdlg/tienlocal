import { useContext } from 'react';
import { Contexto } from '../context';
import ProductoCarrito from './ProductoCarrito';
import { toast } from 'sonner';
import { Navigate, useNavigate } from 'react-router-dom';
import estilos from '../estilos/Carrito.module.css';
import { API_URL } from '../constantes';

/**
 * Componente para realizar la compra de los productos en el carrito.
 * Permite al usuario visualizar los productos en el carrito, su total y proceder a la compra.
 */
function Compra() {
  const { carrito, login, esUsuario, vaciarCarrito } = useContext(Contexto);
  const navigate = useNavigate();

  // Redirige al perfil si el usuario no está registrado
  if (!esUsuario) {
    toast.info('Debes ser usuario registrado para acceder a las compras');
    return <Navigate to={'/perfil'} />;
  }

  // Verifica si el carrito está vacío
  const carritoVacio = carrito.length === 0;
  if (carritoVacio) return <h2>No hay productos añadidos al carrito aún.</h2>;

  // Calcula el total de la compra sumando los precios de los productos en el carrito
  const totalCarrito = carrito.reduce(
    (total, producto) => total + parseFloat(producto.precio) * parseFloat(producto.cantidad),
    0
  );

  // Función para realizar la compra
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

      if (respuesta.status !== 200) {
        toast.error('Ocurrió un error al realizar la compra');
        return;
      }

      toast.success('¡Compra realizada con éxito!');
      vaciarCarrito();
      navigate('/perfil/compras');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={estilos.pasarelaPago}>
      <h2>Resumen de la Compra</h2>
      <div className={estilos.contenido}>
        {/* Muestra los productos en el carrito */}
        {carrito.map((producto) => (
          <ProductoCarrito producto={producto} key={producto.id} />
        ))}
      </div>
      <div className={estilos.total}>
        <h3>Total:</h3>
        <p>{totalCarrito.toFixed(2)} €</p>
      </div>
      {/* Botón para proceder a la compra */}
      <div className={estilos.comprar}>
        <button className={estilos.botonComprar} onClick={comprar}>
          Comprar
        </button>
      </div>
    </div>
  );
}

export default Compra;
