import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Navbar from "../components/navbar.js";
import { getRestId } from "../utils/utils.js";
import CustomerTable from '../components/CustomerTable.js';

const apiUrl = 'http://restohub-api.us-east-2.elasticbeanstalk.com';

const WaiterDashBoard = () => {
    const [checkedInCustomers, setCheckedInCustomers] = useState([]);
    const [showAddOrderForm, setShowAddOrderForm] = useState(false);
    const [restaurantId, setRestaurantId] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setRestaurantId(getRestId());
            await fetchCheckedInCustomers();
        }

        fetchData();
    }, []);

    const fetchCheckedInCustomers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/reservations/checkedIn`, {
                params: {
                    restaurantId: getRestId()
                }
            });

            console.log(response)

            // Filter reservations for today
            const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
            const filteredReservations = response.data.filter(reservation => {
                const reservationDate = reservation.reservationDate.split(' ')[0];
                return reservationDate === today;
            });
            setCheckedInCustomers(filteredReservations);
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
                            <CustomerTable checkedInCustomers={checkedInCustomers} />
                        </Container>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default WaiterDashBoard;
