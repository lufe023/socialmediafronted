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
import { useDispatch, useSelector } from 'react-redux';
import UserAdministrator from './components/AppLayout/user/UserAdministrator';
import Asignation from './components/AppLayout/user/Asignation';
import ForgotPassword from './components/AppLayout/user/ForgotPassword';
import RecoverPassword from './components/AppLayout/user/RecoverPassword';
import AdministratorLayout from './components/Administrator/AdministratorLayout';
import ViewOrder from './components/order/ViewOrder';
import ServicesPage from './components/Services/ServicesPage';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ProtectedAdmin from './components/Administrator/AdminUtils/ProtectedAdmin';
import UserProfile from './components/AppLayout/user/UserProfile';
import ServiceDetails from './components/Services/ServiceDetails';
import BuyingService from './components/Services/BuyingService';
import UserDashBoard from './components/Users/UserDashBoard';
import Audit from './components/AppLayout/Audit/Audit';
import { DarkModeProvider, useDarkMode } from './components/utils/DarkModeContext';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userSlice);
  const { darkMode } = useDarkMode(); // Usando el hook

  // Obtener los datos del usuario al cargar la app
  useEffect(() => {
    getUserbyId(dispatch);
  }, [dispatch]);

  return (
    <DarkModeProvider>
      <div className={`wrapper ${darkMode ? 'dark-mode' : ''}`}>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/logout' element={<LogOut />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/recoverypassword/:id' element={<RecoverPassword />} />

          <Route element={<ProtectedRoutes />}>
            <Route path='/dashboard' element={<AppLayout />} />
            <Route path='/services' element={<ServicesPage />} />
            <Route path="/service/buying/:id" element={<BuyingService />} />
            <Route path='/orders/:id' element={<ViewOrder />} />
            <Route path='/me/:id' element={<UserProfile />} />
          </Route>

          <Route element={<ProtectedAdmin />}>
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path='/administrator/admin' element={<AdministratorLayout />} />
            <Route path='/administrator/user' element={<UserAdministrator />} />
            <Route path='/administrator/user/:id' element={<Asignation />} />
            <Route path='/users' element={<UserDashBoard />} />
            <Route path='/audit' element={<Audit />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </DarkModeProvider>
  );
}

export default App;
