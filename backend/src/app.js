import express from 'express';
import { comprobarConexion } from './db/index.js';
import { manejadorErrores, noEncontrado } from './middlewares/index.js';
import 'dotenv/config';

const app = express();
const { PORT } = process.env;

async function main() {
  try {
    comprobarConexion();

    app.listen(process.env.PORT, () => {
      console.log(`Escuchando en: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

app.use(express.json());

app.get('/api', (req, res, next) => {
  res.json({ mensaje: 'Bienvenido a la API de Tienlocal.' });
});

app.use(noEncontrado);

app.use(manejadorErrores);

main();
