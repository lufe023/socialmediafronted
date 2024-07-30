import React, { useState } from 'react';
import axios from 'axios';
import Cargando from '../../../utils/Cargando';
import getConfig from '../../../utils/getConfig';
import Swal from 'sweetalert2';

const UpdateDataUser = ({ updates, citizen = {}, getPeople }) => {
  const [formData, setFormData] = useState({
    firstName: citizen.firstName || '',
    lastName: citizen.lastName || '',
    phone: citizen.phone || '',
    email: citizen.email || ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    axios.patch(`${import.meta.env.VITE_API_SERVER}/api/v1/users/${citizen.id}`, formData, getConfig())
      .then((response) => {
        getPeople();
        setUpdating(false);
        setIsLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Buen trabajo, hay que actualizar siempre!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          toast: true,
          position: 'top-end',
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Algo anda mal',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          toast: true,
          position: 'top-end',
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });
      });
  };

  if (isLoading) {
    return (
      <div className='loading' style={{ height: "100px", marginBottom: "100px" }}>
        <Cargando escala='2' />
      </div>
    );
  } else {
    return (
      <div className={updating ? 'card-body bg-warning' : 'card-body'}>
        <div style={{ textAlign: "center", padding: "5px" }}>
          {updating && <h4><i className="fas fa-info-circle"></i> Hay cambios pendiente por guardar </h4>}
        </div>
        <form className="form-horizontal" onSubmit={handleSubmit} onChange={() => setUpdating(true)}>
          <div className="form-group row">
            <label htmlFor="firstName" className="col-sm-2 col-form-label">Nombre</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Nombre"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="lastName" className="col-sm-2 col-form-label">Apellido</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Apellido"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="phone" className="col-sm-2 col-form-label">Celular</label>
            <div className="col-sm-10">
              <input
                type="tel"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Celular"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="email" className="col-sm-2 col-form-label">Dirección</label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Dirección"
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-sm-2 col-sm-10">
              {updating && <button type="submit" className="btn btn-success">Guardar Cambios</button>}
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default UpdateDataUser;
