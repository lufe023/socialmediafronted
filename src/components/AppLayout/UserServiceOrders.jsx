// components/UserServiceOrders.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getConfig from '../utils/getConfig';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const UserServiceOrders = () => {
    const user = useSelector(state => state.userSlice);
    const [serviceOrders, setServiceOrders] = useState([]);

    useEffect(() => {

        const fetchServiceOrders = async () => {
            const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/serviceOrders/${user.id}`;
            try {
                const response = await axios.get(URL, getConfig());
                setServiceOrders(response.data);
            } catch (error) {
                console.error('Error obteniendo las órdenes de servicio:', error);
                Swal.fire('Error', 'Hubo un problema al obtener las órdenes de servicio.', 'error');
            }
        };

        if(user.id){
        fetchServiceOrders();}
    }, [user.id]);

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Órdenes de Servicio</h3>
            </div>
            <div className="card-body">
                {serviceOrders.length === 0 ? (
                    <p>No hay órdenes de servicio.</p>
                ) : (
                    <ul className="list-group">
                        {serviceOrders.map(order => (
                            <li key={order.id} className="list-group-item">
                                <h5>{`Orden ID: ${order.id}`}</h5>
                                <p>{`Servicio ID: ${order.serviceId}`}</p>
                                <p>{`Cantidad: ${order.quantity}`}</p>
                                <p>{`Enlace: ${order.link}`}</p>
                                <p>{`Estado Externo: ${order.externalStatus}`}</p>
                                <p>{`Cargo: ${order.charge} ${order.currency}`}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default UserServiceOrders;
