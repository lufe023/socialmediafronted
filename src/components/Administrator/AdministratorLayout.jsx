import React from 'react'
import NavBar from '../AppLayout/NavBar';
import Aside from '../AppLayout/Aside';
import ContentPath from '../AppLayout/ContentPath';
import MiniCards from '../MiniCards';
import EditServiceCard from './EditServiceCard';
import ServiceByCategory from '../Services/ServiceByCategory';
import Multiplier from './Multiplier';
import ConfigurationCard from './ConfigurationCard';



const AppLayout = () => {
    return (
        <div className="wrapper">
          <NavBar/>
          <Aside/>
          <div className="content-wrapper">
            <div className='content'>
            <div className='container-fluid'>
              <ContentPath PageName={"Administrar Sitio"}/>
              {/* <ServiceByCategory admin={true}/>
              <Multiplier/> */}
              <ConfigurationCard/>
            </div>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      );
    };

export default AppLayout