import { Router } from 'express';
import UsuarioControlador from '../controladores/Usuario.controlador.js';
import { generarHashedPassword } from '../middlewares/index.js';
import { crearUsuarioReglas, actualizarUsuarioReglas } from '../middlewares/validacion/usuarios.js';
import { loginReglas, validacion } from '../middlewares/validacion/index.js';
import {
  comprobarPermisosUsuario,
  comprobarUsuarioCredenciales,
  verificarToken,
  comprobarPermisosAdministrador,
} from '../middlewares/auth/index.js';

const router = Router();

router.get(
  '/usuarios/:id',
  verificarToken,
  comprobarPermisosUsuario,
  UsuarioControlador.obtenerUno
);

router.patch(
  '/usuarios/:id',
  verificarToken,
  comprobarPermisosUsuario,
  actualizarUsuarioReglas,
  validacion,
  generarHashedPassword,
  UsuarioControlador.actualizar
);

router.delete('/usuarios/:id', verificarToken, comprobarPermisosUsuario, UsuarioControlador.borrar);

router.get(
  '/usuarios',
  verificarToken,
  comprobarPermisosAdministrador,
  UsuarioControlador.obtenerTodos
);

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
