import { Router } from 'express';
import ValoracionControlador from '../controladores/Valoracion.controlador.js';

const router = Router();

router.get('/valoraciones/:id', ValoracionControlador.obtenerUno);

router.get('/valoraciones', ValoracionControlador.obtenerTodos);

export default router;
