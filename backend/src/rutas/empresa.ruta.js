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

router.get(
  '/empresas/:id',
  verificarToken,
  comprobarPermisosEmpresa,
  EmpresaControlador.obtenerUno
);

router.patch(
  '/empresas/:id',
  verificarToken,
  comprobarPermisosEmpresa,
  actualizarEmpresaReglas,
  validacion,
  generarHashedPassword,
  EmpresaControlador.actualizar
);

router.delete('/empresas/:id', verificarToken, comprobarPermisosEmpresa, EmpresaControlador.borrar);

router.get(
  '/empresas',
  verificarToken,
  comprobarPermisosAdministrador,
  EmpresaControlador.obtenerTodos
);

router.post(
  '/empresas',
  crearEmpresaReglas,
  validacion,
  generarHashedPassword,
  EmpresaControlador.crear
);

router.post(
  '/empresas/login',
  loginReglas,
  validacion,
  comprobarEmpresaCredenciales,
  EmpresaControlador.login
);

export default router;
