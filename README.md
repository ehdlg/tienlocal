# TienLocal

## Descripción

TienLocal es una plataforma diseñada para conectar a las pequeñas empresas locales con los consumidores. Permite a los comercios locales digitalizarse y promocionar sus productos y servicios de manera fácil y eficiente. Los usuarios pueden explorar y comprar productos y servicios locales a través de una interfaz amigable e intuitiva.

## Sitio Web

- Puedes visitar la plataforma TienLocal en [tienlocal.vercel.app](https://tienlocal.vercel.app).

- Puedes visitar la API de la web en [tienlocal-api.onrender.com/api](https://tienlocal-api.onrender.com/api)

## Tecnologías Utilizadas

### Frontend

- **React**: Utilizado para construir la interfaz de usuario, proporcionando una experiencia interactiva y dinámica.
- **React Router DOM**: Facilita el enrutamiento dentro de la aplicación web, permitiendo una navegación fluida entre diferentes páginas.
- **HTML**: Estructura de las páginas web.
- **CSS**: Estilización y diseño visual de la aplicación.

### Backend

- **Node.js**: Entorno de ejecución para construir la API del servidor.
- **Express**: Framework para aplicaciones web en Node.js, utilizado para construir la API REST.
- **MariaDB**: Sistema de gestión de bases de datos relacional.
- **MySQL2**: Controlador utilizado para conectar Node.js y Express con la base de datos MariaDB.
- **JWT (JSON Web Tokens)**: Utilizado para la autenticación y autorización segura de los usuarios.

### Arquitectura

- **API REST**: La API sigue el patrón de diseño MVC (Modelo-Vista-Controlador). Los modelos gestionan las operaciones de base de datos, los controladores procesan las solicitudes y envían respuestas en formato JSON, y las rutas están organizadas según las tablas de la base de datos.

## Instalación local

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/usuario/tienlocal.git
   cd tienlocal
   ```

2. Crear la base de datos utilizando los archivos `creacion.sql` e `insercion.sql` con MariaDB:

   ```sql
   SOURCE path/to/creacion.sql;
   SOURCE path/to/insercion.sql;
   ```

3. Añadir los archivos `.env` tanto para el backend como para el frontend:

   - Para el backend: Rellena el archivo `.env` basándote en `.env.template` con los datos necesarios para conectar con la base de datos.
   - Para el frontend: Rellena el archivo `.env` basándote en `.env.template` con la URL de la API.

4. Instalar las dependencias:

   ```bash
   npm install
   ```

5. Ejecutar tanto el frontend como el backend:

   ```bash
   npm run install
   ```

   Nota: Asegúrate de que el servicio de MariaDB esté correctamente configurado y ejecutandose.
