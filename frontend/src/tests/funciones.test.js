import { describe, test, expect } from 'vitest'; // Importamos las funciones de prueba de vitest
import { comprobarFiltros, crearArrayPaginas, formatearFecha, validarNuevoProducto } from '../utils/funciones'; // Importamos las funciones que vamos a probar
import { validarContrasena } from '../utils/validacion';

// Describimos el conjunto de pruebas para las funciones de utilidad
describe('Funciones de utilidad', () => {
  // Prueba para la función comprobarFiltros
  describe('comprobarFiltros', () => {
    // Prueba para comprobar que devuelva true si los filtros son válidos
    test('debería devolver true si los filtros son válidos', () => {
      const filtros = { precio: 10, categoria: 'Electrónica' };
      expect(comprobarFiltros(filtros)).toBe(true);
    });

    // Prueba para comprobar que devuelva false si los filtros son nulos
    test('debería devolver false si los filtros son nulos', () => {
      expect(comprobarFiltros(null)).toBe(false);
    });

    // Prueba para comprobar que devuelva false si los filtros no son un objeto
    test('debería devolver false si los filtros no son un objeto', () => {
      expect(comprobarFiltros('filtro')).toBe(false);
    });

    // Prueba para comprobar que devuelva false si los filtros están vacíos
    test('debería devolver false si los filtros están vacíos', () => {
      expect(comprobarFiltros({})).toBe(false);
    });
  });

  // Prueba para la función crearArrayPaginas
  describe('crearArrayPaginas', () => {
    // Prueba para comprobar que devuelva un array de páginas de longitud especificada
    test('debería devolver un array de páginas de longitud especificada', () => {
      expect(crearArrayPaginas(5)).toHaveLength(5);
    });

    // Prueba para comprobar que devuelva un array vacío si el número de páginas es negativo
    test('debería devolver un array vacío si el número de páginas es negativo', () => {
      expect(crearArrayPaginas(-5)).toEqual([]);
    });

    // Prueba para comprobar que devuelva null si el argumento no es un número
    test('debería devolver null si el argumento no es un número', () => {
      expect(crearArrayPaginas('5')).toBeNull();
    });
  });

  // Prueba para la función validarNuevoProducto
  describe('validarNuevoProducto', () => {
    // Prueba para comprobar que devuelva un objeto de errores vacío si los datos son válidos
    test('debería devolver un objeto de errores vacío si los datos son válidos', () => {
      const datosFormulario = {
        nombre: 'Producto',
        precio: 10,
        stock: 5,
        descripcion: 'Descripción del producto',
        id_categoria: 1,
        imagen: 'imagen.jpg',
      };
      const { errores } = validarNuevoProducto(datosFormulario);
      expect(errores).toHaveLength(0);
    });

    // Prueba para comprobar que devuelva un objeto de errores si los datos son inválidos
    test('debería devolver un objeto de errores si los datos son inválidos', () => {
      const datosFormulario = {
        nombre: '',
        precio: 0,
        stock: -5,
        descripcion: '',
        id_categoria: 'Categoria',
        imagen: '',
      };
      const { errores } = validarNuevoProducto(datosFormulario);
      expect(errores).not.toHaveLength(0);
    });
  });

  // Prueba para la función formatearFecha
  describe('formatearFecha', () => {
    // Prueba para comprobar que formatee correctamente una fecha
    test('debería formatear correctamente una fecha', () => {
      const fecha = new Date('2023-05-15T12:30:00');
      const fechaFormateada = formatearFecha(fecha);
      expect(fechaFormateada).toBe('15 de mayo de 2023, 12:30');
    });
  });

  describe('Función de validación de contraseña', () => {
    // Prueba para validar una contraseña válida y coincidente
    test('debería devolver un array vacío si las contraseñas coinciden y cumplen con los requisitos', () => {
      const contrasena = 'Test123!';
      const repetirContrasena = 'Test123!';
      const errores = validarContrasena(contrasena, repetirContrasena);
      expect(errores).toHaveLength(0);
    });

    // Prueba para validar una contraseña inválida que no cumple con los requisitos
    test('debería devolver un array con un mensaje de error si la contraseña no cumple con los requisitos', () => {
      const contrasena = 'test';
      const repetirContrasena = 'test';
      const errores = validarContrasena(contrasena, repetirContrasena);
      expect(errores).toContain(
        'La contraseña debe contener una minúscula, una mayúscula, un número y mínimo 8 caracteres'
      );
    });

    // Prueba para validar dos contraseñas que no coinciden
    test('debería devolver un array con un mensaje de error si las contraseñas no coinciden', () => {
      const contrasena = 'Test123!';
      const repetirContrasena = 'Test456!';
      const errores = validarContrasena(contrasena, repetirContrasena);
      expect(errores).toContain('Las contraseñas no coinciden');
    });
  });
});
