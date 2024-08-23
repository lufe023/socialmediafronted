// LoginForm.jsx
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import getUserbyId from '../getMyUser';
import Spinner from '../../../utils/Spiner';


const LoginForm = ({setIsLogged}) => {

    const [message, setMessage] = useState('');
    const [loader, setLoader] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

  const submit = data => {
    setLoader(true);
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/auth/login`;
    axios.post(URL, data)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        getUserbyId(dispatch);
   
        setIsLogged(true); 
        setLoader(false);

        Swal.fire({
          icon: 'success',
          title: 'Bienvenido',
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      })
      .catch(err => {
        setMessage(err.response.data.message);
        setLoader(false);
        Swal.fire({
          icon: 'error',
          title: 'Algo anda mal',
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      });
    reset({ password: '' });
  };

  const startWithGoogle = () => {
    window.location.href = `${import.meta.env.VITE_API_SERVER}/api/v1/auth/google`;
  };

  return (
    <>
    {loader?<Spinner/>:
    <div className="login-box" style={{ margin: '0 auto 40px auto' }}>
      <div className="card card-outline card-primary">
      <div className="card-header text-center">
            <Link href="/" className="h1" style={{color:"black"}}> <b>Iniciar</b></Link>
          </div>
        <div className="card-body">
          <p className="login-box-msg">Inicia sesión</p>
          <form onSubmit={handleSubmit(submit)}>
            <div className="input-group mb-3">
              <input 
                {...register('email')}
                className='form-control' 
                type="text" 
                placeholder="Usuario"
                required
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope" />
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input 
                {...register('password')} 
                className='form-control' 
                type="password" 
                placeholder="Contraseña"
                required
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-8">
                {loader ? "Cargando" : ''}
                <div className="error">
                  {message &&
                  <div className="alert alert-danger ">
  {message}
</div>
}

                </div>
              </div>
              <div className="col-4">
                <button type="submit" className="btn btn-primary btn-block">Iniciar</button>
              </div>
            </div>
          </form>
          <div className="social-auth-links text-center mt-2 mb-3">
            <button onClick={startWithGoogle} className="btn btn-block btn-danger">
              <i className="fab fa-google mr-2"></i> Inicia sesión con Google
            </button>
          </div>
          <p className="mb-1">
            <Link to='/forgotPassword'>Olvidé la contraseña</Link>
          </p>
          <p className="mb-0">
            <Link to='/signup' className="text-center">Crear usuario</Link>
          </p>
        </div>
      </div>
    </div>
    }
    </>
  );
};

export default LoginForm;
