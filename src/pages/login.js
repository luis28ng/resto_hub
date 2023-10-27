import Navbar from "../components/navbar.js";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from "react-bootstrap";
import '../css/login.css'
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

    const [logInfo, setlogInfo] = useState({
        email_address: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setlogInfo({
            ...logInfo,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const { email_address, password } = logInfo;
    
        // Check if both fields are filled
        if (!email_address || !password) {
            toast.error('Both fields are required.', {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        console.log('Form submitted:', logInfo);
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

                    {/* Added an "Admin Login" button */}
                    <Link to="/admin-login">
                        <Button variant="primary" size="lg">
                            Admin Login
                        </Button>
                    </Link>
                        
                    </Form.Group>
                </Form>
            </Container>
        </div>
        
    );
};

export default Login;
