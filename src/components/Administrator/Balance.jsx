import axios from 'axios';
import React, { useEffect, useState } from 'react'
import getConfig from '../utils/getConfig';
import Spinner from '../utils/Spiner';

const Balance = () => {

    const [balance, setBalance]=useState()
    const API_URL = `${import.meta.env.VITE_API_SERVER}/api/v1/configurations/balance`;


    const fetchConfiguration = () => {
        axios
            .get(API_URL, getConfig())
            .then((res) => {
                setBalance(res.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchConfiguration();
    }, []);


  return (
    <>
    {balance?
       <div className="info-box mb-3 bg-success">
       <span className="info-box-icon"><i className="fas fa-dollar-sign" /></span>
       <div className="info-box-content">
         <span className="info-box-text">Fondos en JQAW</span>
         <span className="info-box-number">{balance}</span>
       </div>
     </div>:
     
    <div><Spinner/>Cargando</div>
}
</>
  )
}

export default Balance