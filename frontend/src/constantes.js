export const API_URL = import.meta.env.VITE_API_URL;

export const LIMITE_PRODUCTOS = 9999;

export const FILTROS_DEFECTO = {
  precioMinimo: 0,
  precioMaximo: 9999,
  nombre: '',
  categoria: 0,
  empresa: 'TODAS',
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
