import React from 'react'
import { Link } from 'react-router-dom'

const AllUsers = ({users, userDisable, getAllUsers, currentPage}) => {

  return (
  <div className="card">
  <div className="card-header">
    <h3 className="card-title">Lista de Colaboradores</h3>
    <div className="card-tools">
      <button type="button" className="btn btn-tool" data-card-widget="collapse">
        <i className="fas fa-minus" />
      </button>
      <button type="button" className="btn btn-tool" data-card-widget="remove">
        <i className="fas fa-times" />
      </button>
    </div>
  </div>
  {/* /.card-header */}
  <div className="card-body p-0" style={{display: 'block'}}>
    <ul className="products-list product-list-in-card pl-2 pr-2">
    { 
    users?.map((user) => 
    <li className="item" key={user.id}> 

    <div className="product-img">
          <img src={user?.picture} alt="Product Image" className="img-size-50" />
          
        </div>
        <div className="product-info">
          <Link to={`/mypeople/${user.id}`} className="product-title">{`${user.firstName} ${user.lastName}`}
          <span className={`badge float-right ${user.user_role.roleName=='Administrator'?'badge-warning':user.user_role.roleName=='Super Admin'?'badge-danger':user.user_role.roleName=='Delegado'?'badge-info':'badge-success'}`}>{user.user_role.roleName}</span>
          
          </Link>
            
          <span className="product-description">
          {user.email}
          </span>
          
          <Link to={`/administrator/user/${user.id}`}>
          {user.active?<button className='btn btn-success btn-xs'>Activado</button>:<button className='btn btn-danger btn-xs'>Desactivado</button>}
          </Link>
          {' '}
          <Link to={`/administrator/user/${user.id}`}>
          <button className='btn btn-warning btn-xs'>Administrar</button></Link> 
        </div>
    </li>
    )}

    </ul>
  </div>
  {/* /.card-body */}
  <div className="card-footer text-center" style={{display: 'block'}}>
    
  </div>
  {/* /.card-footer */}
</div>

  )
}

export default AllUsers