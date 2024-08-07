import React from 'react'
import Aside from './Aside';
import NavBar from './NavBar';
import MiniCards from '../MiniCards';
import ContentPath from './ContentPath';
import PurchaseServiceCard from './PurchaseServiceCard';
import ServiceOrderList from './ServiceOrderList';

const AppLayout = () => {
    return (
        <div className="wrapper control-sidebar-slide-open">
          <NavBar/>
          <Aside/>
   
          <div className="content-wrapper">
            <section className='content'>
            <div className='container-fluid'>

            <ContentPath PageName={"Dashboard"}/>
            {/* <MiniCards/> */}
             <ServiceOrderList/>
         
            
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