import { Outlet } from 'react-router-dom';

/**
 * Componente principal que renderiza las rutas anidadas.
 */
function Main() {
  return (
    <main>
      <Outlet /> {/* Renderiza las rutas anidadas */}
    </main>
  );
}

export default Main;
