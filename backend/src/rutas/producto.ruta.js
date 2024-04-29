import { Router } from 'express';
import ProductoControlador from '../controladores/Producto.controlador.js';
import {
  actualizarProductoReglas,
  crearProductoReglas,
} from '../middlewares/validacion/productos.js';
import { validacion } from '../middlewares/validacion/index.js';

const router = Router();

router.get('/cantidad', ProductoControlador.obtenerCantidad);

router.get('/:id', ProductoControlador.obtenerUno);

router.patch('/:id', actualizarProductoReglas, validacion, ProductoControlador.actualizar);

router.delete('/:id', ProductoControlador.borrar);

router.get('/', ProductoControlador.obtenerTodos);

router.post('/', crearProductoReglas, validacion, ProductoControlador.crear);

export default router;
