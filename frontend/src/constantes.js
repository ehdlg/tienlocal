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
    id: crypto.randomUUID(),
  },
  {
    nombre: 'Mi cuenta',
    url: '',
    id: crypto.randomUUID(),
  },
  {
    nombre: 'Sobre Tienlocal',
    url: '/about',
    id: crypto.randomUUID(),
  },
];

export const ELEMENTOS_SUBMENU_LOGEADO = [
  {
    nombre: 'Perfil',
    url: '/perfil',
    id: crypto.randomUUID(),
  },
  {
    nombre: 'Cerrar sesión',
    url: '/logout',
    id: crypto.randomUUID(),
  },
];

export const ELEMENTOS_SUBMENU_NO_LOGEADO = [
  {
    nombre: 'Iniciar sesión',
    url: '/login',
    id: crypto.randomUUID(),
  },
  {
    nombre: 'Registrarse',
    url: '/registro',
    id: crypto.randomUUID(),
  },
];

export const regexContrasena = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/;

export const TIPOS_USUARIO = {
  usuario: 'Usuario',
  empresa: 'Empresa',
  administrador: 'Administrador',
};

export const TIPO_EDICION = {
  INFO: 'info',
  CONTRASENA: 'contrasena',
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

export const INPUT_EDITAR_CONTRASENA = [
  {
    name: 'contrasenaActual',
    label: 'Contraseña actual',
    required: true,
    type: 'password',
  },
  {
    name: 'contrasena',
    label: 'Nueva Contraseña',
    required: true,
    type: 'password',
  },
  {
    name: 'repetirContrasena',
    label: 'Confirma la contraseña',
    required: true,
    type: 'password',
  },
];

export const INPUTS_NUEVO_PRODUCTO = [
  {
    name: 'nombre',
    label: 'Nombre del producto',
    required: true,
    type: 'text',
  },
  {
    name: 'descripcion',
    label: 'Descripción',
    required: true,
    type: 'text',
  },
  {
    name: 'stock',
    label: 'Stock',
    required: true,
    type: 'number',
    min: 0,
  },
  {
    name: 'precio',
    label: 'Precio',
    required: true,
    type: 'number',
    min: 0.01,
  },
  {
    name: 'imagen',
    type: 'text',
    required: false,
    label: 'Imagen (URL)',
  },
];
