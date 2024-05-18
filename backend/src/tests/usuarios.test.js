import { expect, describe, test, afterAll } from '@jest/globals';
import request from 'supertest';
import app, { server } from '../app.js';
import { db } from '../db/config.js';
import Usuario from '../modelos/Usuario.js';
import 'dotenv/config';

/**
 * Este conjunto de pruebas verifica el funcionamiento de las rutas relacionadas con usuarios en la API.
 * Se utilizan las librerías `jest` y `supertest` para realizar y verificar las solicitudes HTTP.
 */
describe('/api/usuarios', () => {
  /**
   * Después de ejecutar todas las pruebas, se cierran el servidor y la conexión a la base de datos.
   */
  afterAll(() => {
    server.close();
    db.end();
  });

  let tokenUsuario;
  let idUsuario;

  /**
   * Este conjunto de pruebas verifica las respuestas de las solicitudes POST para crear un usuario.
   */
  describe('POST (crear usuario)', () => {
    /**
     * Después de todas las pruebas, se elimina el usuario de prueba creado.
     */
    afterAll(async () => {
      await Usuario.borrar(idUsuario);
    });

    const NUEVO_USUARIO = {
      nombre: 'Usuario de prueba',
      contrasena: 'Test123!',
      repetirContrasena: 'Test123!',
      email: 'prueba@email.com',
      apellidos: 'Apellidos de prueba',
    };

    const USUARIO_DATOS_INCORRECTOS = {
      nombre: 'a',
      contrasena: '1234',
      email: 'esto no es un email',
    };

    /**
     * Prueba si una solicitud POST a /api/usuarios con datos incorrectos devuelve un estado HTTP 422.
     */
    test('dada una solicitud POST a /api/usuarios/registro con datos mal enviados, devuelve un estado HTTP 422', async () => {
      const respuesta = await request(app).post('/api/usuarios').send(USUARIO_DATOS_INCORRECTOS);

      expect(respuesta.status).toBe(422);
    });

    /**
     * Prueba si una solicitud POST a /api/usuarios con datos correctos crea un usuario y devuelve un estado HTTP 201.
     */
    test('dada una solicitud POST a /api/usuarios con datos corerctos, crea un usuario y se recibe una solicitud 201', async () => {
      const respuesta = await request(app).post('/api/usuarios').send(NUEVO_USUARIO);
      idUsuario = respuesta.body.insertId;

      expect(respuesta.status).toBe(201);
    });

    /**
     * Prueba si una solicitud POST a /api/usuarios/login con credenciales mal formadas devuelve un estado HTTP 422.
     */
    test('dada una solicitud POST a /api/usuarios/login con credenciales mal formadas, devueve el estado HTTP 422', async () => {
      const respuesta = await request(app)
        .post('/api/usuarios/login')
        .send({ email: USUARIO_DATOS_INCORRECTOS.email, contrasena: USUARIO_DATOS_INCORRECTOS.contrasena });

      expect(respuesta.status).toBe(422);
    });

    /**
     * Prueba si una solicitud POST a /api/usuarios/login con credenciales incorrectas devuelve un estado HTTP 400.
     */
    test('dada una solicitud POST a /api/usuarios/login con credenciales incorrectas, devueve el estado HTTP 400', async () => {
      const respuesta = await request(app)
        .post('/api/usuarios/login')
        .send({ email: NUEVO_USUARIO.email, contrasena: 'Test1234!' });

      expect(respuesta.status).toBe(400);
    });

    /**
     * Prueba si una solicitud POST a /api/usuarios/login con credenciales correctas devuelve un estado HTTP 200 y un token JWT.
     */
    test('dada una solicitud POST a /api/usuarios/login con credenciales correctas, devueve el estado HTTP 200 y el token JWT', async () => {
      const respuesta = await request(app)
        .post('/api/usuarios/login')
        .send({ email: NUEVO_USUARIO.email, contrasena: NUEVO_USUARIO.contrasena });

      expect(respuesta.status).toBe(200);
      expect(respuesta.body.token).toBeDefined();
      tokenUsuario = respuesta.body.token;
    });
  });

  /**
   * Este conjunto de pruebas verifica las respuestas de las solicitudes PATCH para actualizar un usuario.
   */
  describe('PATCH (actualizar usuario)', () => {
    /**
     * Prueba si una solicitud PATCH a /api/usuarios/:id sin JWT token devuelve un estado HTTP 401.
     */
    test('dada una solicitud PATCH a /api/usuarios/:id sin JWT token, deveule el estado HTTP 401', async () => {
      const respuesta = await request(app).patch(`/api/usuarios/${idUsuario}`);

      expect(respuesta.status).toBe(401);
    });

    /**
     * Prueba si una solicitud PATCH a /api/usuarios/:id con un JWT válido pero sin datos a modificar devuelve un estado HTTP 400.
     */
    test('dada una solicitud PATCH a /api/usuarios/:id con un JWT valido pero sin datos a modificar, devuelve un estado HTTP 400', async () => {
      const respuesta = await request(app)
        .patch(`/api/usuarios/${idUsuario}`)
        .set('Authorization', `Bearer ${tokenUsuario}`);

      expect(respuesta.status).toBe(400);
    });

    /**
     * Prueba si una solicitud PATCH a /api/usuarios/:id con un JWT válido y con datos a modificar devuelve un estado HTTP 200.
     */
    test('dada una solicitud PATCH a /api/usuarios/:id con un JWT valido y con datos a modificar, devuelve un estado HTTP 200', async () => {
      const respuesta = await request(app)
        .patch(`/api/usuarios/${idUsuario}`)
        .send({ nombre: 'Nuevo nombre' })
        .set('Authorization', `Bearer ${tokenUsuario}`);

      expect(respuesta.status).toBe(200);
    });

    /**
     * Prueba si una solicitud PATCH a /api/usuarios/:id con datos mal formados devuelve un estado HTTP 422.
     */
    test('dada una solicitud PATCH a /api/usuarios/:id con datos mal formados, devuelve un estado HTTP 422', async () => {
      const respuesta = await request(app)
        .patch(`/api/usuarios/${idUsuario}`)
        .send({ email: 'no es un email' })
        .set('Authorization', `Bearer ${tokenUsuario}`);

      expect(respuesta.status).toBe(422);
    });
  });

  /**
   * Este conjunto de pruebas verifica las respuestas de las solicitudes DELETE para eliminar un usuario.
   */
  describe('DELETE (borrar usuario)', () => {
    /**
     * Prueba si una solicitud DELETE a /api/usuarios/:id sin token devuelve un estado HTTP 401.
     */
    test('dada una solicitud DELETE a /api/usuarios/:id sin token, devuelve el estado HTTP 401', async () => {
      const respuesta = await request(app).delete(`/api/usuarios/${idUsuario}`);

      expect(respuesta.status).toBe(401);
    });

    /**
     * Prueba si una solicitud DELETE a /api/usuarios/:id con un JWT válido borra el usuario y devuelve un estado HTTP 200.
     */
    test('dada una solicitud DELETE a /api/usuarios/:id con un JWT válido, borra el usuario y se recibe el estado HTTP 200', async () => {
      const respuesta = await request(app)
        .delete(`/api/usuarios/${idUsuario}`)
        .set('Authorization', `Bearer ${tokenUsuario}`);

      expect(respuesta.status).toBe(200);
    });
  });
});
