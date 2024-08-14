import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import getConfig from '../utils/getConfig';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Cargando from '../utils/Cargando'; // Componente de carga
import NavBar from '../AppLayout/NavBar';
import Aside from '../AppLayout/Aside';
import ContentPath from '../AppLayout/ContentPath';

const BuyingService = () => {
    const { id } = useParams();
    const user = useSelector(state => state.userSlice);
    const [service, setService] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [link, setLink] = useState('');
    const [totalCost, setTotalCost] = useState(0);

    // Fetch service details
    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_SERVER}/api/v1/services/${id}`, getConfig());
                setService(response.data);
                setTotalCost(response.data.price);
            } catch (error) {
                console.error('Error cargando el servicio:', error);
                Swal.fire('Error', 'Hubo un problema al cargar el servicio.', 'error');
            }
        };

        fetchService();
    }, [id]);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_SERVER}/api/v1/services/categories`, getConfig());
                setCategories(data);
            } catch (error) {
                console.error('Error cargando las categorías:', error);
                Swal.fire('Error', 'Hubo un problema al cargar las categorías.', 'error');
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (service && quantity > 0) {
            const calculatedPrice = service.price * quantity;
            setTotalCost(calculatedPrice);
        } else {
            setTotalCost(0);
        }
    }, [service, quantity]);

    const handlePurchase = async (e) => {
        e.preventDefault();
        if (!service || quantity <= 0 || !link.trim()) {
            Swal.fire('Error', 'Por favor, seleccione un servicio, ingrese una cantidad válida y un enlace.', 'error');
            return;
        }

        if (totalCost > user.fondos.balance) {
            Swal.fire('Fondos insuficientes', 'No tiene suficientes fondos para realizar esta compra.', 'error');
            return;
        }

        try {
            const confirmResult = await Swal.fire({
                title: 'Confirmar Compra',
                text: `Está a punto de comprar el servicio ${service.name} por ${quantity} unidades, lo cual costará $${totalCost}. ¿Desea continuar?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, comprar'
            });

            if (confirmResult.isConfirmed) {
                await axios.post(`${import.meta.env.VITE_API_SERVER}/api/v1/serviceOrders/buy`, {
                    userId: user.id,
                    serviceId: service.id,
                    quantity,
                    link
                }, getConfig());

                Swal.fire('Éxito', 'La compra se realizó con éxito.', 'success');
            }
        } catch (error) {
            console.error('Error realizando la compra:', error);
            Swal.fire('Error', 'Hubo un problema al realizar la compra. Inténtelo de nuevo.', 'error');
        }
    };

    if (!service) {
        return <Cargando />;
    }

    const minQuantity = service?.minQuantity || 1;

    return (
        <div className="wrapper control-sidebar-slide-open">
        <NavBar/>
        <Aside/>
 
        <div className="content-wrapper">
        <section className='content'>
        <div className='container-fluid'>

        <ContentPath PageName={"Dashboard"}/>
        <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Comprar Servicio</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handlePurchase}>
                                    <div className="form-group">
                                        <label htmlFor="service">Servicio</label>
                                        <input
                                            type="text"
                                            id="service"
                                            className="form-control"
                                            value={service.name}
                                            disabled
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="quantity">Cantidad</label>
                                        <input
                                            type="number"
                                            id="quantity"
                                            className={`form-control ${quantity>0 && quantity<minQuantity?"bg-gradient-danger":""}`}
                                            value={quantity}
                                            onChange={(e) => setQuantity(Number(e.target.value))}
                                            min={minQuantity}
                                            required
                                        />
                                        {quantity > 0 && quantity < minQuantity && (
                                            <small className="text-danger">Este servicio requiere un mínimo de {minQuantity} unidades.</small>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="link">Enlace</label>
                                        <input
                                            type="url"
                                            id="link"
                                            className="form-control"
                                            value={link}
                                            onChange={(e) => setLink(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Costo Total:</label>
                                        <p>${totalCost?.toFixed(2)}</p>
                                    </div>
                                    <div className="form-group">
                                        <label>Fondos Disponibles:</label>
                                        <p>${user?.fondos?.balance?.toFixed(2)}</p>
                                    </div>
                                    <div className="form-group">
                                        <label>Fondos Restantes:</label>
                                        <p>${(user?.fondos?.balance - totalCost).toFixed(2)}</p>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={quantity <= 0 || totalCost === 0}
                                    >
                                        Comprar
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
        </div>
        </div>
        </section>
        </div>
    </div>
    );
};

export default BuyingService;
