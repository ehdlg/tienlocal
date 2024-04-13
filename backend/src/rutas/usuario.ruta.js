import { Router } from 'express';
import UsuarioControlador from '../controladores/Usuario.controlador.js';

const router = Router();

router.get('/usuarios/:id', UsuarioControlador.obtenerUno);

router.patch('/usuarios/:id', UsuarioControlador.actualizar);

router.delete('/usuarios/:id', UsuarioControlador.borrar);

router.get('/usuarios', UsuarioControlador.obtenerTodos);

router.post('/usuarios', UsuarioControlador.crear);

export default router;
