-- Se elimina la base de datos si existe para evitar conflicto
DROP DATABASE IF EXISTS tienlocal;

-- Se crea la base de datos tienlocal
CREATE DATABASE tienlocal;

-- Se utiliza la base de datos tienlocal
USE tienlocal;

CREATE TABLE administrador(
	id INT AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(150) UNIQUE,
    contrasena VARCHAR(255)
    );

-- Creación de la tabla usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    apellidos VARCHAR(150),
    email VARCHAR(100) UNIQUE,
    creado TIMESTAMP DEFAULT NOW(),
    contrasena VARCHAR(255)
);

-- Creación de la tabla empresas 
CREATE TABLE empresas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE,
    email VARCHAR(100) UNIQUE,
    contrasena VARCHAR(255),
    descripcion TEXT,
    ubicacion VARCHAR(100),
    creado TIMESTAMP DEFAULT NOW()
);

-- Creación de la tabla categorias
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    creado TIMESTAMP DEFAULT NOW(),
    nombre VARCHAR(100)
);

-- Creación de la tabla productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT DEFAULT NULL,
    precio DECIMAL(10, 2) CHECK (precio > 0),
    stock INT CHECK (stock >= 0),
    imagen VARCHAR(255) DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Imagen_no_disponible.svg/300px-Imagen_no_disponible.svg.png',
    creado TIMESTAMP DEFAULT NOW(),
    id_empresa INT,
    id_categoria INT,
    FOREIGN KEY (id_empresa) REFERENCES empresas(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Creación de la tabla compras
CREATE TABLE compras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creado TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Creación de la tabla detalle de compras
CREATE TABLE detalle_compras (
    id_compra INT,
    id_producto INT,
    cantidad INT CHECK (cantidad >= 1),
    precio_unitario DECIMAL(10, 2) CHECK (precio_unitario > 0),
    PRIMARY KEY (id_compra, id_producto),
    FOREIGN KEY (id_compra) REFERENCES compras(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Creación de la tabla valoraciones
CREATE TABLE valoraciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_producto INT,
    puntuacion INT CHECK (puntuacion BETWEEN 0 AND 5),
    comentario TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creado TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id) ON DELETE CASCADE ON UPDATE CASCADE
);





