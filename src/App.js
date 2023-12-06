import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Login from './pages/login.js';
import NotFound from './pages/notfound.js'
import WaiterDashBoard from './pages/customerOrderDashboard.js';
import StaffDashBoard from './pages/staff-dashboard.js';
import RestaurantSearch from './pages/restaurantSearch.js'
import ManagerDashBoard from './pages/manager-dashboard.js';
import Menu from './pages/menuDashboard.js';
import { ManagerRoute, StaffRoute, WaiterRoute } from './components/privateRoutes.js';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import '../src/css/restaurantSearch.css'
import '../src/css/login.css'
import NavbarComponent from './components/navbar.js';
import Footer from './components/Footer.js';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51OIuIuDO4Uky0rV8frmPM757FFsPJtY2PVnrQFLmjgDjlocSVO3VNTa1i1cj17WZ8loQt1c7ArEmVdvUvh2UkRDo00IdigWFpU');


const App = () => {
    const location = useLocation();

    return (<Elements stripe={stripePromise}>
        <>
            <NavbarComponent/>
            <AnimatePresence mode='wait'>
            <ToastContainer />
            <Routes location={location} key={location.pathname}>
                <Route element={<ManagerRoute />}>
                    <Route exact path='/managerDashboard' element={<ManagerDashBoard />}/>
                    <Route exact path='/menuDashboard' element={<Menu />}/>
                    {/* <Route exact path='/customerOrder' element={<WaiterDashBoard />}/> */}
                </Route>
                <Route element={<StaffRoute />}>
                    <Route exact path='/staffDashboard' element={<StaffDashBoard />}/>
                    <Route exact path='/customerOrder' element={<WaiterDashBoard />}/>
                </Route>
                <Route element={<WaiterRoute />}>
                    <Route exact path='/staffDashboard' element={<StaffDashBoard />}/>
                    <Route exact path='/customerOrder' element={<WaiterDashBoard />}/>
                </Route>
                <Route exact path='/' element={<RestaurantSearch />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='*' element={<NotFound />} />
            </Routes>
            </AnimatePresence>
            <Footer />
        </>
        </Elements>
        
    )
}

export default App;
