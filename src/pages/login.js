import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import { Container, Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/navbar.js";
import '../css/login.css';

const Login = () => {
    const [logInfo, setLogInfo] = useState({
        email_address: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLogInfo({
            ...logInfo,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { email_address, password } = logInfo;

        if (!email_address || !password) {
            toast.error('Both fields are required.', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            // You should make an API request for authentication here
            // and handle success or failure accordingly
            // For now, we'll just log the form data
            console.log('Form submitted:', logInfo);

            // If authentication is successful, you can redirect to another page
            // For example, you can use React Router for this.
            // history.push('/dashboard'); // Import history from react-router-dom
        }
    };

    return (
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
