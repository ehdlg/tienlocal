import { Router } from 'express';
import { comprobarPermisosAdministrador, comprobarPermisosUsuario, verificarToken } from '../middlewares/auth/index.js';
import CompraControlador from '../controladores/Compra.controlador.js';

const router = Router();

router.get('/cantidad', verificarToken, comprobarPermisosAdministrador, CompraControlador.obtenerCantidad);

router.get('/ultima', verificarToken, comprobarPermisosAdministrador, CompraControlador.obtenerFechaUltimaCompra);

router.post('/:id', verificarToken, comprobarPermisosUsuario, CompraControlador.comprar);

export default router;
