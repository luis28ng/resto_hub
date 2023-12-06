import React, { useEffect, useState } from 'react';
import StripeCheckoutForm from '../components/forms/StripeCheckoutForm';
import axios from 'axios';
import { getRestId } from "../utils/utils.js";
import { Container } from 'react-bootstrap';
import CustomersTable from '../components/customerTable.js';

const apiUrl = 'http://restohub-api.us-east-2.elasticbeanstalk.com';

//TODO: Dynamically pass amount to StripeCheckoutForm
const WaiterDashBoard = () => {
    const [checkedInCustomers, setCheckedInCustomers] = useState([]);
    const [restaurantId, setRestaurantId] = useState("");

    const fetchCheckedInCustomers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/reservations/checkedIn`, {
                params: {
                    restaurantId: getRestId()
                }
            });

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

    useEffect(() => {
        const fetchData = async () => {
            setRestaurantId(getRestId());
            await fetchCheckedInCustomers();
        }

        fetchData();
    }, []);



    return (
        <div>
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
                <StripeCheckoutForm amount={1000} />
            </Container>
        </div>
    );
};

export default WaiterDashBoard;
