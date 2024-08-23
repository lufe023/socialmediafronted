import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HowToPlace from './HowToPlace';
import {useSelector } from 'react-redux';
import './LandingPage.css'
import SocialMediaCarousel from './SocialMediaCarousel';
import WhatsAppChatBubble from '../WhatsAppChatBubble';
import LoginForm from '../AppLayout/user/Forms/LoginForm';
import robot from "../../assets/technical-support.png"
import Footer from './Footer';

const LandingPage = () => {
  const [isLogged, setIsLogged] = useState(localStorage.getItem('token'));

  const user = useSelector(state => state.userSlice);

  return (
<div className='layout-top-nav'>
<div className='' >
<nav className="main-header navbar navbar-expand-md navbar-light navbar-white" style={{marginLeft:0}}>
  <div className="container">
    <a href="../../index3.html" className="navbar-brand">
      {/* <img src="../../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} /> */}
      <span className="brand-text font-weight-light">Necio Shop</span>
    </a>
    <button className="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse order-1" id="navbarCollapse">
      {/* Left navbar links */}
      <ul className="navbar-nav  ml-auto">
        <li className="nav-item">
          <Link to="/login" className="nav-link">Iniciar</Link>
        </li>
        <li className="nav-item">
          <a target='_blank' href="https://wa.me/message/YMFN5X4CFQF2K1" className="nav-link">Contactos</a>
        </li>
        <li className="nav-item">
        <Link to="/services"  className="nav-link">Servicios</Link>
        </li>
        <li className="nav-item">
        <Link to="/dashboard"  className="nav-link">Dashboard</Link>
        </li>

      </ul>
      

    </div>
    {isLogged?
    <div className="collapse navbar-collapse order-3" id="navbarCollapse">
    <ul className='navbar-nav ml-auto' style={{ marginRight: "0px" }}>
        <li className="nav-item dropdown user-menu">
          <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
            <img
              src={user?.picture ? user.picture : "/img/noprofilepic.jpg"}
              className="user-image img-circle elevation-2"
              alt="User Image"
            />
            <span className="d-none d-md-inline">{user?.firstName}</span>
          </a>
          <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right" style={{ left: 'inherit', right: 0 }}>
            {/* User image */}

            {/* Menu Footer*/}
            <li className="user-footer">
              <Link to={`/me/${user.id}`} className="btn btn-primary btn-flat">Perfil</Link>
              <Link to='/logout' className="btn btn-danger btn-flat float-right">Cerrar Sesión</Link>
            </li>
          </ul>
        </li>
      </ul>
      </div>
      :""}
  </div>
</nav>
<WhatsAppChatBubble/>
<div className="row hero"   >
  <div className="col-md-6 order-2 p-4" style={{display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
    {/* <img src={`${backgroundImage}`}/> */}
    <article className='Articulo'>
  <h1>Aumenta tu presencia en redes sociales</h1>
  <p className="lead mt-4">
    <span>¿Quieres hacer crecer tus redes sociales y mejorar tu visibilidad online sin gastar una fortuna? </span>Estás en el lugar correcto. Ofrecemos la posibilidad de aumentar tus seguidores y likes de manera rápida y económica. Con nuestras estrategias automatizadas y herramientas avanzadas, podrás conectar con miles de seguidores y llevar tu marca al siguiente nivel a un precio que no podrás creer.
  </p>
  <a href="https://wa.me/message/YMFN5X4CFQF2K1" target='_blanck' className="btn btn-primary btn-lg mt-3 mx-auto">
    ¡Contáctanos ahora!
  </a>
</article>
  </div>
  <div className="col-md-6 order-1 order-lg-2 d-flex justify-content-center align-items-center">
   {isLogged? <img src={robot} alt="Hero Background" />:
   <LoginForm setIsLogged={setIsLogged} isLogged={isLogged}/>
}
  </div>
 
</div>

<SocialMediaCarousel className='hero'/>

</div>
<div>

 
  <HowToPlace/>
<Footer/>
</div>
</div>
  );
};

export default LandingPage;
