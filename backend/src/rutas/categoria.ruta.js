import { Router } from 'express';
import CategoriaControlador from '../controladores/Categoria.controlador.js';

const router = Router();

router.get('/:id', CategoriaControlador.obtenerUno);

router.get('/', CategoriaControlador.obtenerTodos);

export default router;
