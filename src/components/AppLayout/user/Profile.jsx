import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import getConfig from '../../utils/getConfig'
import Aside from '../Aside'
import Cargando from '../../utils/Cargando'

import copy from 'clipboard-copy';
import Swal from 'sweetalert2'
import changeUserRole from './changeUserRole'
import NavBar from '../NavBar'
import UpdateDataUser from './Forms/UpdateDataUser'
import FundTransactionForm from './FundTransactionForm'
import TransactionsHistory from './TransactionsHistory'
import getHistoryTransactions from './getHistoryTransactions'

const Profile = () => {

        const [people, setPeople] = useState()
        const [user, setUser] = useState()
        const [updates, setUpdates] = useState()
        const [selectedRole, setSelectedRole] = useState("");
        const {id} = useParams()
        const [transactions, setTransactions] = useState([]);
        
        const getPeople = ()=>{
          const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/users/me`
            axios.get(URL, getConfig())
            .then(res => {
            setPeople(res.data)
            setUser(res.data)
            })
            .catch(err => console.log(err))
        }
        useEffect(() => {
          getPeople()
          getHistoryTransactions(id, setTransactions);
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
        <h1>Mi Perfil</h1>
      </div>
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><Link to='/administrator' >Usuarios</Link></li>
          <li className="breadcrumb-item active">Perfil</li>
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
              <Link to="/forgotPassword" className="btn btn-primary btn-block"><b>Restablecer Contraseña</b></Link>
              </li>
            </ul>
          </div>
        </div>
        
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

<TransactionsHistory transactions={transactions}/>
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

export default Profile