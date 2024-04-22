import { Router } from 'express';
import { crearEmpresaReglas, actualizarEmpresaReglas } from '../middlewares/validacion/empresa.js';
import EmpresaControlador from '../controladores/Empresa.controlador.js';
import { loginReglas, validacion } from '../middlewares/validacion/index.js';
import { generarHashedPassword } from '../middlewares/index.js';
import {
  comprobarEmpresaCredenciales,
  comprobarPermisosAdministrador,
  comprobarPermisosEmpresa,
  verificarToken,
} from '../middlewares/auth/index.js';

const router = Router();

router.get('/:id', verificarToken, comprobarPermisosEmpresa, EmpresaControlador.obtenerUno);

router.patch(
  '/:id',
  verificarToken,
  comprobarPermisosEmpresa,
  actualizarEmpresaReglas,
  validacion,
  generarHashedPassword,
  EmpresaControlador.actualizar
);

router.delete('/:id', verificarToken, comprobarPermisosEmpresa, EmpresaControlador.borrar);

router.get('/', verificarToken, comprobarPermisosAdministrador, EmpresaControlador.obtenerTodos);

router.post('/', crearEmpresaReglas, validacion, generarHashedPassword, EmpresaControlador.crear);

router.post(
  '/login',
  loginReglas,
  validacion,
  comprobarEmpresaCredenciales,
  EmpresaControlador.login
);

export default router;
