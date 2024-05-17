import { Router } from 'express';
import ProductoControlador from '../controladores/Producto.controlador.js';
import { comprobarPermisosAdministrador, verificarToken } from '../middlewares/auth/index.js';

const router = Router();

router.get('/detalles', ProductoControlador.obtenerTodosDetalles);

router.get('/cantidad', ProductoControlador.obtenerCantidad);

router.get('/precioMaximo', ProductoControlador.obtenerPrecioMaximo);

router.get('/:id', ProductoControlador.obtenerUno);

router.delete('/:id', verificarToken, comprobarPermisosAdministrador, ProductoControlador.borrar);

router.get('/', ProductoControlador.obtenerTodos);

export default router;
