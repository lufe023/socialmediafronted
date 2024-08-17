import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import getUserbyId from './getMyUser';

const Login = () => {
  const [isLogged, setIsLogged] = useState(localStorage.getItem('token'));
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    const error = urlParams.get('error');
    
    if (token) {
      localStorage.setItem('token', token);
      setIsLogged(true);
      navigate('/dashboard');
    } else if (error) {
      setMessage(error);
      Swal.fire({
        icon: 'error',
        title: 'Algo anda mal',
        text: error,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  }, [location, navigate]);

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

  if (isLogged) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <div className='login-page'>
      <div className="login-box" style={{ margin: '0 auto 40px auto' }}>
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <a href="/" className="h1"><b>Necio</b></a>
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
                    {message && <div className="swalDefaultError">{message}</div>}
                  </div>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block" onClick={() => setLoader(true)}>Iniciar</button>
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
    </div>
  );
};

export default Login;
