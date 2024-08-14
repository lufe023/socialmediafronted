import React from 'react'
import NavBar from '../AppLayout/NavBar';
import Aside from '../AppLayout/Aside';
import ContentPath from '../AppLayout/ContentPath';
import MiniCards from '../MiniCards';
import EditServiceCard from './EditServiceCard';
import ServiceByCategory from '../Services/ServiceByCategory';



const AppLayout = () => {
    return (
        <div className="wrapper">
          <NavBar/>
          <Aside/>
          <div className="content-wrapper">
            <div className='content'>
            <div className='container-fluid'>
              <ContentPath/>
              <ServiceByCategory admin={true}/>
            </div>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      );
    };

export default AppLayout