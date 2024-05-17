import { Router } from 'express';
import { loginReglas, validacion } from '../middlewares/validacion/index.js';
import {
  comprobarAdministradorCredenciales,
  comprobarPermisosAdministrador,
  crearToken,
  verificarToken,
} from '../middlewares/auth/index.js';
import AdministradorControlador from '../controladores/Administrador.controlador.js';

const router = Router();

router.get('/analiticas', verificarToken, comprobarPermisosAdministrador, AdministradorControlador.obtenerAnaliticas);

router.post('/login', loginReglas, validacion, comprobarAdministradorCredenciales, crearToken);

export default router;
