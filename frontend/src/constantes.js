export const API_URL = import.meta.env.VITE_API_URL;

export const LIMITE_PRODUCTOS = 16;

export const LIMITE_DEFECTO = 500;

export const OFFSET_DEFECTO = 0;

export const FILTROS_DEFECTO = {
  precioMinimo: 0,
  precioMaximo: 0,
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

export const regexContrasena = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/;

export const TIPOS_USUARIO = {
  usuario: 'Usuario',
  empresa: 'Empresa',
};

export const USUARIO_INPUTS = [
  {
    type: 'text',
    name: 'nombre',
  },
  {
    type: 'text',
    name: 'apellidos',
  },
  {
    type: 'text',
    name: 'email',
  },
  {
    type: 'password',
    name: 'contrasena',
  },
  {
    type: 'password',
    name: 'repetirContrasena',
  },
];

export const EMPRESA_INPUTS = [
  {
    type: 'text',
    name: 'nombre',
  },
  {
    type: 'text',
    name: 'descripcion',
  },
  {
    type: 'text',
    name: 'ubicacion',
  },
  {
    type: 'text',
    name: 'email',
  },
  {
    type: 'password',
    name: 'contrasena',
  },
  {
    type: 'password',
    name: 'repetirContrasena',
  },
];
