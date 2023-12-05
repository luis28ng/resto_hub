import Navbar from "../components/navbar.js";
import { getRestId } from "../utils/utils.js";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Container, Form, Modal } from "react-bootstrap";
import DataTable from 'react-data-table-component';


const ManagerDashBoard = () => {

    const [restaurantId, setRestaurantId] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newUserRole, setNewUserRole] = useState("");
    const [allStaff, setAllStaff] = useState([])
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    });
    const [editStaffInfo, setEditStaffInfo] = useState({
        email: "",
        appRole: "",
        username: ""
    })

    useEffect(() => {
        setRestaurantId(getRestId());
        getStaff();
    }, []);

    const getStaff = async () => {

        try {
            const response = await axios.get('http://restohub-api.us-east-2.elasticbeanstalk.com/api/manager/getAllStaff', {
                params: {
                    restaurantId: getRestId()
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            setAllStaff(response.data);
        } catch (e) {
            console.error("Error fetching data: ", e);
        }

    };

    const resetModalState = () => {
        setUserInfo({});
        setNewUserRole('');
        setShowCreateModal(false)
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
            const newUser = response.data.appRole;

            if (response.status === 200) {
                toast.success(`${newUser} created successfully. Your new user id is ${newUserId}`, {
                    position: toast.POSITION.TOP_RIGHT
                });
                resetModalState();
                getStaff();

            } else {
                toast.error("Failed to create new user, please try again", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (e) {
            if (e.response && e.response.status === 400) {
                toast.error("Error: This email already exists", {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else {
                console.error("Error occurred while submitting request", e);
                toast.error("Error occurred while submitting request", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }
    };

    const handleDelete = async (e) => {

        const userEmail = e.email;
        if (!userEmail) {
            toast.error("Please select a user.", {
                position: toast.POSITION.TOP_RIGHT
            })
            return;
        }
        const shouldDelete = window.confirm(`Are you sure you want to delete the user with email ${userEmail}?`);

        if (shouldDelete) {
            // console.log(`Deleting user ${userEmail}`)
            try {
                const response = await axios.delete('http://restohub-api.us-east-2.elasticbeanstalk.com/api/manager/deleteStaff', {
                    params: {
                        email: userEmail
                    }
                })

                if (response.status === 200) {
                    toast.success(`User ${userEmail} has been succesfully removed`, {
                        position: toast.POSITION.TOP_RIGHT
                    });

                    getStaff();
                } else {
                    toast.error(`Unkown server error occurred, please try again.`, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                };

            } catch (error) {
                toast.error(error, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        };
    };

    const handleEditButton = async (row) => {
        console.log(row)
        setEditStaffInfo({
            email: row.email,
            username: row.username,
            appRole: row.appRole
        })
        setShowEditModal(true);
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

    const columns = [
        { name: 'Email', selector: (row, i) => row.email, center: true, sortable: true },
        { name: 'Role', selector: (row, i) => row.appRole, center: true, sortable: true },
        {
            name: '',
            cell: (row, index, column, id) => (
                <Container style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button onClick={() => handleEditButton(row)} variant="success">Edit</Button>
                </Container>
            ),
            center: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: '',
            cell: (row, index, column, id) => (
                <Container style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button onClick={() => handleDelete(row)} variant="danger">Delete</Button>
                </Container>
            ),
            center: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ]

    const handleEdit = async (e) => {
        e.preventDefault();
        console.log(editStaffInfo)
    }

    return (
        <div>
            <Navbar />
            <ToastContainer />
            <Container>
                <h1>Manager Dashboard</h1>
                <Button onClick={() => setShowCreateModal(true)} variant="success">Create new staff member</Button>
                <Modal show={showCreateModal} onHide={() => { setShowCreateModal(false) }}>
                    <Container>
                        <Form className="formclass centered" onSubmit={handleCreate}>
                            <Modal.Header closeButton>
                                <Modal.Title>Create a new user</Modal.Title>
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
                                    <Button variant="danger" onClick={() => setShowCreateModal(false)}>Close</Button>
                                    <Button variant="success" type="submit">Confirm</Button>
                                </Form.Group>
                            </Modal.Footer>
                        </Form>
                    </Container>
                </Modal>
                <Container>
                    <DataTable
                        columns={columns}
                        data={allStaff}
                        fixedHeader
                        striped
                    />
                </Container>
                <Container>
                    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                        <Form onSubmit={handleEdit}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit user</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder="Email Address"
                                        name="email"
                                        value={editStaffInfo.email}
                                        onChange={(e) => setEditStaffInfo({ ...editStaffInfo, email: e.target.value })}
                                        required
                                    />
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder="Username"
                                        name="username"
                                        value={editStaffInfo.username}
                                        onChange={(e) => setEditStaffInfo({ ...editStaffInfo, username: e.target.value })}
                                        required
                                    />
                                    <Form.Label>Role</Form.Label>
                                    <Form.Select
                                        value={editStaffInfo.appRole}
                                        onChange={(e) => setEditStaffInfo({ ...editStaffInfo, appRole: e.target.value })}
                                    >
                                        <option value="RESTAURANT_STAFF">Restaurant staff</option>
                                        <option value="RESTAURANT_WAITER">Restaurant waiter</option>
                                    </Form.Select>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Form.Group className="w-100 d-flex justify-content-between">
                                    <Button variant="success" type="submit">Save</Button>
                                    <Button variant="danger" onClick={() => { setShowEditModal(false); setEditStaffInfo({}); }}>Close</Button>
                                </Form.Group>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                </Container>
            </Container>
        </div>
    );
}

export default ManagerDashBoard;
