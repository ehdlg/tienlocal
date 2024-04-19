import { Router } from 'express';
import UsuarioControlador from '../controladores/Usuario.controlador.js';
import { generarHashedPassword } from '../middlewares/index.js';
import { crearUsuarioReglas, actualizarUsuarioReglas } from '../middlewares/validacion/usuarios.js';
import { loginReglas, validacion } from '../middlewares/validacion/index.js';
import {
  comprobarUsuarioCredenciales,
  comprobrarPermisosAdministrador,
} from '../middlewares/auth/index.js';

const router = Router();

router.get('/usuarios/:id', comprobrarPermisosAdministrador, UsuarioControlador.obtenerUno);

router.patch(
  '/usuarios/:id',
  actualizarUsuarioReglas,
  validacion,
  generarHashedPassword,
  UsuarioControlador.actualizar
);

router.delete('/usuarios/:id', UsuarioControlador.borrar);

router.get('/usuarios', comprobrarPermisosAdministrador, UsuarioControlador.obtenerTodos);

router.post(
  '/usuarios',
  crearUsuarioReglas,
  validacion,
  generarHashedPassword,
  UsuarioControlador.crear
);

router.post(
  '/usuarios/login',
  loginReglas,
  validacion,
  comprobarUsuarioCredenciales,
  UsuarioControlador.login
);

export default router;
