import Navbar from "../components/navbar.js";
import { getRestId } from "../utils/utils.js";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Container, Form, Modal } from "react-bootstrap";


const ManagerDashBoard = () => {

    const [restaurantId, setRestaurantId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newUserRole, setNewUserRole] = useState("");
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        setRestaurantId(getRestId);
    }, []);

    const resetModalState = () => {
        setUserInfo({});
        setNewUserRole('');
        setShowModal(false)
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Check if the email is valid
        if (!emailRegex.test(userInfo.email)) {
            toast.error("Invalid email address", {
                position: toast.POSITION.TOP_RIGHT
            })
            return;
        };

        const newUserInfo = {
            ...userInfo,
            appRole: newUserRole,
            restaurantId: restaurantId
        }

        try {

            const response = await axios.post('http://restohub-api.us-east-2.elasticbeanstalk.com/api/user/save-user', newUserInfo, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const newUserId = response.data.id;

            if (response.status === 200) {
                toast.success(`User created successfully. Your new user id is ${newUserId}`, {
                    position: toast.POSITION.TOP_RIGHT
                });
                resetModalState();
                // setShowModal(false)

            } else {
                toast.error("Failed to create new user, please try again", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (e) {
            toast.error("Error occurred while submitting request", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };
    
    const handleUserRoleChange = async (e) => {
        const selectedUserRole = e.target.value;
        setNewUserRole(selectedUserRole)
    };

    const handleUserInfoChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    return(
        <div>
            <Navbar />
            <ToastContainer />
            <Container>
                <h1>Manager Dashboard</h1>
                <Button onClick={() => setShowModal(true)} variant="success">Create new staff member</Button>
                <Modal show={showModal} onHide={() => {setShowModal(false)}}>
                    <Container>
                        <Form className="formclass centered" onSubmit={handleCreate}>
                            <Modal.Header closeButton>
                                <Modal.Title>Booking Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group>
                                    <div className="form-group">
                                        <Form.Label>Select a role</Form.Label>
                                            <Form.Select value={newUserRole} onChange={handleUserRoleChange}>
                                                <option value="" disabled>Select the role</option>
                                                <option value="RESTAURANT_STAFF">Restaurant staff</option>
                                                <option value="RESTAURANT_WAITER">Restaurant waiter</option>
                                            </Form.Select>
                                    </div>
                                </Form.Group>
                                <Form.Group>
                                    <div className="form-group"> 
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder="Email Address"
                                            name="email"
                                            value={userInfo.email}
                                            onChange={handleUserInfoChange}
                                            required
                                        />
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type='password'
                                            placeholder="Password"
                                            name="password"
                                            value={userInfo.password}
                                            onChange={handleUserInfoChange}
                                            required
                                        />
                                    </div>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Form.Group className="w-100 d-flex justify-content-between">
                                    <Button variant="danger" onClick={() => setShowModal(false)}>Close</Button>
                                    <Button variant="success" type="submit">Confirm Booking</Button>
                                </Form.Group>
                            </Modal.Footer>
                        </Form>
                    </Container>
                </Modal>
            </Container>
        </div>
    );
}  

export default ManagerDashBoard;
