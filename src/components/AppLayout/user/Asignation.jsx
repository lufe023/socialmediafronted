import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import getConfig from '../../utils/getConfig'
import Aside from '../Aside'
import Cargando from '../../utils/Cargando'
import userDisable from './userDisable'
import copy from 'clipboard-copy';
import Swal from 'sweetalert2'
import changeUserRole from './changeUserRole'
import NavBar from '../NavBar'
import UpdateDataUser from './Forms/UpdateDataUser'
import FundTransactionForm from './FundTransactionForm'

const Asignation = () => {

        const [people, setPeople] = useState()
        const [user, setUser] = useState()
        const [updates, setUpdates] = useState()
        const [selectedRole, setSelectedRole] = useState("");
        const {id} = useParams()

        const getPeople = ()=>{
          const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/users/${id}`
            axios.get(URL, getConfig())
            .then(res => {
            setPeople(res.data)
            setUser(res.data)
            })
            .catch(err => console.log(err))
        }
        useEffect(() => {
          getPeople()
        }, [id])
      
const urlRecuperation =  `${import.meta.env.VITE_FRONT_DOMAIN}/#recoverypassword/${user?.passwordRequest}`;

  const copiarUrlRecupeacion = () => {
    copy(urlRecuperation)
      .then(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'URL de recuperación copiada al porta papeles'
        })
      })
      .catch((err) => {
        console.error('Error al copiar al portapapeles: ', err);
      });
  };

  const balance = user && user.fondos ? user.fondos.balance : 0;

  // Formatear el balance
  const formattedBalance = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
  }).format(balance);



  return (
 <>
    <NavBar/>
    <Aside/>
    <div className="content-wrapper">
        <section className="content-header">
        <div className="container-fluid">
      <div className="row mb-2">
      <div className="col-sm-6">
        <h1>Administrar Usuario</h1>
      </div>
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><Link to='/administrator' >Usuarios</Link></li>
          <li className="breadcrumb-item active">Administrar Usuario</li>
        </ol>
      </div>
    </div>
  </div>
</section>
<section className="content">
  <div className="container-fluid">
  {
    people?
    <div className="row">
      <div className="col-md-3">
        {/* Profile Image */}
        <div className="card card-primary card-outline">
          <div className="card-body box-profile">
            <div className="text-center">
            <img className="profile-user-img img-fluid img-circle" src={people.picture?people.picture:"dist/img/nopeople.jpg"} alt="User profile picture" />
            </div>
            <h3 className="profile-username text-center">{people?.firstName} {people?.lastName}</h3>
            <p className="text-muted text-center">{people?.nickname}</p>
            <ul className="list-group list-group-unbordered mb-3">
            <li className="list-group-item">
                <b>Correo</b> <a className="float-right">{user?.email}</a>
              </li>
              <li className="list-group-item">
  
                <b>Fondos</b> <a className="float-right">{formattedBalance}</a>
              </li>
              <li className="list-group-item">
                <b>Rol</b> <a className="float-right">{user?.user_role?.roleName}</a>
              </li>
              <li className="list-group-item">
                
                <b>Estado</b> 
                {
                  user.active?<a className="float-right">
                    <button className='btn btn-success btn-xs'> Activado</button>
                    </a>
                  :<a className="float-right">
                    <button className='btn btn-danger btn-xs'> Inactivo </button>
                    
                    </a> 
                }
              </li>
              {
                  user.active?
              <button href="#" className="btn btn-danger btn-block" onClick={()=> (userDisable(user.id, false), getPeople())}><b>Desactivar</b></button>
              :
              <button href="#" className="btn btn-primary btn-block" onClick={()=> (userDisable(user.id, true), getPeople())}><b>Activar</b></button>
                }
            </ul>
          </div>
        </div>
        <FundTransactionForm userId={id} getPeople={getPeople}/>
      </div>
      {/* /.col */}
      <div className="col-md-9">
      <div className="card">
          <div className="card-header p-1">
            <ul className="nav nav-pills">
              <li className="nav-item"><a className="nav-link active" href="#editar" data-toggle="tab">Editar</a></li>
              
            </ul>
          </div>{/* /.card-header */}
          <div className="card-body">
            <div className="tab-content">
              <div className="tab-pane active" id="editar">
              <UpdateDataUser updates={updates} citizen={people} getPeople={getPeople} />
              </div>
        
            </div>
          </div>
        </div>
      {
        user.passwordRequest?
        <div className="card card-default">
        <div className="card-header">
          <h3 className="card-title">Recuperar de Clave</h3>
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
        <div className="card-body">
        <ul className="list-group list-group-unbordered mb-3">
            <li className="list-group-item">
                <b>Codigo:</b> {user.passwordRequest}<a className="float-right">
                  <button className='btn btn-primary' onClick={()=> copiarUrlRecupeacion()}>Copiar URL</button>
                  </a>
              </li>
    </ul>
    </div>
    </div>
:""
}
  <div className="card card-default">
  <div className="card-header">
    <h3 className="card-title">Roles de Usuario</h3>
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
  <div className="card-body">

    <div className="row">
  <div className="col-sm-6">
    {/* Select multiple*/}
    <div className="form-group">
      <label>Cambiar Rango</label>
      <select className="form-control"
      value={selectedRole}
      onChange={(e) => setSelectedRole(e.target.value)}
      size={5}
      >
        <option value={1}>Cliente</option>
        <option value={2}>Administrador</option>
      </select>
    </div>
    <button className='btn btn-primary' onClick={()=> changeUserRole(user.id, selectedRole, getPeople)}>Asignar Rol</button>
  </div>
  <div className="col-sm-6">
  <div className="form-group">
  <label>Descripción</label>
 <div id="accordion">
  <div className="card card-primary">
    <div className="card-header">
      <h4 className="card-title w-100">
        <a className="d-block w-100 collapsed" data-toggle="collapse" href="#collapseOne">
        <i className="fas fa-user" /> Cliente (Nivel 1)
        </a>
      </h4>
    </div>
    <div id="collapseOne" className="collapse" data-parent="#accordion">
      <div className="card-body">
      Este usuario solo tendrá a acceso y funciones disponible para cliente, compra de servicios, activar servicios
      </div>
    </div>
  </div>

  <div className="card card-success">
    <div className="card-header">
      <h4 className="card-title w-100">
        <a className="d-block w-100" data-toggle="collapse" href="#collapseThree">
        <i className="fas fa-user-cog"/> Administrador (Nivel 2)
        </a>
      </h4>
    </div>
    <div id="collapseThree" className="collapse" data-parent="#accordion">
      <div className="card-body">
      El Administrador ostenta el rango más alto en el sistema tiene privilegio para administrar otros usuarios y ver areas que un usuario de menor rango puede ver.
      </div>
    </div>
  </div>
</div>
</div>

  
  </div>
</div>

  </div>

  <div className="card-footer">
  
  </div>
</div>
<div className="card">
      <div className="card-header">
      <h3 className="card-title">Transacciones</h3>
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
  <div className="card-body" style={{display: 'block'}}>
  <div className="tab-pane" id="timeline">
                {/* The timeline */}
                <div className="timeline timeline-inverse">
                    <div>
                    <i className="fas fa-plus bg-success" />
                    <div className="timeline-item">
                      <span className="time"><i className="far fa-clock" /> 10 Feb. 2014</span>
                      <h3 className="timeline-header"><a href="#">  Deposito sub Agente</a></h3>
                      <div className="timeline-body">
                  
                        Se hizo un deposito vía oxxo tiket #454654
                        <br/>
                        <b>
                        <span style={{fontWeight:"500"}}> Monto: </span> 5,000.00
                        </b>
                      </div>
                      <div className="timeline-footer">
                      </div>
                    </div>
                  </div>
                  {/* END timeline item */}

                  <div>
                    <i className="fas fa-minus bg-danger" />
                    <div className="timeline-item">
                      <span className="time"><i className="far fa-clock" /> 11 Feb. 2014</span>
                      <h3 className="timeline-header"><a href="#"> Seguidores de prueba NO VENTA</a></h3>
                      <div className="timeline-body">
                  
                      Servicios de prueba instagram no garantizado, solo prueba
                        <br/>
                        <b>
                        <span style={{fontWeight:"500"}}> Monto: </span> 1,000.00
                        </b>
                      </div>
                      <div className="timeline-footer">
                      </div>
                    </div>
                  </div>

                  <div>
                    <i className="far fa-clock bg-gray" />
                  </div>
                </div>
              </div>
  </div>
  <div className="card-footer p-0" style={{display: 'block'}}>

  </div>
  {/* /.footer */}
</div>
</div>
    
      {/* /.col */}
    </div>
    :<div className='' style={{height:"200px", marginBottom:"50px", width:"100%",  display:"flex", justifyContent:"center"}}>
    <div style={{alignContent:"center",}}>
    <Cargando escala='2'/>
    Cargando...
    </div>
    </div>
  }
    {/* /.row */}
  </div>{/* /.container-fluid */}
</section>
</div>

 </>
  )
}

export default Asignation