import express from 'express';
import rutaEmpresa from './rutas/empresa.js';
import { manejadorErrores, noEncontrado } from './middlewares/index.js';
import 'dotenv/config';

const app = express();
const { PORT } = process.env;

async function main() {
  //TODO conextion a base de datos

  app.listen(process.env.PORT, () => {
    console.log(`Escuchando en: http://localhost:${PORT}`);
  });
}

app.use(express.json());

app.use('/api/empresa', rutaEmpresa);

app.use(noEncontrado);

app.use(manejadorErrores);

app.get('/', (req, res, next) => {
  res.json({ msg: 'welcome to the tienlocal api' });
});

main();
