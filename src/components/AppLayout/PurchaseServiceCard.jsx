// components/PurchaseServiceCard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import getConfig from '../utils/getConfig';
import { useSelector } from 'react-redux';


const PurchaseServiceCard = () => {

    const user = useSelector(state => state.userSlice);
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        // Cargar servicios cuando el componente se monta
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/services`;
        axios
            .get(URL, getConfig())
            .then(response => {
                setServices(response.data);
            })
            .catch(error => {
                console.error('Error cargando los servicios:', error);
                Swal.fire('Error', 'Hubo un problema al cargar los servicios.', 'error');
            });
    }, []);

    const handlePurchase = () => {
        if (!selectedService || isNaN(amount) || amount <= 0) {
            Swal.fire('Error', 'Por favor, seleccione un servicio y ingrese un monto válido.', 'error');
            return;
        }
    
        Swal.fire({
            title: 'Confirmar Compra',
            text: `Está a punto de comprar el servicio con ID ${selectedService} por $${amount}. ¿Desea continuar?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, comprar'
        }).then((result) => {
            if (result.isConfirmed) {
                const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/transactions`;
                axios
                    .post(URL, {
                        serviceId: selectedService,
                        amount,
                        userId: user.id, // Reemplaza esto con el ID del usuario actual
                        type: 'purchase' // Agrega el campo `type` con un valor adecuado
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
                    <label htmlFor="amountInput">Monto:</label>
                    <input
                        type="number"
                        id="amountInput"
                        className="form-control"
                        placeholder="Ingrese el monto"
                        min="1"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
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
