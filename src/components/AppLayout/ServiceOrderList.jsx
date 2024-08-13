import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getConfig from '../utils/getConfig';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import ServiceOrderCard from './ServiceOrderCard';
import MiniCards from '../MiniCards';
import OrderTable from './OrderTable';
import PurchaseServiceCard from './PurchaseServiceCard';

const ServiceOrderList = ({orders}) => {

    return (
        <>
        
      
  
           
            <OrderTable orders={orders}/>
        
           
     
        {/* <div className="row">
          
            {orders.map(order => (
                <ServiceOrderCard key={order.id} order={order} />
            ))}
            
        </div> */}
       

        </>
    );
};

export default ServiceOrderList;
