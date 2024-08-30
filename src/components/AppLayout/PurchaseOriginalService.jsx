import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import getConfig from '../utils/getConfig';
import { useSelector } from 'react-redux';

const PurchaseOriginalService = () => {
    const user = useSelector(state => state.userSlice);
    const [groupedServices, setGroupedServices] = useState({});
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [quantity, setQuantity] = useState('');
    const [link, setLink] = useState('');
    const [servicePrice, setServicePrice] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_SERVER}/api/v1/services/original`, getConfig());

                // Agrupar los servicios por categoría
                const servicesByCategory = data.reduce((acc, service) => {
                    if (!acc[service.category]) {
                        acc[service.category] = [];
                    }
                    acc[service.category].push(service);
                    return acc;
                }, {});

                setGroupedServices(servicesByCategory);
                setCategories(Object.keys(servicesByCategory)); // Obtener las categorías
            } catch (error) {
                console.error('Error cargando los servicios:', error);
                Swal.fire('Error', 'Hubo un problema al cargar los servicios.', 'error');
            }
        };

        fetchServices();
    }, []);

    useEffect(() => {
        const selected = groupedServices[selectedCategory]?.find(service => service.service === selectedService);
        if (selected && quantity > 0) {
            const calculatedPrice = selected.unitedPrice * quantity;
            setServicePrice(selected.unitedPrice);
            setTotalCost(calculatedPrice);
        } else {
            setServicePrice(0);
            setTotalCost(0);
        }
    }, [selectedService, quantity, selectedCategory, groupedServices]);

    const handlePurchase = async () => {
        if (!selectedService || quantity <= 0 || !link.trim()) {
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
                text: `Está a punto de comprar ${quantity} unidad(es) del servicio, lo cual costará $${totalCost}. de tus creditos ¿Desea continuar?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, comprar'
            });

            if (confirmResult.isConfirmed) {
                await axios.post(`${import.meta.env.VITE_API_SERVER}/api/v1/serviceOrders/buy`, {
                    userId: user.id,
                    serviceId: Number(selectedService),
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

    const minQuantity = groupedServices[selectedCategory]?.find(service => service.service === selectedService)?.min;

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Comprar Servicio</h3>
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label htmlFor="categorySelect">Seleccione Una Categoría:</label>
                    <select
                        id="categorySelect"
                        className="form-control"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Seleccione una categoría</option>
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="serviceSelect">Seleccione un Servicio:</label>
                    <select
                        id="serviceSelect"
                        className="form-control"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        disabled={!selectedCategory}
                    >
                        <option value="">Seleccione un servicio</option>
                        {selectedCategory && groupedServices[selectedCategory]?.map(service => (
                            <option key={service.service} value={service.service}>
                                {`${service.name} - $${service.unitedPrice}`}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="quantityInput">Cantidad 
                        <span style={{fontWeight:300, display:"block"}}>{minQuantity?`Este servicio requiere un mínimo de : ${minQuantity}`:""}</span> 
                    </label>
                    <input
                        type="number"
                        id="quantityInput"
                        className={`form-control ${quantity > 0 && quantity < minQuantity ? "bg-gradient-danger" : ""}`}
                        placeholder="Ingrese la cantidad"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        disabled={!selectedService}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="linkInput">Enlace:</label>
                    <input
                        type="text"
                        id="linkInput"
                        className="form-control"
                        placeholder="Ingrese el enlace"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        disabled={!selectedService}
                    />
                </div>
                <div className="form-group">
                    <label>Costo Total:</label>
                    <p>${totalCost.toFixed(5)}</p>
                </div>
                <div className="form-group">
                    <label>Fondos Disponibles:</label>
                    <p>${user?.fondos?.balance?.toFixed(5)}</p>
                </div>
                <div className="form-group">
                    <label>Fondos Restantes:</label>
                    <p>${(user?.fondos?.balance - totalCost).toFixed(5)}</p>
                </div>
                <button
                    id="buyButton"
                    className="btn btn-primary"
                    onClick={handlePurchase}
                    disabled={!selectedService || quantity <= 0 || totalCost === 0}
                >
                    Comprar
                </button>
            </div>
        </div>
    );
};

export default PurchaseOriginalService;
