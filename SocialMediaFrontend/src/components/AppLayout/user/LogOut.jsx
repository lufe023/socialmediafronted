import React from 'react'
import { Navigate } from 'react-router-dom';

const LogOut = () => {

    localStorage.clear();

    return  <Navigate to='/' />

}

export default LogOut