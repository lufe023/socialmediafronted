import React from 'react'
import Aside from './Aside';
import NavBar from './NavBar';
import MiniCards from '../MiniCards';
import ContentPath from './ContentPath';

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
            </div>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      );
    };

export default AppLayout