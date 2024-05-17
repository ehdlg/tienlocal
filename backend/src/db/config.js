import mysql from 'mysql2/promise';
import 'dotenv/config';

// Configuración de la base de datos obtenida desde variables de entorno
const DB_CONFIG = {
  host: process.env.DB_HOST, // Dirección del servidor de la base de datos
  user: process.env.DB_USER, // Usuario de la base de datos
  password: process.env.DB_PASSWORD, // Contraseña del usuario
  database: process.env.DB_NAME, // Nombre de la base de datos
};

// Crear una piscina de conexiones a la base de datos usando la configuración proporcionada
export const db = mysql.createPool(DB_CONFIG);

/**
 * Función asincrónica para comprobar la conexión a la base de datos.
 * @returns {Promise} Promesa que resuelve si la conexión es exitosa, de lo contrario, se rechaza con el error.
 */
export async function comprobarConexion() {
  return await db.query('SELECT 1'); // Ejecuta una consulta simple para verificar la conexión
}
