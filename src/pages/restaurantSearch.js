import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import DataTable from 'react-data-table-component';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Button, Form, Container, Card } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReCAPTCHA from "react-google-recaptcha";
import HomePageCarousel from '../components/HomePageCarousel';
import HomePageCarouselBottom from '../components/HomePageBottom';


import { color } from 'framer-motion';

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
    const [tableTitle, setTableTitle] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [partySize, setPartySize] = useState('');
    const [selectedRestaurant, setSelectedRestaurant] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [unavailableSlots, setUnavailableSlots] = useState([]);
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        emailAddress: ''
    })
    const [captchaClicked, setCaptchaClicked] = useState(false);

    const resetModalState = () => {
        setUserInfo({});
        setPartySize('');
        setSelectedDate(null);
        setCaptchaClicked(false);
    };

    const handleZipCodeChange = (e) => {
        console.log('Input Value:', e.target.value);
        setZip(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (zip === '' || zip === null || !zip || zip.length !== 5) {
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

    const recaptchaClicked = () => {
        setCaptchaClicked(true)
    }

    const columns = [
        { name: 'Name', selector: (row, i) => row.name, center: true, sortable: true },
        { name: 'Address', selector: (row, i) => row.streetAddress1, center: true, sortable: true },
        { name: 'Zip code', selector: (row, i) => row.zipCode, center: true, sortable: true },
    ];

    const ExpandableRowComponent = ({ data }) => {
        const handleBookNowClick = () => {
            setShowModal(true);
        };
        setSelectedRestaurant(data.id)
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
                const params = {
                    restaurantId: selectedRestaurant,
                    partySize: selectedPartySize
                };

                // Make the API call using Axios
                const response = await axios.get('http://restohub-api.us-east-2.elasticbeanstalk.com/api/reservations/getReservedTimes', { params });


                console.log('API Response:', response.data);
                const unavailableSlots = response.data.map((reservation) => {
                    const reservationDate = new Date(reservation.reservationDate);
                    return reservationDate;
                });

                setUnavailableSlots(unavailableSlots);

            } catch (error) {
                console.error('Error fetching data from API:', error);
            }
        }
    };


    const isDateDisabled = (date) => {
        // Check if the date is in the list of disabled dates and times
        for (const reservedDate of unavailableSlots) {
            if (date.getFullYear() === reservedDate.getFullYear() &&
                date.getMonth() === reservedDate.getMonth() &&
                date.getDate() === reservedDate.getDate() &&
                date.getHours() === reservedDate.getHours() &&
                date.getMinutes() === reservedDate.getMinutes()) {
                // If both date and time match, it's disabled
                return false;
            };
        }
        // If no match is found, the date is not disabled
        return true;
    };

    const handleUserInfoChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleBooking = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Check if the email is valid
        if (!emailRegex.test(userInfo.emailAddress)) {
            toast.error("Invalid email address", {
                position: toast.POSITION.TOP_RIGHT
            })
            return;
        };

        let formattedDate = formatDate(selectedDate);

        const parsedPartySize = parseInt(partySize, 10);

        const reservationInfo = {
            ...userInfo,
            partySize: parsedPartySize,
            reservationDate: formattedDate,
            restaurantId: selectedRestaurant
        }

        try {
            const response = await axios.post('http://restohub-api.us-east-2.elasticbeanstalk.com/api/reservations/create', reservationInfo, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const reservationCode = response.data.reservationCode
            // Handle the response as needed
            if (response.status === 200) {
                toast.success(`Reservation submitted successfully. Your reservation code is "${reservationCode}"`, {
                    position: toast.POSITION.TOP_RIGHT
                });
                resetModalState();
                setShowModal(false)

            } else {
                toast.error("Failed to submit reservation, please try again", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (error) {
            toast.error("Error occurred while submitting reservation", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    const formatDate = (date) => {
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let time = date.toLocaleTimeString("en-GB")

        let formattedDate = `${year}-${month}-${day} ${time}`
        return formattedDate
    };


    return (
        <div style={{ backgroundColor: 'aliceblue' }}>
            <div>
                <ToastContainer />
                <HomePageCarousel />
                <Container className='cardContainer'>
                    <Card border="primary">
                        <Card.Body>
                            <Form className="formclass centered" onSubmit={handleSubmit}>
                                <h1 style={{textAlign: 'center'}}>Enter Zip Code</h1>
                                <Form.Group className="mb-3" controlId="formZip">
                                    <Form.Label></Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder="Zip Code"
                                        name="zipCode"
                                        value={zip}
                                        onChange={handleZipCodeChange}
                                    />
                                </Form.Group>
                                <Form.Group className="d-grid gap-2">
                                    <Button className="mb-5" type="submit" variant="primary" size="lg">
                                        Enter
                                    </Button>
                                </Form.Group>
                            </Form>

                        </Card.Body>
                    </Card>
                </Container>
            </div>
            <div>
                <Container style={{marginBottom: '100px'}}> 
                    { (restaurants && restaurants.length != 0) &&
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
                    }
                    
                </Container>
            </div>
            <Modal show={showModal} onHide={() => { setShowModal(false); resetModalState(); }}>
                <Container>
                    <Form className="formclass centered" onSubmit={handleBooking}>
                        <Modal.Header closeButton>
                            <Modal.Title>Booking Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group>
                                <div className="form-group">
                                    <Form.Label>Select your party size:</Form.Label>
                                    <Form.Select value={partySize} onChange={handlePartySizeChange}>
                                        <option value="" disabled>Select the number of people</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </Form.Select>
                                    <br></br>
                                    {partySize && (
                                        <div className="form-group">
                                            <Form.Label>Select Date and Time:</Form.Label>
                                            <p></p>
                                            <DatePicker
                                                placeholderText="Click to select a date"
                                                showIcon
                                                selected={selectedDate}
                                                minTime={new Date().setHours(10, 0)} // 10:00 AM
                                                maxTime={new Date().setHours(22, 0)} // 10:00 PM
                                                onChange={(date) => setSelectedDate(date)}
                                                filterDate={isDateDisabled}
                                                filterTime={isDateDisabled}
                                                minDate={new Date()}
                                                showTimeSelect
                                                dateFormat="Pp"
                                                timeIntervals={60}
                                            />
                                        </div>
                                    )}
                                    <br></br>
                                    {(partySize && selectedDate) && (
                                        <div className="form-group">
                                            <Form.Label>First name</Form.Label>
                                            <Form.Control
                                                type='text'
                                                placeholder="First Name"
                                                name="firstName"
                                                value={userInfo.firstName}
                                                onChange={handleUserInfoChange}
                                                required
                                            />
                                            <Form.Label>Last name</Form.Label>
                                            <Form.Control
                                                type='text'
                                                placeholder="Last Name"
                                                name="lastName"
                                                value={userInfo.lastName}
                                                onChange={handleUserInfoChange}
                                                required
                                            />
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type='text'
                                                placeholder="Email"
                                                name="emailAddress"
                                                value={userInfo.emailAddress}
                                                onChange={handleUserInfoChange}
                                                required
                                            />
                                            <br></br>
                                            <ReCAPTCHA
                                                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                                onChange={recaptchaClicked} />
                                        </div>
                                    )}
                                </div>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Form.Group className="w-100 d-flex justify-content-between">
                                <Button variant="danger" onClick={() => setShowModal(false)}>Close</Button>
                                {captchaClicked && (<Button variant="success" type="submit">Confirm Booking</Button>)}
                            </Form.Group>
                        </Modal.Footer>
                    </Form>
                </Container>
            </Modal>
        {/* <HomePageCarouselBottom /> */}

        </div>
    );
}

export default RestaurantSearch;
