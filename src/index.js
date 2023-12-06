import React from 'react';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import '../src/css/restaurantSearch.css'
import '../src/css/login.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// root.render(
//   <React.StrictMode>
//     <Router>
//       <Routes>
//         <Route exact path='*' element={<NotFound />}></Route>
        // <Route exact path='/login' element={<Login />}></Route>
//         <Route exact path='/admin-dashboard' element={<AdminDashBoard/>}></Route>
//         <Route exact path='/managerDashboard' element={<ManagerDashBoard/>}></Route>        
//         <Route exact path='/staffDashboard/customerOrder' element={<WaiterDashBoard />}></Route>
//         <Route exact path='/staffDashboard' element={<StaffDashBoard />}></Route>
//         <Route exact path='/userDashboard' element={<UserDashBoard />}></Route>
        // <Route exact path='/' element={<RestaurantSearch />}></Route>
//       </Routes>
//     </Router>
//   </React.StrictMode>
// );


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
