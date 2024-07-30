import React from 'react'
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'

const Aside = () => {
  const user = useSelector(state => state.userSlice);
  return (
<aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
  <Link to='/' className="brand-link">
    {/* <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} /> */}
    <span className="brand-text font-weight-light">Social Media Project</span>
  </Link>
  {/* Sidebar */}
  <div className="sidebar os-host os-theme-light os-host-overflow os-host-overflow-y os-host-resize-disabled os-host-transition os-host-scrollbar-horizontal-hidden">
    <div className="os-resize-observer-host observed">
        <div className="os-resize-observer" style={{left: 0, right: 'auto'}} />
        </div><div className="os-size-auto-observer observed" style={{height: 'calc(100% + 1px)', float: 'left'}}>
            <div className="os-resize-observer" /></div><div className="os-content-glue" style={{margin: '0px -8px', width: 249, height: 0}} />
            <div className="os-padding">
              <div className="os-viewport os-viewport-native-scrollbars-invisible" style={{overflowY: 'scroll'}}>
                <div className="os-content" style={{padding: '0px 8px', height: '100%', width: '100%'}}>
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src={user?.picture} className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <a href="#" className="d-block">{user?.firstName}</a>
            </div>
          </div>
          {/* SidebarSearch Form */}
          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw" />
                </button>
              </div>
            </div><div className="sidebar-search-results"><div className="list-group"><a href="#" className="list-group-item"><div className="search-title"><strong className="text-light" />N<strong className="text-light" />o<strong className="text-light" /> <strong className="text-light" />e<strong className="text-light" />l<strong className="text-light" />e<strong className="text-light" />m<strong className="text-light" />e<strong className="text-light" />n<strong className="text-light" />t<strong className="text-light" /> <strong className="text-light" />f<strong className="text-light" />o<strong className="text-light" />u<strong className="text-light" />n<strong className="text-light" />d<strong className="text-light" />!<strong className="text-light" /></div><div className="search-path" /></a></div></div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
              <li className="nav-item">
                <NavLink to={'/dashboard'} className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    Panel Principal
                  </p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={'/administrator'} className="nav-link">
                <i className="nav-icon fas fa-users" />
                  <p>
                    Usuarios
                  </p>
                </NavLink>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div></div></div><div className="os-scrollbar os-scrollbar-horizontal os-scrollbar-auto-hidden os-scrollbar-unusable"><div className="os-scrollbar-track"><div className="os-scrollbar-handle" style={{width: '100%', transform: 'translate(0px, 0px)'}} /></div></div><div className="os-scrollbar os-scrollbar-vertical os-scrollbar-auto-hidden"><div className="os-scrollbar-track"><div className="os-scrollbar-handle" style={{height: '65.3422%', transform: 'translate(0px, 0px)'}} /></div></div><div className="os-scrollbar-corner" /></div>
  {/* /.sidebar */}
</aside>


  )
}

export default Aside