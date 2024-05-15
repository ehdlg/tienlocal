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

router.get('/:id', verificarToken, comprobarPermisosUsuario, UsuarioControlador.obtenerUno);

router.get('/:id/compras', verificarToken, comprobarPermisosUsuario, UsuarioControlador.obtenerUsuarioCompras);

router.get(
  '/:id/compras/:idCompra',
  verificarToken,
  comprobarPermisosUsuario,
  UsuarioControlador.obtenerUsuarioDetalleCompras
);

router.patch(
  '/:id',
  verificarToken,
  comprobarPermisosUsuario,
  actualizarUsuarioReglas,
  validacion,
  generarHashedPassword,
  UsuarioControlador.actualizar
);

router.delete('/:id', verificarToken, comprobarPermisosUsuario, UsuarioControlador.borrar);

router.get('/', verificarToken, comprobarPermisosAdministrador, UsuarioControlador.obtenerTodos);

router.post('/', crearUsuarioReglas, validacion, generarHashedPassword, UsuarioControlador.crear);

router.post('/login', loginReglas, validacion, comprobarUsuarioCredenciales, UsuarioControlador.login);

export default router;
