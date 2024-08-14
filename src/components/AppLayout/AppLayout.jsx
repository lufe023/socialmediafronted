import React, { useEffect, useState } from 'react'
import Aside from './Aside';
import NavBar from './NavBar';
import MiniCards from '../MiniCards';
import ContentPath from './ContentPath';
import PurchaseServiceCard from './PurchaseServiceCard';
import ServiceOrderList from './ServiceOrderList';
import { useSelector } from 'react-redux';
import axios from 'axios';
import getConfig from '../utils/getConfig';
import Advertisement from './Advertisement';
import ServicesPage from '../Services/ServicesPage';
import ServiceByCategory from '../Services/ServiceByCategory';

const AppLayout = () => {


  const [orders, setOrders] = useState([]);

  const user = useSelector(state => state.userSlice);

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


  useEffect(() => {
    
      if (user.id) {
          fetchOrders();
      }
  }, [user.id]);


    return (
        <div className="wrapper control-sidebar-slide-open">
          <NavBar/>
          <Aside/>
   
          <div className="content-wrapper">
            <section className='content'>
            <div className='container-fluid'>

            <ContentPath PageName={"Dashboard"}/>
            {/* <MiniCards/> */}

            <MiniCards orders={orders} />
            <div className='row'>
              <div className='col-md-4'>
                <PurchaseServiceCard/>
              </div>
              <div className='col-md-8'>
             <Advertisement/>
             <ServiceOrderList orders={orders}/>
             </div>

            </div>
            <div style={{marginTop:"100px"}}>
          <ServiceByCategory/>
          </div>
            </div>
            </section>
          </div>
          {/* <Footer /> */}
        </div>
      );
    };

export default AppLayout