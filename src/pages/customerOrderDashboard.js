import Navbar from "../components/navbar.js";
import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


const WaiterDashBoard = () => {
    return(
        <div>
            <Navbar />
            <h1>Customer order dashboard</h1>
        </div>
    );
}  

export default WaiterDashBoard;
