import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Menu from './Menu'
import { useSelector } from 'react-redux';
import { formatDate } from '../utils/dateUtils';

const NavBar = () => {
  const user = useSelector(state => state.userSlice);
  const formattedDate = formatDate(user?.createdAt);
  return (
 <nav className="main-header navbar navbar-expand navbar-white navbar-light">
  {/* Left navbar links */}
  <ul className="navbar-nav">
  <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
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
          <a href="#">5,000</a>
        </div>
      </div>
      {/* /.row */}
    </li>
    {/* Menu Footer*/}
    <li className="user-footer">
      <a href="#" className="btn btn-default btn-flat">Profile</a>
      <Link to='/logout' className="btn btn-default btn-flat float-right">Sign out</Link>
    </li>
  </ul>
</li>


</ul>
</nav>
  )
}

export default NavBar