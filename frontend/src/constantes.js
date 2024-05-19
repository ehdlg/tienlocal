/**
 * URL de la API utilizada para realizar solicitudes de datos.
 * @type {string}
 */
export const API_URL = import.meta.env.VITE_API_URL;

/**
 * Límite de productos por página.
 * @type {number}
 */
export const LIMITE_PRODUCTOS = 16;

/**
 * Límite predeterminado para paginación.
 * @type {number}
 */
export const LIMITE_DEFECTO = 500;

/**
 * Desplazamiento predeterminado para paginación.
 * @type {number}
 */
export const OFFSET_DEFECTO = 0;

/**
 * Filtros predeterminados para la búsqueda de productos.
 * @type {object}
 */
export const FILTROS_DEFECTO = {
  precioMinimo: 0,
  precioMaximo: 0,
  nombre: '',
  categoria: 0,
  empresa: 0,
};

/**
 * Elementos de navegación.
 * @type {Array<Object>}
 */
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
    url: '/sobre-nosotros',
    id: crypto.randomUUID(),
  },
];

/**
 * Elementos de menú desplegable para usuarios logueados.
 * @type {Array<Object>}
 */
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

/**
 * Elementos de menú desplegable para usuarios no logueados.
 * @type {Array<Object>}
 */
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

/**
 * Expresión regular para validar contraseñas.
 * @type {RegExp}
 */
export const regexContrasena = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/;

/**
 * Tipos de usuario.
 * @type {Object}
 */
export const TIPOS_USUARIO = {
  usuario: 'Usuario',
  empresa: 'Empresa',
  administrador: 'Administrador',
};

/**
 * Tipos de edición de usuario.
 * @type {Object}
 */
export const TIPO_EDICION = {
  INFO: 'info',
  CONTRASENA: 'contrasena',
};

/**
 * Campos de entrada para usuarios.
 * @type {Array<Object>}
 */
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

/**
 * Campos de entrada para empresas.
 * @type {Array<Object>}
 */
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

/**
 * Campos de entrada para iniciar sesión.
 * @type {Array<Object>}
 */
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

/**
 * Campos de entrada para editar contraseña.
 * @type {Array<Object>}
 */
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

/**
 * Campos de entrada para un nuevo producto.
 * @type {Array<Object>}
 */
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
    step: 1,
  },
  {
    name: 'precio',
    label: 'Precio',
    required: true,
    type: 'number',
    min: 0,
    step: 0.01,
  },
  {
    name: 'imagen',
    type: 'text',
    required: false,
    label: 'Imagen (URL)',
  },
];

/**
 * Campos de entrada para editar un producto existente.
 * @type {Array<Object>}
 */
export const INPUTS_EDITAR_PRODUCTO = INPUTS_NUEVO_PRODUCTO.map((input) => {
  return {
    ...input,
    required: false,
  };
});
