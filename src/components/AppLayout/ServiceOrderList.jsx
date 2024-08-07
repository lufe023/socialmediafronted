import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getConfig from '../utils/getConfig';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import ServiceOrderCard from './ServiceOrderCard';
import MiniCards from '../MiniCards';

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
        if (user.id) {
            fetchOrders();
        }
    }, [user.id]);
    return (
        <>
        
            <MiniCards orders={orders} />
        <div className="row">
          
            {orders.map(order => (
                <ServiceOrderCard key={order.id} order={order} />
            ))}
        </div>
        </>
    );
};

export default ServiceOrderList;
