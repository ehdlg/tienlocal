import { Router } from 'express';
import rutaUsuarios from './usuario.ruta.js';
import rutaProductos from './producto.ruta.js';

const router = Router();

router.get('/', (req, res, next) => {
  res.json({ mensaje: 'Bienvenido a la API de Tienlocal' });
});

router.use(rutaProductos);

router.use(rutaUsuarios);

export default router;
