import express from 'express';
import rutaApi from './rutas/api.js';
import { comprobarConexion } from './db/config.js';
import { manejadorErrores, noEncontrado } from './middlewares/index.js';
import 'dotenv/config';

const app = express();
let server;
const { PORT } = process.env;

async function main() {
  try {
    comprobarConexion();

    server = app.listen(process.env.PORT, () => {
      console.log(`Escuchando en: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

app.use(express.json());

app.use('/api', rutaApi);

app.use(noEncontrado);

app.use(manejadorErrores);

main();

export default app;

export { server };
