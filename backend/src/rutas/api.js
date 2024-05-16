import { Router } from 'express';
import rutaUsuarios from './usuario.ruta.js';
import rutaProductos from './producto.ruta.js';
import rutaEmpresas from './empresa.ruta.js';
import rutaCategorias from './categoria.ruta.js';
import rutaValoraciones from './valoracion.ruta.js';
import rutaAdministrador from './administrador.ruta.js';
import rutaCompra from './compra.ruta.js';

const router = Router();

router.get('/', (req, res, next) => {
  res.json({ mensaje: 'Bienvenido a la API de Tienlocal' });
});

router.use('/productos/', rutaProductos);

router.use('/usuarios/', rutaUsuarios);

router.use('/empresas/', rutaEmpresas);

router.use('/categorias/', rutaCategorias);

router.use('/valoraciones/', rutaValoraciones);

router.use('/compras/', rutaCompra);

router.use('/administrador/', rutaAdministrador);

export default router;
