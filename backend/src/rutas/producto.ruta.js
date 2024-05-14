import { Router } from 'express';
import ProductoControlador from '../controladores/Producto.controlador.js';

const router = Router();

router.get('/cantidad', ProductoControlador.obtenerCantidad);

router.get('/precioMaximo', ProductoControlador.obtenerPrecioMaximo);

router.get('/:id', ProductoControlador.obtenerUno);

router.get('/', ProductoControlador.obtenerTodos);

export default router;
