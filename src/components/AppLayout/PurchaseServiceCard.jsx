// components/PurchaseServiceCard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import getConfig from '../utils/getConfig';
import { useSelector } from 'react-redux';

const PurchaseServiceCard = () => {
    const user = useSelector(state => state.userSlice);
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [quantity, setQuantity] = useState('');
    const [link, setLink] = useState('');
    const [servicePrice, setServicePrice] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        // Obtener categorías cuando el componente se monta
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
        // Obtener servicios cuando se selecciona una categoría
        if (selectedCategory) {
            const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/services/category/${selectedCategory}`;
            axios
                .get(URL, getConfig())
                .then(response => {
                    setServices(response.data);
                })
                .catch(error => {
                    console.error('Error cargando los servicios:', error);
                    Swal.fire('Error', 'Hubo un problema al cargar los servicios.', 'error');
                });
        }
    }, [selectedCategory]);

    useEffect(() => {
        // Calcular el costo total cuando cambian el servicio o la cantidad
        const selected = services.find(service => service.id === Number(selectedService));

        if (selected) {
            setServicePrice(selected.price);
            setTotalCost(selected.price * quantity);
        }
    }, [selectedService, quantity, services]);

    const handlePurchase = () => {
        if (!selectedService || isNaN(quantity) || quantity <= 0 || !link) {
            Swal.fire('Error', 'Por favor, seleccione un servicio, ingrese una cantidad válida y un enlace.', 'error');
            return;
        }

        if (totalCost > user.fondos.balance) {
            Swal.fire('Fondos insuficientes', 'No tiene suficientes fondos para realizar esta compra.', 'error');
            return;
        }

        Swal.fire({
            title: 'Confirmar Compra',
            text: `Está a punto de comprar el servicio con ID ${selectedService} por ${quantity} unidades, lo cual costará $${totalCost}. ¿Desea continuar?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, comprar'
        }).then((result) => {
            if (result.isConfirmed) {
                const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/serviceOrders/buy`;
                axios
                    .post(URL, {
                        userId: user.id,
                        serviceId: Number(selectedService), // Asegúrate de convertir a número
                        quantity,
                        link
                    }, getConfig())
                    .then(response => {
                        Swal.fire('Éxito', 'La compra se realizó con éxito.', 'success');
                    })
                    .catch(error => {
                        console.error('Error realizando la compra:', error);
                        Swal.fire('Error', 'Hubo un problema al realizar la compra. Inténtelo de nuevo.', 'error');
                    });
            }
        });
    };

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Comprar Servicio</h3>
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label htmlFor="categorySelect">Seleccione una Categoría:</label>
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
                    >
                        <option value="">Seleccione un servicio</option>
                        {services.map(service => (
                            <option key={service.id} value={service.id}>
                                {`${service.name} - $${service.price}`}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="quantityInput">Cantidad:</label>
                    <input
                        type="number"
                        id="quantityInput"
                        className="form-control"
                        placeholder="Ingrese la cantidad"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
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
                    />
                </div>
                <div className="form-group">
                    <label>Costo Total:</label>
                    <p>${totalCost.toFixed(2)}</p>
                </div>
                <div className="form-group">
                    <label>Fondos Disponibles:</label>
                    <p>${user?.fondos?.balance.toFixed(2)}</p>
                </div>
                <div className="form-group">
                    <label>Fondos Restantes:</label>
                    <p>${(user?.fondos?.balance - totalCost).toFixed(2)}</p>
                </div>
                <button
                    id="buyButton"
                    className="btn btn-primary"
                    onClick={handlePurchase}
                >
                    Comprar
                </button>
            </div>
        </div>
    );
};

export default PurchaseServiceCard;
