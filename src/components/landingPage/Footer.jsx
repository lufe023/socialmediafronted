import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Asegúrate de tener este archivo para estilos adicionales

const Footer = () => {
  return (

    <footer className="bg-dark text-light p-5" style={{marginTop:"200px"}}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5 className="text-uppercase">Sobre Nosotros</h5>
            <p>
              Necio Shop es tu aliado en el crecimiento de tus redes sociales. Ofrecemos estrategias efectivas para aumentar tu visibilidad online.
            </p>
          </div>
          <div className="col-md-4">
            <h5 className="text-uppercase">Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light link-underline link-underline-opacity-0">Inicio</Link></li>
              <li><Link to="/services" className="text-light link-underline link-underline-opacity-0">Servicios</Link></li>
              <li><Link to="/contact" className="text-light link-underline link-underline-opacity-0">Contacto</Link></li>
              <li><Link to="/about" className="text-light link-underline link-underline-opacity-0">Sobre Nosotros</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="text-uppercase">Contacto</h5>
            <p>Correo electrónico: <a href="mailto:info@necioshop.com" className="text-light link-underline link-underline-opacity-0">info@necioshop.com</a></p>
            
            <p>Síguenos en:</p>
            {/* <ul className="list-unstyled d-flex m">
              <li className="me-3"><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light link-underline link-underline-opacity-0">Facebook</a></li>
              <li className="me-3"><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light link-underline link-underline-opacity-0">Twitter</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light link-underline link-underline-opacity-0">Instagram</a></li>
            </ul> */}
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center mt-4">
            <p>&copy; {new Date().getFullYear()} Necio Shop. Todos los derechos reservados.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center mt-4">
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
