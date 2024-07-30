
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import getConfig from '../../utils/getConfig'
import Aside from '../Aside'
import NavBar from '../NavBar'
import Spinner from '../../utils/Spiner'
import { Link } from 'react-router-dom'

const UserDashBoard = () => {
  const [users, setUsers] = useState([])

  const getAllUsers = ()=>{
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/users?offset=0&limit=20`
      axios.get(URL, getConfig())
      .then(res => {
      setUsers(res.data)
      })
      .catch(err =>{
        console.log(err)
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 6000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: `Accion no permitida: ${err.response.data.message}`
        })
      })
      
  }
  useEffect(() => {
  getAllUsers()
  }, [])
  return (
    <div>
        <NavBar/>
        <Aside/>
        <div className="content-wrapper">
    <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Colaboradores</h1>
        </div>
            <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><Link to={'/dashboard'} href="#">Dashboard</Link></li>
            <li className="breadcrumb-item active">Usuarios</li>
            </ol>
            </div>
      </div>
    </div>
  </section>
  <section className="content">
  <div className="row">
    <div className="col-12">
  <div className="card">
  <div className="card-header">
    <h3 className="card-title">Colaboradores</h3>
    <div className="card-tools">
      <div className="input-group input-group-sm" style={{width: 150}}>
        <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
        <div className="input-group-append">
          <button type="submit" className="btn btn-default">
            <i className="fas fa-search" />
          </button>
        </div>
      </div>
    </div>
  </div>
  {/* /.card-header */}
  <div className="card-body table-responsive p-0" style={{height: 300}}>
 
    <table className="table table-head-fixed text-nowrap">
      <thead>
        <tr>
          <th></th>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Correo</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
      {
        users?.map((user) => 
        <tr key={user.id}>
            <td>
            <Link to={`/administrator/${user.id}`} >
            <img className="img-circle img-bordered-sm" src={user.picture?user.picture:"dist/img/nopeople.jpg"} alt="user image" style={{height:'40px'}} />
            </Link>
            </td>
            <td><Link to={`/administrator/${user.id}`} >{`${user.firstName} ${user.lastName}`}</Link></td>
            <td>{user.user_role.roleName}</td>
            <td>{user.email} </td>
            <td>{user.status} </td>
            <td>
            <Link className="btn btn-default" to={`/administrator/${user.id}`}><i className="fas fa-user-edit"/> Administrar</Link>
            </td>
          </tr>
        )
        }
      </tbody>
    </table>
    {users.length==0?<div style={{width:"100%", display:"flex", justifyContent:"center"}}><Spinner/></div>:""}
  </div>
</div>
</div>
</div>
    
</section>
</div>
</div>
)
}

export default UserDashBoard
