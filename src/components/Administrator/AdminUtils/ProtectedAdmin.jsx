import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import MouseInactiveLogout from './MouseInactiveLogout'
import LockAdmin from './LockAdmin'

const ProtectedAdmin = () => {
    const [isLogged, setIsLogged] =useState(localStorage.getItem('token'))
    const [access, setAccess] = useState(false)
    const [passwordFail, setPasswordFail] = useState(0)


    
    if(isLogged && access){
        return <>
        <MouseInactiveLogout timeoutInMinutes={5} />
        <Outlet/>
        </>
    }
    
    else if(passwordFail===2){

        return  <Navigate to='/logout' />

    }else{
        return  <LockAdmin setAccess={setAccess} setPasswordFail={setPasswordFail} passwordFail={passwordFail}/>
    }
}

export default ProtectedAdmin