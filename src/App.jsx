import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './components/AppLayout/AppLayout';
import Login from './components/AppLayout/user/Login';
import Signup from './components/AppLayout/user/Signup';
import ProtectedRoutes from './components/ProtectedRoutes';
import LandingPage from './components/landingPage/LandingPage';
import LogOut from './components/AppLayout/user/LogOut';
import NotFound from './components/AppLayout/NotFound';
import getUserbyId from './components/AppLayout/user/getMyUser';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import UserAdministrator from './components/AppLayout/user/UserAdministrator';
import Asignation from './components/AppLayout/user/Asignation';
import ForgotPassword from './components/AppLayout/user/ForgotPassword';
import RecoverPassword from './components/AppLayout/user/RecoverPassword';
import AdministratorLayout from './components/Administrator/AdministratorLayout'
import ViewOrder from './components/order/ViewOrder';
import ServicesPage from './components/Services/ServicesPage';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ProtectedAdmin from './components/Administrator/AdminUtils/ProtectedAdmin';
import Profile from './components/AppLayout/user/Profile';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    getUserbyId(dispatch);
  }, [])
  

  return (  
    <div className='wrapper'>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/logout' element={<LogOut/>} />
        <Route path='/forgotPassword' element={<ForgotPassword/>}/>
        <Route path='/recoverypassword/:id' element={<RecoverPassword/>}/>

        <Route element={<ProtectedRoutes/>}>
          <Route path='/dashboard' element={<AppLayout/>} />
          <Route path='/services' element={<ServicesPage/>} />
          <Route path='/orders/:id' element={<ViewOrder/>} />
          <Route path='/me/:id' element={<Profile/>} />
        </Route>

        <Route element={<ProtectedAdmin/>}>
          <Route path='/administrator/admin' element={<AdministratorLayout/>} />
          <Route path='/administrator/user' element={<UserAdministrator/>} />
          <Route path='/administrator/user/:id' element={<Asignation/>} />
        </Route>

        {/* Otras rutas protegidas pueden ir aquí */}
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
