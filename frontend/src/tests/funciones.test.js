import { describe, test, expect } from 'vitest';
import { comprobarFiltros, crearArrayPaginas, formatearFecha, validarNuevoProducto } from '../utils/funciones';

describe('Funciones de utilidad', () => {
  describe('comprobarFiltros', () => {
    test('debería devolver true si los filtros son válidos', () => {
      const filtros = { precio: 10, categoria: 'Electrónica' };
      expect(comprobarFiltros(filtros)).toBe(true);
    });

    test('debería devolver false si los filtros son nulos', () => {
      expect(comprobarFiltros(null)).toBe(false);
    });

    test('debería devolver false si los filtros no son un objeto', () => {
      expect(comprobarFiltros('filtro')).toBe(false);
    });

    test('debería devolver false si los filtros están vacíos', () => {
      expect(comprobarFiltros({})).toBe(false);
    });
  });

  describe('crearArrayPaginas', () => {
    test('debería devolver un array de páginas de longitud especificada', () => {
      expect(crearArrayPaginas(5)).toHaveLength(5);
    });

    test('debería devolver un array vacío si el número de páginas es negativo', () => {
      expect(crearArrayPaginas(-5)).toEqual([]);
    });

    test('debería devolver null si el argumento no es un número', () => {
      expect(crearArrayPaginas('5')).toBeNull();
    });
  });

  describe('validarNuevoProducto', () => {
    test('debería devolver un objeto de errores vacío si los datos son válidos', () => {
      const datosFomulario = {
        nombre: 'Producto',
        precio: 10,
        stock: 5,
        descripcion: 'Descripción del producto',
        id_categoria: 1,
        imagen: 'imagen.jpg',
      };
      const { errores } = validarNuevoProducto(datosFomulario);
      expect(errores).toHaveLength(0);
    });

    test('debería devolver un objeto de errores si los datos son inválidos', () => {
      const datosFomulario = {
        nombre: '',
        precio: 0,
        stock: -5,
        descripcion: '',
        id_categoria: 'Categoria',
        imagen: '',
      };
      const { errores } = validarNuevoProducto(datosFomulario);
      expect(errores).not.toHaveLength(0);
    });
  });

  describe('formatearFecha', () => {
    test('debería formatear correctamente una fecha', () => {
      const fecha = new Date('2023-05-15T12:30:00');
      const fechaFormateada = formatearFecha(fecha);
      expect(fechaFormateada).toBe('15 de mayo de 2023, 12:30');
    });
  });
});
