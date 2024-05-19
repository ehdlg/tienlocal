import { expect, describe, test, afterAll } from '@jest/globals';
import request from 'supertest';
import app, { server } from '../app.js';
import { db } from '../db/config.js';
import 'dotenv/config';
import Producto from '../modelos/Producto.js';

const { ADMIN_EMAIL, ADMIN_PWD, USUARIO_EMAIL, USUARIO_PWD } = process.env;

/**
 * Este conjunto de pruebas verifica el funcionamiento de las rutas relacionadas con productos en la API.
 * Se utilizan las librerías `jest` y `supertest` para realizar y verificar las solicitudes HTTP.
 */
describe('/api/productos', () => {
  /**
   * Después de ejecutar todas las pruebas, se cierran el servidor y la conexión a la base de datos.
   */
  afterAll(() => {
    server.close();
    db.end();
  });

  /**
   * Este conjunto de pruebas verifica las respuestas de las solicitudes GET a las rutas de productos.
   */
  describe('GET', () => {
    /**
     * Prueba si una solicitud GET a /api/productos devuelve un estado HTTP 200.
     */
    test('dada una peticion GET a /api/productos, debería devolver un estado HTTP 200', async () => {
      const respuesta = await request(app).get('/api/productos');

      expect(respuesta.status).toBe(200);
    });

    /**
     * Prueba si una solicitud GET a /api/productos devuelve un array de productos.
     */
    test('dada una petición GET a /api/productos, debería devolver un array de productos', async () => {
      const respuesta = await request(app).get('/api/productos');
      //Se comprueba que el body de la respuesta es un array con Array.isArray()
      expect(Array.isArray(respuesta.body)).toBe(true);
    });

    /**
     * Prueba si una solicitud GET a /api/productos/:id devuelve un estado HTTP 200.
     */
    test('dada una peticion GET a /api/productos/:id, debería el estado HTTP 200', async () => {
      const respuesta = await request(app).get('/api/productos/9');

      expect(respuesta.status).toBe(200);
    });

    /**
     * Prueba si una solicitud GET a /api/productos/:id devuelve un objeto con el producto indicado.
     */
    test('dada una peticion GET a /api/productos/:id, debería devolver un objeto con el producto indicado', async () => {
      const respuesta = await request(app).get('/api/productos/9');

      expect(respuesta.status).toBe(200);
      //Se comprueba que el body de la repuesta tenga el atributo "id", atributo que tienen todos los productos obligatoriamente
      expect(respuesta.body).toHaveProperty('id');
    });

    /**
     * Prueba si una solicitud GET a /api/productos/:id a un ID de un producto inexistente devuelve el estado HTTP 404.
     */
    test('dada una peticion GET a /api/productos/:id a un ID de un producto inexistente, debería devolver el estado HTTP 404', async () => {
      const respuesta = await request(app).get('/api/productos/2j3fjs8');

      expect(respuesta.status).toBe(404);
    });

    /**
     * Prueba si una solicitud GET a /api/productos/cantidad devuelve un entero indicando la cantidad de productos.
     */
    test('dada una peticion GET a /api/productos/cantidad, debería devolver un entero indicando la cantidad de productos', async () => {
      const respuesta = await request(app).get('/api/productos/cantidad');

      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toBeDefined();
      expect(respuesta.body).toBeGreaterThan(-1);
    });
  });

  /**
   * Este conjunto de pruebas verifica las respuestas de las solicitudes DELETE a las rutas de productos.
   */
  describe('DELETE', () => {
    let productoPruebaId;
    let tokenAdmin;
    let tokenUsuario;

    /**
     * Antes de ejecutar las pruebas DELETE, se crea un producto de prueba y se obtienen tokens de autenticación
     * para un administrador y un usuario.
     */
    beforeAll(async () => {
      const productoPrueba = await Producto.crear({
        nombre: 'Producto de prueba',
        descripcion: 'Descripción de prueba',
        id_empresa: 5,
        id_categoria: 1,
        stock: 1,
        precio: 1,
      });

      const loginAdmin = await request(app)
        .post('/api/administrador/login')
        .send({ email: ADMIN_EMAIL, contrasena: ADMIN_PWD });

      const loginUsuario = await request(app)
        .post('/api/usuarios/login')
        .send({ email: USUARIO_EMAIL, contrasena: USUARIO_PWD });

      productoPruebaId = productoPrueba.insertId;
      tokenAdmin = loginAdmin.body.token;
      tokenUsuario = loginUsuario.body.token;
    });

    /**
     * Prueba si una solicitud DELETE a /api/productos/:id sin token de autorización devuelve un estado HTTP 401.
     */
    test('dada una peticion DELETE a /api/productos/:id sin token de autorizacion, devuelve un estado HTTP 401', async () => {
      const respuesta = await request(app).delete('/api/productos/2');

      expect(respuesta.status).toBe(401);
    });

    /**
     * Prueba si una solicitud DELETE a /api/productos/:id con un token sin permisos devuelve un estado HTTP 403.
     */
    test('dada una peticion DELETE a /api/productos/:id con un token sin permisos, devuelve un estado HTTP 403', async () => {
      const respuesta = await request(app).delete('/api/productos/2').set('Authorization', `Bearer ${tokenUsuario}`);

      expect(respuesta.status).toBe(403);
    });

    /**
     * Prueba si una solicitud DELETE a /api/productos/:id con un token con permisos devuelve un estado HTTP 200,
     * borrando el producto.
     */
    test('data una peticion DELETE a /api/productos/:id con un token con permisos, devuelve un estado HTTP 200, borrando el producto', async () => {
      const respuesta = await request(app)
        .delete(`/api/productos/${productoPruebaId}`)
        .set('Authorization', `Bearer ${tokenAdmin}`);

      expect(respuesta.status).toBe(200);
    });
  });
});
