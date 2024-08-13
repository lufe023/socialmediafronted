import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Menu from './Menu'
import { useSelector } from 'react-redux';
import { formatDate } from '../utils/dateUtils';

const NavBar = () => {
  const user = useSelector(state => state.userSlice);
  const formattedDate = formatDate(user?.createdAt);

  
  const balance = user && user.fondos ? user.fondos.balance : 0;

  // Formatear el balance
  const formattedBalance = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
  }).format(balance);
  
  return (
 <nav className="main-header navbar navbar-expand navbar-white navbar-light">
  {/* Left navbar links */}
  <ul className="navbar-nav">
  <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
      </li>
      <li className="nav-item">
        <Link to="/services"  className="nav-link">Servicios</Link>
        </li>
        <li className="nav-item">
        <Link to="/dashboard"  className="nav-link">Dashboard</Link>
        </li>    
      </ul>
    <ul className='navbar-nav ml-auto' style={{marginRight:"20px"}}>
    <li className="nav-item dropdown user-menu">
  <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
  <img src={user?.picture} className="user-image img-circle elevation-2" alt="User Image" />
    <span className="d-none d-md-inline">{user?.firstName}</span>
  </a>
  <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right" style={{left: 'inherit', right: 0}}>
    {/* User image */}
    <li className="user-header bg-primary">
      <img src={user?.picture} className="img-circle elevation-2" alt="User Image" />
      <p>
        {user?.firstName + " "+ user?.lastName}
        <small>Miembro desde {formattedDate}</small>
      </p>
    </li>
    {/* Menu Body */}
    <li className="user-body">
      <div className="row">
        <div className="col-4 text-center">
          <a href="#">Fondos</a>
        </div>
        <div className="col-4 text-center">
          <a href="#">{formattedBalance}</a>
        </div>
      </div>
      {/* /.row */}
    </li>
    {/* Menu Footer*/}
    <li className="user-footer">
      <Link to={`/me/${user.id}`} className="btn btn-default btn-flat">Perfil</Link>
      <Link to='/logout' className="btn btn-default btn-flat float-right">Cerrar Sesión</Link>
    </li>
  </ul>
</li>
{/* <li className="nav-item">
  <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
    <i className="fas fa-th-large" />
  </a>
</li> */}



</ul>
</nav>
  )
}

export default NavBar