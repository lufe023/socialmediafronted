import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar'
import Aside from '../Aside'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import copy from 'clipboard-copy';
import Swal from 'sweetalert2'

const Asignation = () => {
  const [people, setPeople] = useState('')
  const {id} = useParams()
  const urlRecuperation =  `${import.meta.env.VITE_FRONT_DOMAIN}/#recoverypassword/${people?.passwordRequest}`;

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

  const getPeople = ()=>{
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/users/${id}`
      axios.get(URL, getConfig())
      .then(res => {
      setPeople(res.data)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getPeople()
  }, [id])
  console.log(people)
  return (
    <>
    <NavBar/>
    <Aside/>
      <div className="content-wrapper">
      <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Perfil</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><Link to={'/administrator'}>Usuarios</Link></li>
              <li className="breadcrumb-item active">Perfil de Usuario</li>
            </ol>
          </div>
        </div>
      </div>
      
</section>
<section className="content">
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-3">
        {/* Profile Image */}
        <div className="card card-primary card-outline">
          <div className="card-body box-profile">
            <div className="text-center">
              <img className="profile-user-img img-fluid img-circle" src={people.picture?people.picture:"dist/img/nopeople.jpg"} alt="User profile picture" />
            </div>
            <h3 className="profile-username text-center">{people?.firstName + ' '+ people?.lastName}</h3>
            <p className="text-muted text-center">{people?.user_role?.roleName}</p>
            <ul className="list-group list-group-unbordered mb-3">
              <li className="list-group-item">
                <b>Fondos</b> <a className="float-right">4,000.00</a>
              </li>
            </ul>
            <a href="#" className="btn btn-primary btn-block"><b>Desactivar</b></a>
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}

      </div>
      {/* /.col */}
      <div className='col-md-9'>
      <div className="card">
      <div className="card-header">
      <h3 className="card-title">Configuración</h3>
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
  <div className="tab-pane" id="settings">
                <form className="form-horizontal">
                  <div className="form-group row">
                    <label htmlFor="inputName" className="col-sm-2 col-form-label">Nombre</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" id="inputName" value={people?.firstName} placeholder="Nombre" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="inputName" className="col-sm-2 col-form-label">Apellido</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" id="lastName" value={people?.lastName} placeholder="Apellido" name='lastName' />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Correo</label>
                    <div className="col-sm-10">
                      <input type="email" className="form-control" value={people?.email} id="inputEmail" placeholder="Correo" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Rol</label>
                    <div className="col-sm-10">
                  <select className="form-control">
                  <option>Cliente</option>
                  <option>Administrador</option>
                </select>
                </div>
                </div>

                
                  <div className="form-group row">
                    <div className="offset-sm-2 col-sm-10">
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </form>
              
              </div>
  </div>
  <div className="card-footer p-0" style={{display: 'block'}}>

  </div>
  {/* /.footer */}
</div>

<div className="card">
      <div className="card-header">
      <h3 className="card-title">Petición para reiniciar contraseña</h3>
        <div className="card-tools">
          <button type="button" className="btn btn-tool" data-card-widget="collapse">
            <i className="fas fa-minus" />
          </button>
          <button type="button" className="btn btn-tool" data-card-widget="remove">
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
      <div className="card-body">
                <ul className="list-group list-group-unbordered mb-3">
                    <li className="list-group-item">
                        <b>Codigo:</b> {people.passwordRequest}<a className="float-right">
                          <button className='btn btn-primary' onClick={()=> copiarUrlRecupeacion()}>Copiar URL</button>
                          </a>
                      </li>
                </ul>
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
  
     </div>
    {/* /.row */}
  </div>
</section>

      </div>
    </>
  )
}

export default Asignation