import { Router } from 'express';
import ValoracionControlador from '../controladores/Valoracion.controlador.js';

const router = Router();

router.get('/:id', ValoracionControlador.obtenerUno);

router.get('/', ValoracionControlador.obtenerTodos);

export default router;
