import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import getConfig from '../utils/getConfig';
import NavBar from '../AppLayout/NavBar';
import Aside from '../AppLayout/Aside';
import ContentPath from '../AppLayout/ContentPath';
import Cargando from '../utils/Cargando';
import { Link } from 'react-router-dom';

const iconMap = {
    Facebook: 'fab fa-facebook',
    Instagram: 'fab fa-instagram',
    Twitter: 'fab fa-twitter',
    LinkedIn: 'fab fa-linkedin',
    TikTok: 'fab fa-tiktok',
    Spotify: 'fab fa-spotify',
    Pinterest: 'fab fa-pinterest',
    SoundCloud: 'fab fa-soundcloud',
    // Agrega más iconos según sea necesario
};

const ServicesPage = () => {

    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
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
        const fetchServices = async () => {
            const promises = categories?.map(category => {
                const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/services/category/${category}`;
                return axios.get(URL, getConfig());
            });

            try {
                const servicesData = await Promise.all(promises);
                setServices(servicesData?.map(res => res.data));
            } catch (error) {
                console.error('Error cargando los servicios:', error);
                Swal.fire('Error', 'Hubo un problema al cargar los servicios.', 'error');
            }
        };

        if (categories?.length > 0) {
            fetchServices();
        }
    }, [categories]);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const filteredServices = services?.map(serviceList =>
        serviceList.filter(service => 
            service.name.toLowerCase().includes(searchText.toLowerCase())
        )
    );

    // Divide las categorías en dos partes
    const midIndex = Math.ceil(categories.length / 2);
    const firstHalfCategories = categories.slice(0, midIndex);
    const secondHalfCategories = categories.slice(midIndex);
    return (
        <div className="wrapper control-sidebar-slide-open">
            <NavBar />
            <Aside />
            <div className="content-wrapper">
                <section className='content'>
                    <div className='container-fluid'>
                        <ContentPath PageName={"Servicios"} />
                        <h2 className="text-center display-4">Buscar Servicio</h2>
                        <div className="row">
                            <div className="col-md-8 offset-md-2 p-5">
                                <div className="input-group">
                                    <input
                                        type="search"
                                        className="form-control form-control-lg"
                                        placeholder="Describa su servicio, ej: Instagram Likes"
                                        value={searchText}
                                        onChange={handleSearchChange}
                                    />
                                    <div className="input-group-append">
                                        <button type="submit" className="btn btn-lg btn-default">
                                            <i className="fa fa-search" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {categories.length === 0 ?
                            <div className='col-12 p-5' style={{ display: "flex", justifyContent: "center" }}>
                                <Cargando />
                            </div> : ""
                        }
                        <div className="row">
                            <div className="col-md-6">
                                {firstHalfCategories?.map((category, index) => {
                                    const filteredServiceList = filteredServices[index];
                                    if (filteredServiceList?.length === 0) return null;

                                    const iconClass = iconMap[category] || 'fas fa-question-circle';

                                    return (
                                        <div className="card card-primary card-outline collapsed-card" key={category}>
                                            <div className="card-header">
                                                <h3 className="card-title">
                                                    <i className={`mr-2 ${iconClass}`} /> {category}
                                                </h3>
                                                <div className="card-tools">
                                                    <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                        <i className="fas fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="card-body p-0">
                                                <table className="table table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: '10px' }}>#</th>
                                                            <th>Servicio</th>
                                                            <th>Precio</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {filteredServiceList?.map((service, idx) => (
                                                            <tr key={service.id}>
                                                                <td>{idx + 1}.</td>
                                                                <td>
                                                                    <Link to={`/service/buying/${service.id}`}>
                                                                        {service.name}
                                                                    </Link>
                                                                </td>
                                                                <td>${service.price}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="col-md-6">
                                {secondHalfCategories?.map((category, index) => {
                                    const filteredServiceList = filteredServices[index + midIndex];
                                    if (filteredServiceList?.length === 0) return null;

                                    const iconClass = iconMap[category] || 'fas fa-question-circle';

                                    return (
                                        <div className="card card-primary card-outline collapsed-card" key={category}>
                                            <div className="card-header">
                                                <h3 className="card-title">
                                                    <i className={`mr-2 ${iconClass}`} /> {category}
                                                </h3>
                                                <div className="card-tools">
                                                    <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                        <i className="fas fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="card-body p-0">
                                                <table className="table table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: '10px' }}>#</th>
                                                            <th>Servicio</th>
                                                            <th>Precio</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {filteredServiceList?.map((service, idx) => (
                                                            <tr key={service.id}>
                                                                <td>{idx + 1}.</td>
                                                                <td>
                                                                    <Link to={`/service/buying/${service.id}`}>
                                                                        {service.name}
                                                                    </Link>
                                                                </td>
                                                                <td>${service.price}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};


export default ServicesPage;
