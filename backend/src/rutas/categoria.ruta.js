import { Router } from 'express';
import CategoriaControlador from '../controladores/Categoria.controlador.js';

const router = Router();

router.get('/categorias/:id', CategoriaControlador.obtenerUno);

router.get('/categorias', CategoriaControlador.obtenerTodos);

export default router;
