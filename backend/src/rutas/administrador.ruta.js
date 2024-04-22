import { Router } from 'express';
import { loginReglas, validacion } from '../middlewares/validacion/index.js';
import { comprobarAdministradorCredenciales, crearToken } from '../middlewares/auth/index.js';

const router = Router();

router.post('/login', loginReglas, validacion, comprobarAdministradorCredenciales, crearToken);

export default router;
