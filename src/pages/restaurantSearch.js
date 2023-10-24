import Navbar from "../components/navbar.js";
import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import DataTable from 'react-data-table-component';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Button, Form, Container } from 'react-bootstrap'; 

const customStyles = {
    rows: {
        style: {
            minHeight: '72px'
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', 
            paddingRight: '8px'
        },
    },
  };


const RestaurantSearch = () => {

    const [zip, setZip] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [tableTitle, setTableTitle] = useState('All restaurants with zip code:');
    const [showModal, setShowModal] = useState(false);
    const [partySize, setPartySize] = useState('');

    // useEffect(() => {
    //     getData();
    // }, []);

    const handleInputChange = (e) => {
        console.log('Input Value:', e.target.value);
        setZip(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (zip === '' || zip === null || !zip || zip.length !== 5 ) {
            toast.error('You must input a valid zip code!', {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }

        try {
            let response = await axios.get('http://restohub-api.us-east-2.elasticbeanstalk.com/api/restaurants/search', {
                params: {
                    zipCode: zip
                }
            });
            if (response.data.length === 0) {
                toast.error(`No restaurants with zip code: ${zip}`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            setRestaurants(response.data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch restaurant data. Please try again later.', {
                position: toast.POSITION.TOP_RIGHT
            });
        }; 
        setTableTitle(`All restaurants with zip code: ${zip}`);
        console.log('Form submitted:', zip);
    };

    const columns = [
        {name: 'Name', selector: (row, i) => row.name, center: true, sortable: true},
        {name: 'Address', selector: (row, i) => row.streetAddress1, center: true, sortable: true },
        {name: 'Zip code', selector: (row, i) => row.zipCode, center: true, sortable: true },
    ];

    const ExpandableRowComponent = ({ data }) => {
        const handleBookNowClick = () => {
            setShowModal(true);
        };
        return (
            <>
                {data && (
                    <div>
                        <Container>
                            <Row>
                                <Col xs={5}>
                                </Col>
                                <Col>
                                    <div>
                                        <p></p>
                                        <h3>{data.name}</h3>
                                        <p></p>
                                        <p>Address: {data.streetAddress1}</p>
                                        <p>City: {data.city}</p>
                                        <p>Phone number: {data.phoneNumber}</p>
                                    </div>
                                    <Button variant="success" onClick={handleBookNowClick}>
                                        Book Now!
                                    </Button>
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )}
            </>
        );
    };
    
    const handlePartySizeChange = async (e) => {
        const selectedPartySize = e.target.value;
        setPartySize(selectedPartySize);

        // Check if a party size is selected
        if (selectedPartySize !== "") {
            try {
                const apiUrl = 'http://example.com/api/endpoint';
                const params = {
                    partySize: selectedPartySize
                };

                // Make the API call using Axios
                const response = await axios.get(apiUrl, { params });


                console.log('API Response:', response.data);
            } catch (error) {
                console.error('Error fetching data from API:', error);
                // Handle errors (display error messages, etc.)
            }
        }
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
                        name="zipCode" 
                        value={zip}
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
                <DataTable 
                    title={tableTitle}
                    columns={columns}
                    data={restaurants}
                    fixedHeader
                    customStyles={customStyles}
                    striped
                    expandableRows
                    expandableRowsComponent={ExpandableRowComponent}
                />
            </div>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Booking Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor="exampleDropdown">Select your party size:</label>
                            <select className="form-control" id="exampleDropdown" defaultValue={""} value={partySize} onChange={handlePartySizeChange}>
                                <option value="" disabled>Select the number of people</option>
                                <option value="option-1">1</option>
                                <option value="option-2">2</option>
                                <option value="option-3">3</option>
                                <option value="option-4">4</option>
                            </select>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => setShowModal(false)}>Close</Button>
                        <Button variant="success" type="submit">Confirm Booking</Button>
                    </Modal.Footer>
                </Modal>
        </div>
    );
}  

export default RestaurantSearch;