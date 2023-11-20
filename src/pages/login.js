import React, { useState } from 'react';

import { Container } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Navbar from "../components/navbar.js";
import { login } from '../services/authService';
import { redirectToUserDashboard } from '../utils/utils.js';

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
        const { success, data, error } = await login(email, password);

        if (success) {
            const { jwtToken, userRole, restaurant } = data;

            toast.success('Login successful', { position: toast.POSITION.TOP_RIGHT });

            localStorage.setItem('jwtToken', jwtToken);
            localStorage.setItem('userRole', userRole.appRole);
            localStorage.setItem('userId', userRole.id);
            localStorage.setItem('username', userRole.username);
            localStorage.setItem('userRestId', restaurant.id);

            setlogInfo({
                email: '',
                password: '',
            });


            setTimeout(() => {
                redirectToUserDashboard();
            }, 2000);

        } else {
            toast.error(`${error}`,
                { position: toast.POSITION.TOP_RIGHT }
            );
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
