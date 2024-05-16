import { Router } from 'express';
import { comprobarPermisosAdministrador, verificarToken } from '../middlewares/auth/index.js';
import CompraControlador from '../controladores/Compra.controlador.js';

const router = Router();

router.get('/cantidad', verificarToken, comprobarPermisosAdministrador, CompraControlador.obtenerCantidad);

router.get('/ultima', verificarToken, comprobarPermisosAdministrador, CompraControlador.obtenerFechaUltimaCompra);

export default router;
