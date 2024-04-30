export const API_URL = import.meta.env.VITE_API_URL;

export const LIMITE_PRODUCTOS = 16;

export const LIMITE_DEFECTO = 500;

export const OFFSET_DEFECTO = 0;

export const FILTROS_DEFECTO = {
  precioMinimo: 0,
  precioMaximo: 4000,
  nombre: '',
  categoria: 0,
  empresa: 0,
};

export const ELEMENTOS_NAV = [
  {
    nombre: 'Productos',
    url: '/productos',
    activo: false,
  },
  {
    nombre: 'Mi cuenta',
    url: '/perfil',
    activo: false,
  },
  {
    nombre: 'Sobre Tienlocal',
    url: '/about',
    activo: true,
  },
];
