import Navbar from "../components/navbar.js";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from "react-bootstrap";
import '../css/login.css'
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';

const Login = () => {
    return(
        <div>
            <Navbar />
            <Container className="form-container">
                <Form className="formclass centered">
                    <h1>Login</h1>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                        type="email"
                        placeholder="Email address"
                        label="Email address"
                        id="form1"
                        name="email_address" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        type="password"
                        placeholder="Password"
                        label="Password"
                        id="from2"
                        name="password" />
                    </Form.Group>
                    <Form.Group className="d-grid gap-2">
                    <Button className="mb-5" type="submit" variant="primary" size="lg">
                        Log in
                    </Button>
                    </Form.Group>
                </Form>
            </Container>
        </div>
        
    );
};

export default Login;