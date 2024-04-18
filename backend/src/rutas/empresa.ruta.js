import { Router } from 'express';
import { crearEmpresaReglas, actualizarEmpresaReglas } from '../middlewares/validacion/empresa.js';
import EmpresaControlador from '../controladores/Empresa.controlador.js';
import { validacion } from '../middlewares/validacion/index.js';
import { generarHashedPassword } from '../middlewares/index.js';
import { comprobrarPermisosAdministrador } from '../middlewares/auth/index.js';

const router = Router();

router.get('/empresas/:id', comprobrarPermisosAdministrador, EmpresaControlador.obtenerUno);

router.patch(
  '/empresas/:id',
  actualizarEmpresaReglas,
  validacion,
  generarHashedPassword,
  EmpresaControlador.actualizar
);

router.delete('/empresas/:id', EmpresaControlador.borrar);

router.get('/empresas', comprobrarPermisosAdministrador, EmpresaControlador.obtenerTodos);

router.post(
  '/empresas',
  crearEmpresaReglas,
  validacion,
  generarHashedPassword,
  EmpresaControlador.crear
);

export default router;
