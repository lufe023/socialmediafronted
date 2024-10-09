import React from 'react'
import NavBar from '../AppLayout/NavBar';
import Aside from '../AppLayout/Aside';
import ContentPath from '../AppLayout/ContentPath';
import MiniCards from '../MiniCards';
import EditServiceCard from './EditServiceCard';
import ServiceByCategory from '../Services/ServiceByCategory';
import Multiplier from './Multiplier';
import ConfigurationCard from './ConfigurationCard';
import Balance from './Balance';
import Spinner from "../utils/Spiner";
import FooterLayout from '../AppLayout/FooterLayout';

const AppLayout = () => {
    return (
      <>
        <div className="wrapper">
          <NavBar/>
          <Aside/>
          <div className="content-wrapper">
            <div className='content'>
            <div className='container-fluid'>
              <ContentPath PageName={"Administrar Sitio"}/>
              {/* <ServiceByCategory admin={true}/>
              <Multiplier/> */}
              <div className="row">
                <div className="col-md-8">
                <ConfigurationCard/>
                </div>
                <div className="col-md-4">
                
                <Balance/>
                </div>
              </div>
              
              
            </div>
            </div>
          </div>
        </div>
            <FooterLayout/>
            </>
      );
    };

export default AppLayout