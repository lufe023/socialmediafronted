import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Aside = () => {
  const user = useSelector(state => state.userSlice);
  const location = useLocation();

  // Check if any child route is active

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to='/' className="brand-link">
        <span className="brand-text font-weight-light">Necio Shop</span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src={user?.picture ? user.picture : "/img/noprofilepic.jpg"} className="img-circle elevation-2" alt="User Image" />
          </div>
          <div className="info">
            <Link to={`/me/${user.id}`} className="d-block">{user?.firstName}</Link>
          </div>
        </div>
        <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw" />
              </button>
            </div>
          </div>
        </div>
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            
            <li className="nav-item">
              <NavLink to='/dashboard' className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>Panel Principal</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/me/${user.id}`} className="nav-link">
              <i className="fas fa-user-tie nav-icon" />
                <p>Perfil</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/services'} className="nav-link">
                <i className="fas fa-circle nav-icon" />
                <p>Servicios</p>
              </NavLink>
            </li>

            <li  className={'nav-item menu-is-openig menu-open'}>
                <NavLink  className={({isActive}) => isActive ? 'nav-link active bg-info' : 'nav-link'}>
                  <i className="nav-icon fas fa-tools" />

                  <p>
                    Administración
                    <i className="right fas fa-angle-left" />
                  </p>
                </NavLink>
              <ul className="nav nav-treeview">
                {/* <li className="nav-item">
                  <NavLink to='/administrator/user'className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                    <i className="fas fa-users nav-icon" />
                    <p>Usuarios</p>
                  </NavLink>
                </li> */}
                <li className="nav-item">
                  <NavLink to='/users' className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                    <i className="nav-icon fas fa-users" />
                    <p>Usuarios</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to='/administrator/admin' className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                    <i className="nav-icon  fas fa-edit" />
                    <p>Configuración</p>
                  </NavLink>
                </li>
                {/* <li className="nav-item">
                  <NavLink to='/audit' className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                    <i className="nav-icon  fas fa-edit" />
                    <p>Auditoria</p>
                  </NavLink>
                </li> */}
              </ul>
              
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Aside;
