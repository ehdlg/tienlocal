import estilos from '../estilos/About.module.css';

function About() {
  return (
    <div className={estilos.wrapper}>
      <h1>Acerca de</h1>
      <p>
        Bienvenido a a TienLocal, una plataforma diseñada para acercar a usuarios y empresas locales de una manera fácil
        y efectiva.
      </p>
      <p>
        Nuestro objetivo es promover la economía y el comercio local al ofrecer una tienda de venta online donde las
        empresas locales puedan mostrar y vender sus productos directamente a los usuarios de la comunidad.
      </p>
      <p>
        Creemos firmemente en el poder de la digitalización para ayudar a las pequeñas empresas a aumentar su presencia
        en Internet y llegar a un público más amplio. Por eso, nuestra plataforma proporciona a las empresas locales las
        herramientas necesarias para digitalizarse y expandir su alcance en línea.
      </p>
      <p>
        Al comprar a través de nuestra plataforma, no solo estás adquiriendo productos de calidad, sino que también
        estás apoyando a las empresas locales y contribuyendo al crecimiento de la economía de tu comunidad.
      </p>
      <p>¡Únete a nosotros y sé parte del movimiento para fortalecer y promover el comercio local!</p>
    </div>
  );
}

export default About;
