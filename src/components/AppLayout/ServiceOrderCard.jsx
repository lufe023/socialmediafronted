import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getConfig from '../utils/getConfig';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const ServiceOrderCard = ({ order }) => {
    const iconMap = {
        Instagram: 'fab fa-instagram',
        Facebook: 'fab fa-facebook',
        Twitter: 'fab fa-twitter',
        // Añade más mapeos de iconos según sea necesario
    };

    const getColorClass = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-success';
            case 'pending':
                return 'bg-warning';
            case 'failed':
                return 'bg-danger';
            case 'In progress':
                return 'bg-primary';
            default:
                return 'bg-secondary';
        }
    };

    return (
        <div className="col-6">
            <div className="info-box">
            <span className={`info-box-icon ${getColorClass(order.externalStatus)}`}><i className={iconMap[order.serviceDetails.parentCategory] || 'fas fa-info'}></i></span>
            <div className="info-box-content">
                <span className="info-box-text">{order.service.name}</span>
                <span className="info-box-text"> Status: {order.externalStatus}</span>
                <span className="info-box-number">{order.totalCost.toFixed(2)}</span>
            </div>
        </div>

 
        </div>
    );
};

const ServiceOrderList = () => {
    const [orders, setOrders] = useState([]);

    const user = useSelector(state => state.userSlice);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/serviceOrders/${user.id}`;
                const response = await axios.get(URL, getConfig());
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching user orders:', error);
                Swal.fire('Error', 'Hubo un problema al cargar las órdenes del usuario.', 'error');
            }
        };
        if(user.id){
        fetchOrders();
    }
    }, [user.id]);

    console.log(orders)
    return (
        <div className="row">
            {orders.map(order => (
                <ServiceOrderCard key={order.id} order={order} />
            ))}
        </div>
    );
};

export default ServiceOrderList;
