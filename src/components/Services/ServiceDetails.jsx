import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import getConfig from '../utils/getConfig';
import NavBar from '../AppLayout/NavBar';
import Aside from '../AppLayout/Aside';
import ContentPath from '../AppLayout/ContentPath';
import PurchaseSimulator from './PurchaseSimulator';
import Spinner from '../utils/Spiner';

const ServiceDetails = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [formData, setFormData] = useState({
        service: '',
        name: '',
        type: '',
        description: '',
        price: '',
        jqawPrice: '',
        rate: '',
        minQuantity: '',
        maxQuantity: '',
        parentCategory: '',
        dripfeed: false,
        refill: false,
        cancel: false,
        published: false,
    });

    useEffect(() => {
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/services/${id}`;
        axios
            .get(URL, getConfig())
            .then(response => {
                setService(response.data);
                setFormData(response.data);
            })
            .catch(error => {
                console.error('Error cargando el servicio:', error);
                Swal.fire('Error', 'Hubo un problema al cargar el servicio.', 'error');
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/services/${id}`;
        axios
            .patch(URL, formData, getConfig())
            .then(() => {
                Swal.fire('Actualización exitosa', 'El servicio ha sido actualizado correctamente.', 'success');
            })
            .catch(error => {
                console.error('Error actualizando el servicio:', error);
                Swal.fire('Error', 'Hubo un problema al actualizar el servicio.', 'error');
            });
    };

    if (!service) return (
    <div style={{width:"100%", height:"500px", alignItems: "center", display:"flex"}}>
    <div style={{width:"100%", height:"50px", display:"flex", justifyContent:"center", scale:"2"}}><Spinner/></div>
    </div>)

    return (
        <div className="wrapper control-sidebar-slide-open">
        <NavBar/>
        <Aside/>
 
        <div className="content-wrapper">
          <section className='content'>
          <div className='container-fluid'>

          <ContentPath PageName={"Editar Servicio"}/>
        <div className='row'>

        <div className="col-md-8">

        <div className="card">
        <div className="card-header">
        <h3 className="card-title">Editar Servicio</h3>
        <div className="card-tools">
            <button type="button" className="btn btn-tool" data-card-widget="collapse">
            <i className="fas fa-minus" />
            </button>
        <button type="button" className="btn btn-tool" data-card-widget="remove">
        <i className="fas fa-times" />
        </button>
        </div>
        </div>
        <div className='card-body'>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Service:</label>
                    <input 
                        type="text"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Nombre:</label>
                    <input 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Tipo:</label>
                    <input 
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Descripción:</label>
                    <textarea 
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Precio:</label>
                    <input 
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Precio jqaw:</label>
                    <input 
                        type="number"
                        name="jqawPrice"
                        value={formData.jqawPrice}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Tasa (Rate):</label>
                    <input 
                        type="number"
                        name="rate"
                        value={formData.rate}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Cantidad mínima:</label>
                    <input 
                        type="number"
                        name="minQuantity"
                        value={formData.minQuantity}
                        onChange={handleChange}
                        className="form-control"
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Cantidad máxima:</label>
                    <input 
                        type="number"
                        name="maxQuantity"
                        value={formData.maxQuantity}
                        onChange={handleChange}
                        className="form-control"
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Categoría padre:</label>
                    <input 
                        type="text"
                        name="parentCategory"
                        value={formData.parentCategory}
                        onChange={handleChange}
                        className="form-control"
                        disabled
                    />
                </div>

                <div className="form-group">
                <div className="custom-control custom-checkbox">
                <input className="custom-control-input" type="checkbox" id="dripfeed" name="dripfeed"
                checked={formData.dripfeed}
                onChange={handleChange} />
                <label htmlFor="dripfeed" className="custom-control-label">Dripfeed</label>
                </div>
                </div>

                <div className="form-group">
                <div className="custom-control custom-checkbox">
                <input className="custom-control-input" type="checkbox" id="refill"
                name="refill"
                checked={formData.refill}
                onChange={handleChange}/>
                <label htmlFor="refill" className="custom-control-label">Refill</label>
                </div>
                </div>

                <div className="form-group">
                <div className="custom-control custom-checkbox">
                <input className="custom-control-input" type="checkbox" id="cancel"
                name="cancel"
                checked={formData.cancel}
                onChange={handleChange}/>
                <label htmlFor="cancel" className="custom-control-label">Cancel</label>
                </div>
                </div>

                <div className="form-group">
                <div className="custom-control custom-checkbox">
                <input className="custom-control-input" type="checkbox" id="published"
                 name="published"
                 checked={formData.published}
                 onChange={handleChange}/>
                <label htmlFor="published" className="custom-control-label">Publicado</label>
                </div>
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                    Guardar Cambios
                </button>
            </form>
            </div>
        </div>
        </div>
        <div className="col-md-4">
        <PurchaseSimulator service={service} userFunds={1000} />
        </div>
        </div>
        </div>
        </section>
        </div>
        </div>
    );
};

export default ServiceDetails;
