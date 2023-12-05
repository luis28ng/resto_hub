import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Navbar from "../components/navbar.js";
import { getRestId } from "../utils/utils.js";
import AddOrderForm from '../components/forms/AddOrderForm.js';
import CustomersTable from '../components/tables/CustomerTable.js';

const apiUrl = 'http://restohub-api.us-east-2.elasticbeanstalk.com';

const WaiterDashBoard = () => {
    const [checkedInCustomers, setCheckedInCustomers] = useState([]);
    const [showAddOrderForm, setShowAddOrderForm] = useState(false);
    const [restaurantId, setRestaurantId] = useState("");

    useEffect(() => {
        setRestaurantId(getRestId());
        fetchCheckedInCustomers();
    }, []);

    const fetchCheckedInCustomers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/reservations/checkedIn`, {
                params: {
                    restaurantId: getRestId()
                }
            });
            console.log(response);
            setCheckedInCustomers(response.data);
        } catch (error) {
            console.error('Error fetching checked-in customers:', error);
            setCheckedInCustomers([]);
        }
    };

    const handleCloseAddOrderForm = () => {
        setShowAddOrderForm(false);
    };

    return (
        <div>
            <Navbar />
            <Container>
                <br></br>
                <h1>Customer order dashboard</h1>
                {checkedInCustomers.length === 0 ? (
                    <div>
                        <p>No checked-in customers yet</p>
                    </div>
                ) : (
                    <div>
                        <Container>
                            <CustomersTable checkedInCustomers={checkedInCustomers} />
                        </Container>
                    </div>
                )}
                {showAddOrderForm && (
                    <AddOrderForm
                        handleClose={handleCloseAddOrderForm}
                        restaurantId={restaurantId}
                        handleAddOrder={(orderRequest) => {
                            // Replace the following log with your actual API call to submit the order
                            console.log('Order Submitted:', orderRequest);
                            handleCloseAddOrderForm();
                        }}
                    />
                )}
            </Container>
        </div>
    );
};

export default WaiterDashBoard;
