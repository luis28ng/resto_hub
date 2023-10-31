import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'
import { Container } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Navbar from "../components/navbar.js";

import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';

import '../css/login.css'



const Login = () => {

    const [logInfo, setlogInfo] = useState({
        email_address: '',
        password: ''
    });

    const navigate =useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setlogInfo({
            ...logInfo,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { email_address, password } = logInfo;
    
        // Check if both fields are filled
        if (!email_address || !password) {
            toast.error('Both fields are required.', {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }

        try{
            // Make a POST request to the backend for authentication
            const response = await axios.post(
                `http://localhost:8080/login?email=${email_address}&password=${password}`
            );

            const jwtToken = response.data.jwtToken;
            const userRole = response.data.userRole;

            // Store the JWT token and user role in LocalStorage
            localStorage.setItem('jwtToken', jwtToken);
            localStorage.setItem('userRole', userRole);

            // Redirect the user based on their role 
            if (userRole === 'RESTOHUB_OWNER') {
                navigate.push('/admin-dashboard');
            }if (userRole === 'RESTAURANT_MANAGER') {
                navigate.push('/manager-dashboard');
            }if (userRole === 'RESTAURANT_STAFF') {
                navigate.push('/staff-dashboard');
            }if (userRole === 'RESTAURANT_WAITER') {
                navigate.push('/waiter-dashboard');
            } else{
                navigate.push('/user-dashboard');
            }
        } catch (e) { 
            // Handle authentication errors
            console.log(e)
            toast.error('Authentication failed. Please Check your credentials', {
                position: toast.POSITION.TOP_CENTER
            });
        }
    };

    return(
        <div>
            <Navbar />
            <ToastContainer />
            <Container className="form-container">
                <Form className="formclass centered" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                        type="email"
                        placeholder="Email address"
                        id="email_address"
                        name="email_address" 
                        value={logInfo.email_address}
                        onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password" 
                        value={logInfo.password}
                        onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="d-grid gap-2">
                    <Button className="mb-5" type="submit" variant="success" size="lg">
                        Log in
                    </Button>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    );
        
        
    
};

export default Login;
