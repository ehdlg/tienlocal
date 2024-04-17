import { Router } from 'express';
import rutaUsuarios from './usuario.ruta.js';
import rutaProductos from './producto.ruta.js';
import rutaEmpresa from './empresa.ruta.js';
import rutaCategoria from './categoria.ruta.js';

const router = Router();

router.get('/', (req, res, next) => {
  res.json({ mensaje: 'Bienvenido a la API de Tienlocal' });
});

router.use(rutaProductos);

router.use(rutaUsuarios);

router.use(rutaEmpresa);

router.use(rutaCategoria);

export default router;
