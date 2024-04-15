import { Router } from 'express';
import UsuarioControlador from '../controladores/Usuario.controlador.js';
import { crearUsuarioReglas, actualizarUsuarioReglas } from '../middlewares/validacion/usuarios.js';
import { validacion } from '../middlewares/validacion/index.js';

const router = Router();

router.get('/usuarios/:id', UsuarioControlador.obtenerUno);

router.patch('/usuarios/:id', actualizarUsuarioReglas, validacion, UsuarioControlador.actualizar);

router.delete('/usuarios/:id', UsuarioControlador.borrar);

router.get('/usuarios', UsuarioControlador.obtenerTodos);

router.post('/usuarios', crearUsuarioReglas, validacion, UsuarioControlador.crear);

export default router;
