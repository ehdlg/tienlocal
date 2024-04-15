import { Router } from 'express';
import ProductoControlador from '../controladores/Producto.controlador.js';
import { validacion } from '../middlewares/validacion/index.js';

const router = Router();

router.get('/productos/:id', ProductoControlador.obtenerUno);

router.patch('/productos/:id', ProductoControlador.actualizar);

router.delete('/productos/:id', ProductoControlador.borrar);

router.get('/productos', ProductoControlador.obtenerTodos);

router.post('/productos', ProductoControlador.crear);

export default router;
