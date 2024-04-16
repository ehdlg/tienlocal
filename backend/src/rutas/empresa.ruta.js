import { Router } from 'express';
import { crearEmpresaReglas, actualizarEmpresaReglas } from '../middlewares/validacion/empresa.js';
import EmpresaControlador from '../controladores/Empresa.controlador.js';
import { validacion } from '../middlewares/validacion/index.js';

const router = Router();

router.get('/empresas/:id', EmpresaControlador.obtenerUno);

router.patch('/empresas/:id', actualizarEmpresaReglas, validacion, EmpresaControlador.actualizar);

router.delete('/empresas/:id', EmpresaControlador.borrar);

router.get('/empresas', EmpresaControlador.obtenerTodos);

router.post('/empresas', crearEmpresaReglas, validacion, EmpresaControlador.crear);

export default router;
