import { Router } from 'express';
import { crearEmpresaReglas, actualizarEmpresaReglas } from '../middlewares/validacion/empresa';
import EmpresaControlador from '../controladores/Empresa.controlador';
import { validacion } from '../middlewares/validacion';

const router = Router();

router.get('/empresas/:id', EmpresaControlador.obtenerUno);

router.patch('/empresas/:id', actualizarEmpresaReglas, validacion, EmpresaControlador.actualizar);

router.delete('/empresas/:id', EmpresaControlador.borrar);

router.get('/empresas', EmpresaControlador.obtenerTodos);

router.post('/empresas', crearEmpresaReglas, validacion, EmpresaControlador.crear);

export default router;
