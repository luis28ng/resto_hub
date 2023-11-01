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
        email: '',
        password: ''
    });

    // const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setlogInfo({
            ...logInfo,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { email, password } = logInfo;
    
        // Check if both fields are filled
        if (!email || !password) {
            toast.error('Both fields are required.', {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }

        try{
            // Make a POST request to the backend for authentication
            const response = await axios.post(
                'http://restohub-api.us-east-2.elasticbeanstalk.com/login', {

                    headers: {
                        'Content-Type': 'application/json',
                    }
                },
                {
                    params: {
                        email: email,
                        password: password
                    }
                }
            );
            
            const jwtToken = response.data.jwtToken;
            const userRole = response.data.userRole;

            if (response.status === 200) {
                toast.success('Log in successful', {
                    position: toast.POSITION.TOP_RIGHT
                });

                console.log(jwtToken)
                console.log(userRole)

                setlogInfo({})

                // localStorage.setItem('jwtToken', jwtToken);
                // localStorage.setItem('userRole', userRole);

                // Redirect the user based on their role 
                // if (userRole === 'RESTOHUB_OWNER') {
                //     navigate.push('/admin-dashboard');
                // }if (userRole === 'RESTAURANT_MANAGER') {
                //     navigate.push('/manager-dashboard');
                // }if (userRole === 'RESTAURANT_STAFF') {
                //     navigate.push('/staff-dashboard');
                // }if (userRole === 'RESTAURANT_WAITER') {
                //     navigate.push('/waiter-dashboard');
                // } else{
                //     navigate.push('/user-dashboard');
                // }
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
                        id="email"
                        name="email" 
                        value={logInfo.email}
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
