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
  administrador: 'Administrador',
};

export const USUARIO_INPUTS = [
  {
    type: 'text',
    name: 'nombre',
    label: 'Nombre',
    required: true,
  },
  {
    type: 'text',
    name: 'apellidos',
    label: 'Apellidos',
    required: true,
  },
  {
    type: 'text',
    name: 'email',
    label: 'Email',
    required: true,
  },
  {
    type: 'password',
    name: 'contrasena',
    label: 'Contraseña',
    required: true,
  },
  {
    type: 'password',
    name: 'repetirContrasena',
    label: 'Repite la contraseña',
    required: true,
  },
];

export const EMPRESA_INPUTS = [
  {
    type: 'text',
    name: 'nombre',
    label: 'Nombre',
    required: true,
  },
  {
    type: 'text',
    name: 'descripcion',
    label: 'Descripción',
    required: true,
  },
  {
    type: 'text',
    name: 'ubicacion',
    label: 'Ubicación',
    required: true,
  },
  {
    type: 'text',
    name: 'email',
    label: 'Email',
    required: true,
  },
  {
    type: 'password',
    name: 'contrasena',
    label: 'Contraseña',
    required: true,
  },
  {
    type: 'password',
    name: 'repetirContrasena',
    label: 'Repite la contraseña',
    required: true,
  },
];

export const LOGIN_INPUTS = [
  {
    type: 'email',
    label: 'Email',
    required: true,
    name: 'email',
  },
  {
    type: 'password',
    label: 'Contraseña',
    name: 'contrasena',
    required: true,
  },
];
