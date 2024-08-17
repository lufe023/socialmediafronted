import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { clearUserData } from '../../../store/slices/user.slice';

const LogOut = () => {
    const dispatch = useDispatch();
    const [loggedOut, setLoggedOut] = useState(false);

    useEffect(() => {
        // Limpiar el localStorage y el estado de Redux
        localStorage.removeItem('token');
        dispatch(clearUserData());

        // Indicar que el proceso de logout se ha completado
        setLoggedOut(true);
    }, [dispatch]);

    // Redirigir después de haber hecho logout
    if (loggedOut) {
        return <Navigate to="/" />;
    }

    // Mostrar un componente de carga o nada mientras se procesa el logout
    return null;
}

export default LogOut;
