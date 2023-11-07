import React from 'react';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import ReactDOM from 'react-dom/client';

import Login from '../src/pages/login.js';
import NotFound from '../src/pages/notfound.js'
import reportWebVitals from './reportWebVitals';
import UserDashBoard from '../src/pages/user-dashboard.js';
import AdminDashBoard from '../src/pages/admin-dashboard.js';
import WaiterDashBoard from '../src/pages/waiter-dashboard.js';
import StaffDashBoard from '../src/pages/staff-dashboard.js';
import RestaurantSearch from '../src/pages/restaurantSearch.js'
import ManagerDashBoard from '../src/pages/manager-dashboard.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
import '../src/css/restaurantSearch.css'
import '../src/css/login.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* <Route exact path='/' element={<HomePage />}></Route> */}
        <Route exact path='*' element={<NotFound />}></Route>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/admin-dashboard' element={<AdminDashBoard/>}></Route>
        <Route exact path='/managerDashboard' element={<ManagerDashBoard/>}></Route>        
        <Route exact path='/waiterDashboard' element={<WaiterDashBoard />}></Route>
        <Route exact path='/staffDashboard' element={<StaffDashBoard />}></Route>
        <Route exact path='/userDashboard' element={<UserDashBoard />}></Route>
        <Route exact path='/' element={<RestaurantSearch />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
