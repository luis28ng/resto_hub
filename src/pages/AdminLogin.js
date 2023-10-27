import React, { useState } from 'react';

import { Container } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Navbar from '../components/navbar.js';

import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';

import '../css/login.css';

const AdminLogin = () => {
    const [adminInfo, setAdminInfo] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdminInfo({
            ...adminInfo,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { email, password } = adminInfo;

        // Check if both fields are filled
        if (!email || !password) {
            toast.error('Email and Password are required.', {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }

        // Perform admin login logic here
        // You can make an API call to validate admin credentials, for example.

        console.log('Admin login form submitted:', adminInfo);
        // You can add your login logic here.
    };

    return (
        <div>
            <Navbar />
            <ToastContainer />
            <Container className="form-container">
                <Form className="formclass centered" onSubmit={handleSubmit}>
                    <h1>Admin Login</h1>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email address"
                            id="email_address"
                            name="email_address"
                            value={adminInfo.email_address}
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
                            value={adminInfo.password}
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

export default AdminLogin;
