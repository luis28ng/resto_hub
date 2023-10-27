import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import HomePage from './pages/homepage.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../src/pages/login.js';
import 'react-toastify/dist/ReactToastify.css';
import RestaurantSearch from '../src/pages/restaurantSearch.js'
import NotFound from '../src/pages/notfound.js'
import AdminLogin from './pages/AdminLogin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <Routes>
          {/* <Route exact path='/' element={<HomePage />}></Route> */}
          <Route exact path='*' element={<NotFound />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/' element={<RestaurantSearch />}></Route>
          <Route exact path='/admin-login' element={<AdminLogin />}></Route>
        </Routes>
      </Router>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
