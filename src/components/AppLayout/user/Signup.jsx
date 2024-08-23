import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Signup = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const submit = (data) => {
    setLoader(true);
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/auth/register`;
    
    axios.post(URL, data)
      .then(res => {
        setLoader(false);
        Swal.fire({
          icon: 'success',
          title: 'Usuario creado',
          text: 'Ahora puedes iniciar sesión',
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        navigate('/login');
      })
      .catch(err => {
        setMessage(err.response.data.message);
        setLoader(false);
        Swal.fire({
          icon: 'error',
          title: 'Algo anda mal',
          text: err.response.data.message,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      });
    
    reset();
  };

  return (
    <div className='register-page'>
      <div className="register-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <a href="/" className="h1"> <b>Necio</b>Shop</a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Registrar una nueva cuenta</p>
            <form onSubmit={handleSubmit(submit)}>
              <div className="input-group mb-3">
                <input 
                  {...register('firstName')}
                  className="form-control" 
                  type="text" 
                  placeholder="Nombre" 
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input 
                  {...register('lastName')}
                  className="form-control" 
                  type="text" 
                  placeholder="Apellido" 
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input 
                  {...register('email')}
                  className="form-control" 
                  type="email" 
                  placeholder="Email" 
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
                  className="form-control" 
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
              <div className="input-group mb-3">
                <input 
                  {...register('confirmPassword')} 
                  className="form-control" 
                  type="password" 
                  placeholder="Repite la contraseña" 
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
                  <div className="icheck-primary">
                    <input 
                      {...register('terms')} 
                      type="checkbox" 
                      id="agreeTerms" 
                      required
                    />
                    <label htmlFor="agreeTerms" style={{marginLeft:"5px"}}>
                      Acepto los <Link >términos</Link>
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    {loader ? 'Registrando...' : 'Registrar'}
                  </button>
                </div>
              </div>
              {message && <div className="text-danger mt-3">{message}</div>}
            </form>
            <div className="social-auth-links text-center mt-2 mb-3">
              <button onClick={() => window.location.href = `${import.meta.env.VITE_API_SERVER}/api/v1/auth/google`} className="btn btn-block btn-danger">
                <i className="fab fa-google mr-2"></i> Registrarse con Google
              </button>
            </div>
            <Link to="/login" className="text-center">Ya tengo una cuenta</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
