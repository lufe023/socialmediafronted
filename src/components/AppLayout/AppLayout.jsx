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
            <div className='content'>
            <div className='container-fluid'>
              <ContentPath/>
            <MiniCards/>
            <div className='row'>
              <ServiceOrderCard/>
              </div>
            
            {/* <UserServiceOrders/> */}
            <PurchaseServiceCard/>

            </div>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      );
    };

export default AppLayout