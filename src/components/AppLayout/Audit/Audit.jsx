import React, { useState } from 'react'
import AppLayout from '../../Administrator/AdministratorLayout'
import NavBar from '../NavBar'
import Aside from '../Aside'
import ContentPath from '../ContentPath'
import syncronizeServices from './synchronizeServices'
import Spinner from '../../utils/Spiner'
const Audit = () => {
    const [loading, setLoading] = useState(false)
  return (
    <div className="wrapper">
    <NavBar/>
    <Aside/>
    <div className="content-wrapper">
    <div className='content'>
    <div className='container-fluid'>
        <ContentPath PageName={"Auditar Servicios"}/>
        <div className="row">
            <div className="col-md-12">
            {
            loading?<Spinner/>:
                <button className='btn btn-primary' onClick={()=>syncronizeServices(setLoading)}>Sincronizar</button>
            }
            </div>
        </div>
    </div>
    </div>
    </div>
    </div>
)
}

export default Audit