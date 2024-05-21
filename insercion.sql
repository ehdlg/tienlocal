--Datos de insercion para el administrador (la contraseñes es el hash para 'admin123')
INSERT INTO administrador (email, contrasena) VALUES(
  'admin@admin.com', '$2a$10$CZYdl.2StEXHxv/ELozU9Ob3zWZvtVTu8vRYN6D44KS9rda2EhSdS'
);

-- Datos de ejemplo para la tabla usuarios
INSERT INTO usuarios (nombre, apellidos, email, contrasena) VALUES
('Juan', 'Pérez', 'juan@example.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi'),
('María', 'García', 'maria@example.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi'),
('Carlos', 'Martínez', 'carlos@example.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi'),
('Ana', 'López', 'ana@example.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi'),
('Pedro', 'Rodríguez', 'pedro@example.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi'),
('Laura', 'Gómez', 'laura@example.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi'),
('Sofía', 'Ruiz', 'sofia@example.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi'),
('Miguel', 'Sánchez', 'miguel@example.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi'),
('Elena', 'Fernández', 'elena@example.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi'),
('David', 'Pérez', 'david@example.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi'),
('Luisa', 'Martín', 'luisa@example.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi'),
('Alejandro', 'González', 'alejandro@example.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi'),
('Carmen', 'Sánchez', 'carmen@example.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi'),
('Daniel', 'López', 'daniel@example.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi'),
('Natalia', 'Ruiz', 'natalia@example.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi');

