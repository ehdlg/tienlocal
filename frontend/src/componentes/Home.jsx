import estilos from '../estilos/Index.module.css'; // Importa los estilos CSS Modules específicos para el componente Home

// Componente funcional Home que representa la página de inicio de la aplicación
function Home() {
  return (
    <section className={estilos.wrapper}>
      {' '}
      {/* Define el contenedor principal de la sección con el estilo proporcionado */}
      <img className={estilos.logo} src='logo.png' alt='Logo de Tienlocal' />{' '}
      {/* Renderiza el logo de la aplicación con el estilo proporcionado */}
      <h1 className={estilos.titulo}>TienLocal</h1>{' '}
      {/* Renderiza el título de la aplicación con el estilo proporcionado */}
      <h2 className={estilos.subtitulo}>Tus productos locales al alcance de un click</h2>{' '}
      {/* Renderiza el subtítulo de la aplicación con el estilo proporcionado */}
    </section>
  );
}

export default Home; // Exporta el componente Home
