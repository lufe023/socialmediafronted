import React from 'react'
import Aside from './Aside';
import NavBar from './NavBar';
import MiniCards from '../MiniCards';
import ContentPath from './ContentPath';
import PurchaseServiceCard from './PurchaseServiceCard';
import ServiceOrderCard from './ServiceOrderCard'

const AppLayout = () => {
    return (
        <div className="wrapper">
          <NavBar/>
          <Aside/>
          <div className="content-wrapper">
            <section className='content'>
            <div className='container-fluid'>
              <ContentPath/>
            <MiniCards/>
   
              <ServiceOrderCard/>
         
            
            {/* <UserServiceOrders/> */}
            <PurchaseServiceCard/>

            </div>
            </section>
          </div>
          {/* <Footer /> */}
        </div>
      );
    };

export default AppLayout