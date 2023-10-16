import Navbar from "../components/navbar.js";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


const RestaurantSearch = () => {

    const [zip, setzip] = useState({
        zipCode: ''
    });

    useEffect(() => {
        getData()
    })

    const getData = async () =>  {
        try {
            let response = await axios.get('http://restohub-api.us-east-2.elasticbeanstalk.com/api/restaurants')  
            console.log(response)  
        } catch (error) {
            console.error(error)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setzip({
            ...zip,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const {zipCode} = zip

        if (zipCode === '' || zipCode === null || !zipCode || zipCode.length !== 5 ) {
            toast.error('You must input a valid zip code!', {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }

        // getData(zipCode)
        console.log('Form submitted:', zipCode);
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
                        id="zipCode"
                        name="zipCode" 
                        value={zip.zipCode}
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