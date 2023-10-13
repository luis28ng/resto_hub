import Navbar from "../components/navbar.js";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from "react-bootstrap";
import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RestaurantSearch = () => {

    const [zipCode, setzipCode] = useState({
        zip_code: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setzipCode({
            ...zipCode,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const {zip_code} = zipCode

        if (zip_code === '' || zip_code === null || !zip_code) {
            toast.error('You must input a zip code!', {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }

        console.log('Form submitted:', zip_code);
    };


    return(
        <div>
            <div>
            <Navbar />
            <ToastContainer />
            <Container className="form-container">
                <Form className="formclass centered" onSubmit={handleSubmit}>
                    <h1>Enter zip code:</h1>
                    <Form.Group className="mb-3" controlId="formZip">
                        <Form.Label></Form.Label>
                        <Form.Control
                        type='text'
                        placeholder="Zip Code"
                        id="zip_code"
                        name="zip_code" 
                        value={zipCode.zip_code}
                        onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="d-grid gap-2">
                    <Button className="mb-5" type="submit" variant="primary" size="lg">
                        Enter
                    </Button>
                    </Form.Group>
                </Form>
            </Container>
            </div>
            <div>
                <h1>Here goes the table</h1>
            </div>
        </div>
    );
}  

export default RestaurantSearch;