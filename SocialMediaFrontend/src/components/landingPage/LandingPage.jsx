import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
<div className='layout-top-nav'>
<div className='wrapper ' >
<nav className="main-header navbar navbar-expand-md navbar-light navbar-white" style={{marginLeft:0}}>
  <div className="container">
    <a href="../../index3.html" className="navbar-brand">
      {/* <img src="../../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} /> */}
      <span className="brand-text font-weight-light">System</span>
    </a>
    <button className="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse order-3" id="navbarCollapse">
      {/* Left navbar links */}
      <ul className="navbar-nav  ml-auto">
        <li className="nav-item">
          <Link to="/login" className="nav-link">Iniciar</Link>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">Contactos</a>
        </li>
        <li className="nav-item">
        <Link to="/dashboard"  className="nav-link">Dashboard</Link>
        </li>
    
      </ul>


    </div>
  </div>
</nav>
</div>
</div>
  );
};

export default LandingPage;
