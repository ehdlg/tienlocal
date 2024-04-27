import estilos from '../estilos/Index.module.css';

function Home() {
  return (
    <section className={estilos.wrapper}>
      <img className={estilos.logo} src='logo.png' alt='Logo de Tienlocal' />
      <h1 className={estilos.titulo}>TienLocal</h1>
      <h2 className={estilos.subtitulo}>Tus productos locales al alcance de un click</h2>
    </section>
  );
}

export default Home;