-- Datos de ejemplo para la tabla empresas
INSERT INTO empresas (nombre, email, contrasena, descripcion, ubicacion) VALUES
('ElectroMax', 'info@electromax.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Tienda de electrodomésticos y electrónica', 'Granada'),
('ModaStyle', 'info@modastyle.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Tienda de moda y accesorios', 'Granada'),
('HogarFácil', 'info@hogarfacil.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Tienda de muebles y decoración para el hogar', 'Almería'),
('SuperAlimentos', 'info@superalimentos.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Tienda de alimentos saludables y orgánicos', 'Sevilla'),
('DeporteTotal', 'info@deportetotal.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Tienda de artículos deportivos y equipos', 'Granada'),
('Juguetelandia', 'info@juguetelandia.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Tienda de juguetes para niños', 'Córdoba'),
('Librería Moderna', 'info@libreriamoderna.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Libros de todos los géneros', 'Madrid'),
('Belleza Natural', 'info@bellezanatural.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Productos de belleza y cuidado personal', 'Valencia'),
('AutoPlus', 'info@autoplus.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Tienda de accesorios y repuestos para automóviles', 'Granada'),
('PetShop', 'info@petshop.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Productos y accesorios para mascotas', 'Jaén'),
('TechWorld', 'info@techworld.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Tienda de productos electrónicos y gadgets', 'Cádiz'),
('FashionTrend', 'info@fashiontrend.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Ropa de moda para hombres y mujeres', 'Barcelona'),
('DecoHome', 'info@decohome.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Artículos de decoración para el hogar', 'Málaga'),
('FitLife', 'info@fitlife.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Equipos y accesorios para entrenamiento y fitness', 'Huelva'),
('ArteCreativo', 'info@artecreativo.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Suministros y materiales para arte y manualidades', 'Madrid'),
('MundoMascotas', 'info@mundomascotas.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Todo para tu mascota', 'Barcelona'),
('GadgetLand', 'info@gadgetland.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Tienda de gadgets y dispositivos electrónicos', 'Valencia'),
('EstiloÚnico', 'info@estilounico.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Ropa y accesorios con estilo', 'Sevilla'),
('CasaBella', 'info@casabella.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Productos de decoración para el hogar', 'Madrid'),
('SportsWorld', 'info@sportsworld.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Todo para los amantes del deporte', 'Barcelona'),
('MundoLibro', 'info@mundolibro.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Libros de todas las temáticas', 'Valencia'),
('TechGuru', 'info@techguru.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Productos tecnológicos innovadores', 'Sevilla'),
('GreenLife', 'info@greenlife.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Productos ecológicos y sostenibles', 'Málaga'),
('FashionZone', 'info@fashionzone.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Ropa y accesorios de moda', 'Madrid'),
('DreamHome', 'info@dreamhome.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Todo para hacer de tu hogar un sueño', 'Barcelona'),
('FitStyle', 'info@fitstyle.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Ropa y accesorios deportivos de calidad', 'Valencia'),
('ArteViva', 'info@arteviva.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Materiales artísticos y creativos', 'Málaga'),
('TechCity', 'info@techcity.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'La ciudad de la tecnología', 'Madrid'),
('PetLand', 'info@petland.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Todo para tu mascota', 'Barcelona'),
('HomeTrends', 'info@hometrends.com', '$2a$10$OnwIvp/gaadMV0fFC7KMXupk5ja82Tmr5ILyQd6buPDiQOIY1YBxi', 'Últimas tendencias en decoración', 'Valencia');



-- Datos de ejemplo para la tabla categorias
INSERT INTO categorias (nombre) VALUES
('Electrodomésticos'),
('Ropa y Accesorios'),
('Muebles y Decoración'),
('Alimentos'),
('Deportes'),
('Juguetes'),
('Libros'),
('Belleza y Cuidado Personal'),
('Accesorios de Automóvil'),
('Productos para Mascotas'),
('Electrónica y tecnología'),
('Moda'),
('Decoración del Hogar'),
('Fitness y Entrenamiento'),
('Arte y Manualidades');

-- Datos de ejemplo para la tabla productos
INSERT INTO productos (nombre, descripcion, precio, stock, id_empresa, id_categoria) VALUES
('Salmón ahumado', 'Salmón ahumado noruego de origen sostenible', 12.99, 100, 9, 4),
('Samsung Galaxy A52', 'Teléfono móvil con pantalla Super AMOLED', 349.99, 100, 1, 10),
('Aceite de oliva virgen extra', 'Aceite de oliva de máxima calidad prensado en frío', 9.99, 200, 6, 4),
('Arroz integral', 'Arroz integral de grano largo ideal para platos saludables', 3.99, 150, 7, 4),
('Leche de almendras', 'Leche vegetal de almendras sin lactosa y rica en nutrientes', 2.49, 300, 8, 4),
('Wilson Pro Staff', 'Raqueta de tenis Wilson Pro Staff', 179.99, 30, 5, 5),
('Google Nest Mini', 'Altavoz inteligente con asistente de voz', 49.99, 100, 1, 10),
('Fisher-Price Tortuga', 'Juguete infantil para bebés', 14.99, 100, 6, 6),
('El principito', 'Libro clásico de Antoine de Saint-Exupéry', 9.99, 80, 7, 7),
('Miel de abeja pura', 'Miel natural recolectada de colmenas locales', 6.99, 120, 8, 4),
('Nivea Soft', 'Crema hidratante Nivea Soft', 4.99, 150, 8, 8),
('Manzanas Gala', 'Manzanas Gala frescas y deliciosas', 1.49, 200, 4, 4),
('Sony WH-1000XM4', 'Auriculares inalámbricos con cancelación de ruido', 279.99, 60, 11, 10),
('Cebollas', 'Cebollas frescas para tus platos favoritos', 0.59, 200, 4, 4),
('Banco de pesas plegable', 'Banco de pesas plegable con barra', 99.99, 50, 14, 5),
('Pack de pinceles de arte', 'Set de pinceles de pintura para artistas', 12.99, 100, 15, 12),
('Pimientos Rojos', 'Pimientos rojos frescos y nutritivos', 0.99, 200, 4, 4),
('Nike Air Force 1', 'Zapatillas deportivas Nike Air Force 1', 89.99, 50, 2, 2),
('Google Chromecast', 'Dispositivo para transmitir contenido multimedia', 29.99, 100, 1, 10),
('LEGO Classic', 'Set de ladrillos de construcción LEGO', 19.99, 100, 6, 6),
('El código Da Vinci', 'Bestseller de Dan Brown', 7.99, 80, 7, 7),
('Garnier Skin Active', 'Crema facial hidratante Garnier Skin Active', 6.99, 150, 8, 8),
('KONG Wild Knots Bear', 'Peluche resistente para perros', 11.99, 120, 10, 9),
('Bose QuietComfort 45', 'Auriculares con cancelación de ruido de Bose', 329.99, 60, 11, 10),
('Mango Vestido Plisado', 'Vestido plisado de Mango', 49.99, 25, 12, 2),
('Cinta de correr plegable', 'Cinta de correr eléctrica plegable', 299.99, 50, 14, 5),
('Plátanos Canarios', 'Plátanos Canarios de Canarias', 0.79, 200, 4, 4),
('Babolat Pure Drive', 'Raqueta de tenis Babolat Pure Drive', 219.99, 30, 5, 5),
('Amazon Echo Dot', 'Altavoz inteligente con Alexa de Amazon', 39.99, 100, 1, 10),
('Play-Doh Super Mochi', 'Set de modelado de Play-Doh para niños', 19.99, 100, 6, 6),
('1984', 'Novela distópica de George Orwell', 8.99, 80, 7, 7),
('Bicicleta estática plegable', 'Bicicleta estática plegable para ejercicios en casa', 149.99, 50, 14, 5),
('Set de óleos', 'Set de pinturas de óleo para artistas', 29.99, 100, 15, 12),
('Avena en copos', 'Avena en copos orgánica', 2.99, 200, 4, 4),
('Wilson US Open', 'Pack de 3 pelotas de tenis Wilson US Open', 5.99, 30, 5, 5),
('LEGO Star Wars', 'Set de construcción de naves de Star Wars LEGO', 79.99, 100, 6, 6),
('El señor de los anillos', 'Trilogía de El señor de los anillos', 29.99, 80, 7, 7),
('Neumáticos Pirelli P Zero', 'Neumáticos deportivos de alto rendimiento', 159.99, 40, 9, 9),
('Mango Vestido Largo', 'Vestido largo de Mango con estampado floral', 69.99, 25, 12, 2),
('Barra de dominadas ajustable', 'Barra de dominadas para puerta', 29.99, 50, 14, 5),
('Dyson V11 Absolute', 'Aspiradora sin cable con potente succión y autonomía mejorada', 599.99, 30, 3, 1),
('Instant Pot Duo', 'Olla eléctrica multifunción con múltiples modos de cocción', 129.99, 80, 5, 1),
('Balón medicional', 'Balón medicinal para entrenamiento funcional', 19.99, 50, 14, 5),
('Set de lápices de colores Prismacolor', 'Set de 12 lápices de colores Prismacolor', 9.99, 100, 15, 12),
('Samsung Galaxy Watch 4', 'Smartwatch Samsung Galaxy Watch 4', 249.99, 100, 1, 10),
('Puma Cali', 'Zapatillas deportivas Puma Cali', 69.99, 50, 2, 2),
('Fresas', 'Fresas frescas del campo', 3.99, 200, 4, 4),
('Yonex Astrox 88S', 'Raqueta de bádminton Yonex Astrox 88S', 199.99, 30, 5, 5),
('Roomba i7+', 'Robot aspirador inteligente con sistema de limpieza automática', 799.99, 50, 1, 1),
('LEGO Technic', 'Set de construcción de vehículos LEGO Technic', 99.99, 100, 6, 6),
('Crimen y castigo', 'Novela clásica de Fyodor Dostoyevsky', 8.99, 80, 7, 7),
('Neumáticos Goodyear Eagle F1 Asymmetric', 'Neumáticos de alto rendimiento para automóviles', 179.99, 40, 9, 9),
('KONG Wubba', 'Juguete de goma con cuerda para perros', 8.99, 120, 10, 9),
('Bose SoundLink Color II', 'Altavoz Bluetooth portátil resistente al agua', 129.99, 60, 11, 1),
('Sofá Chesterfield', 'Elegante sofá Chesterfield de cuero genuino', 899.99, 20, 30, 3),
('Espejo Decorativo Dorado', 'Espejo de pared decorativo con marco dorado', 149.99, 30, 30, 3),
('Lámpara de Pie Industrial', 'Lámpara de pie estilo industrial con trípode de madera', 129.99, 15, 3, 3),
('Cuadro de Paisaje Moderno', 'Cuadro moderno de un paisaje urbano en tonos azules', 79.99, 40, 3, 3),
('Mesa Auxiliar de Mármol', 'Mesa auxiliar con superficie de mármol y patas metálicas', 199.99, 25, 3, 3),
('Silla de Comedor Tapizada', 'Silla de comedor tapizada con respaldo alto y patas de madera', 79.99, 50, 3, 3),
('Estantería de Roble', 'Estantería de roble macizo con estantes ajustables', 299.99, 20, 30, 3),
('Reloj de Pared Vintage', 'Reloj de pared vintage con números romanos', 39.99, 60, 30, 3),
('Cojines Decorativos', 'Set de cojines decorativos en diferentes estampados', 24.99, 100, 3, 3),
('Jarrón de Cerámica Moderno', 'Jarrón de cerámica con diseño moderno y acabado brillante', 49.99, 80, 3, 3),
('Barra de pesas olímpica', 'Barra de pesas para levantamiento olímpico', 79.99, 50, 14, 5),
('Set de marcadores de dibujo', 'Set de 12 marcadores de dibujo de alta calidad', 9.99, 100, 15, 12);


-- Datos de ejemplo para la tabla compras
INSERT INTO compras (id_usuario) VALUES
(1), (2), (3), (9), (3), (2), (12), (5), (1), (2),
(2), (7), (7), (8), (1), (1), (4), (7), (4), (3), (10), (11), (15), (14), (14),
(2), (11), (9), (10), (8);

-- Datos de ejemplo para la tabla detalle_compras
INSERT INTO detalle_compras (id_compra, id_producto, cantidad, precio_unitario) VALUES
(1, 1, 2, 499.99),
(1, 2, 2, 19.99),
(2, 2, 3, 19.99),
(3, 3, 1, 899.99),
(4, 4, 5, 5.99),
(5, 5, 1, 129.99),
(6, 6, 2, 29.99),
(7, 7, 1, 14.99),
(8, 8, 3, 24.99),
(9, 9, 4, 199.99),
(10, 10, 2, 9.99),
(11, 11, 1, 149.99),
(12, 12, 1, 79.99),
(13, 13, 2, 349.99),
(14, 14, 1, 69.99),
(15, 15, 1, 19.99),
(16, 16, 3, 279.99),
(17, 17, 2, 39.99),
(18, 18, 1, 8.99),
(19, 19, 5, 6.99),
(20, 20, 1, 119.99),
(21, 21, 3, 7.99),
(22, 22, 2, 599.99),
(23, 23, 4, 89.99),
(24, 24, 1, 59.99),
(25, 25, 2, 0.99),
(26, 26, 3, 179.99),
(27, 27, 1, 129.99),
(28, 28, 2, 29.99),
(29, 29, 1, 79.99),
(30, 30, 1, 24.99);

-- Datos de ejemplo para la tabla valoraciones
INSERT INTO valoraciones (id_usuario, id_producto, puntuacion, comentario) VALUES
(1, 1, 5, '¡Excelente teléfono!'),
(2, 2, 4, 'Buena calidad, buen precio'),
(3, 3, 5, 'Muy cómodo y elegante'),
(4, 4, 3, 'Buena relación calidad-precio'),
(5, 5, 5, 'Perfecta para jugar tenis'),
(6, 6, 4, 'Mi hija la adora'),
(7, 7, 5, 'Muy entretenido, lo recomiendo'),
(8, 8, 4, 'Hidrata muy bien, me gusta'),
(9, 9, 5, 'Se ven geniales en mi coche'),
(10, 10, 4, 'A mi perro le encanta jugar con esto'),
(11, 11, 5, 'Sonido excelente y cómodos'),
(12, 12, 4, 'Vestido elegante y de buena calidad'),
(13, 13, 5, 'Muy resistente y bonita'),
(14, 14, 4, 'Buenas pesas para entrenar en casa'),
(15, 15, 5, 'Pinceles suaves y duraderos');