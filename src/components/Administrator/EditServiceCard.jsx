import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import getConfig from '../utils/getConfig';

const EditServiceCard = ({ service }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: ''
  });

  useEffect(() => {
    // Cargar categorías al montar el componente
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/services/categories`;
    axios
      .get(URL, getConfig())
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error cargando las categorías:', error);
        Swal.fire('Error', 'Hubo un problema al cargar las categorías.', 'error');
      });
  }, []);

  useEffect(() => {
    if (service) {
      // Establecer datos del formulario cuando se pasa el servicio
      setFormData({
        name: service.name || '',
        description: service.description || '',
        price: service.price || ''
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/services/${service.id}`;
    axios
      .put(URL, formData, getConfig())
      .then(response => {
        Swal.fire('Éxito', 'Servicio actualizado con éxito', 'success');
      })
      .catch(error => {
        console.error('Error actualizando el servicio:', error);
        Swal.fire('Error', 'Hubo un problema al actualizar el servicio.', 'error');
      });
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Editar Servicio</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nameInput">Nombre</label>
            <input
              type="text"
              id="nameInput"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="descriptionInput">Descripción</label>
            <textarea
              id="descriptionInput"
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="priceInput">Precio</label>
            <input
              type="number"
              id="priceInput"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditServiceCard;
