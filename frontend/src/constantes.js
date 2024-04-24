export const API_URL = import.meta.env.VITE_API_URL;

export const LIMITE_PRODUCTOS = 12;

export const FILTROS_DEFECTO = {
  minPrice: 0,
  maxPrice: 10000,
  name: '',
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
