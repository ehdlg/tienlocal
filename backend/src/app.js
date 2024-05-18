import express from 'express';
import rutaApi from './rutas/api.js';
import { comprobarConexion } from './db/config.js';
import { manejadorErrores, noEncontrado } from './middlewares/index.js';
import 'dotenv/config';

// Crea una instancia de la aplicación Express
const app = express();

// Variable para almacenar el servidor Express
let server;

// Extrae el puerto del archivo .env
const { PORT } = process.env;

/**
 * Función asincrónica para iniciar el servidor Express.
 * Se encarga de comprobar la conexión con la base de datos y luego
 * inicia el servidor Express para que comience a escuchar en el puerto especificado.
 */
async function main() {
  try {
    // Verifica la conexión con la base de datos
    comprobarConexion();

    // Inicia el servidor y comienza a escuchar en el puerto especificado
    server = app.listen(process.env.PORT, () => {
      console.log(`Escuchando en: http://localhost:${PORT}`);
    });
  } catch (error) {
    // Maneja cualquier error que ocurra durante la inicialización del servidor
    console.error(error);
  }
}

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Rutas de la API
app.use('/api', rutaApi);

// Middleware para manejar solicitudes a rutas no encontradas
app.use(noEncontrado);

// Middleware para manejar errores
app.use(manejadorErrores);

// Inicia el servidor Express
main();

// Exporta la aplicación Express y el servidor para su uso en los tests
export default app;
export { server };
