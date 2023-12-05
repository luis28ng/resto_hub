import React, { useCallback, useEffect, useState } from 'react';

import axios from "axios";
import DataTable from 'react-data-table-component';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Container, Tab, Tabs } from 'react-bootstrap';



import Navbar from "../components/navbar.js";
import { getRestId, formatDate } from "../utils/utils.js";
import ExpandableRowComponent from "../components/ExpandableRowComponent";

import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';



const baseURL = 'http://restohub-api.us-east-2.elasticbeanstalk.com/api';

const StaffDashBoard = () => {
    const [activeTab, setActiveTab] = useState('today');
    const [reservations, setReservations] = useState([]);
    const [dateRange, setDateRange] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [restaurantId, setRestaurantId] = useState('')
    const [checkedInCustomers, setCheckedInCustomers] = useState([]);

    /**
     * Sets the date range for the "Today" tab in the staff dashboard.
     * Calculates the start and end dates based on the current date,
     * formats them in the required format, and updates the state variables
     * for the date range and active tab.
     */
    const selectedDateRangeToday = () => {
        console.log("Today tab selected");

        const today = new Date();
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + 1);

        const formattedStartDate = formatDate(today);
        const formattedEndDate = formatDate(endDate);

        setDateRange([formattedStartDate, formattedEndDate]);
        setActiveTab('today');
    };

    /**
     * Sets the date range for the "current week" tab in the staff dashboard.
     * Calculates the start and end dates based on the current date,
     * formats them in the required format, and updates the state variables
     * for the date range and active tab.
     */
    const selectedDateRangeThisWeek = () => {
        console.log("This week tab selected");
        const today = new Date();
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + 7);

        const formattedStartDate = formatDate(today);
        const formattedEndDate = formatDate(endDate);

        setDateRange([formattedStartDate, formattedEndDate]);
        setActiveTab('thisWeek');
    };

    /**
     * Fetches the checked-in customers updates the state of the component.
     */
    const fetchCheckedInCustomers = async () => {
        console.log("Checked-in tab selected");
        try {
            const response = await axios.get(`${baseURL}/reservations/checkedIn`, {
                params: {
                    restaurantId: getRestId()
                }
            });
            setCheckedInCustomers(response.data);
            setActiveTab('checkedInCustomer');
        } catch (error) {
            console.log('Error thrown: ', error)
            // console.error('Error fetching checked-in customers:', error);
            setCheckedInCustomers([]); // Set to an empty array in case of an error
            setActiveTab('checkedInCustomer');
        }

    };

    /**
         * Fetches reservation data for a given date range and updates the resavation state.
         * 
         * @param {Array} dateRange - An array containing two elements representing the start and end dates of the desired date range.
         * @param {number} restaurantId - The ID of the restaurant for which the reservation data is being fetched.
         * 
         */
    const fetchReservationData = useCallback(async () => {
        const [startDate, endDate] = dateRange;
        const params = {
            restaurantId: restaurantId,
            startDate: startDate,
            endDate: endDate
        };

        try {
            const response = await axios.get(`${baseURL}/reservations/search`, {
                params: params,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setReservations(response.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }, [dateRange, restaurantId]);

    useEffect(() => {
        selectedDateRangeToday(); // Set the active tab and date range for "today" tab
        setRestaurantId(getRestId);
    }, []);

    useEffect(() => {
        fetchReservationData()
    }, [dateRange, fetchReservationData]);

    useEffect(() => {
        const fetchReservationDataAndCheckedIn = async () => {
            if (activeTab === 'checkedInCustomer') {
                await fetchCheckedInCustomers();
            }
        };

        fetchReservationDataAndCheckedIn();
    }, [activeTab]);


    const columns = [
        { name: 'First Name', selector: (row, i) => row.firstName, center: true, sortable: true },
        { name: 'Last Name', selector: (row, i) => row.lastName, center: true, sortable: true },
        { name: 'Reservation', selector: (row, i) => row.reservationDate, center: true, sortable: true },
    ];

    const handleRowSelected = (state) => {
        setSelectedRows(state.selectedRows.map((row) => row.id));
    };

    /*
     * Handles the check-in of reservations.
     */
    const handleCheckIn = async () => {
        try {
            if (!selectedRows || selectedRows.length === 0) {
                toast.error('No reservations selected for check-in', {
                    position: toast.POSITION.TOP_RIGHT
                });
                return;
            }

            const reservationId = selectedRows[0];
            const response = await axios.put(`${baseURL}/reservations/checkIn`, null, {
                params: {
                    reservationId
                }
            });

            if (response.status === 200) {
                toast.success(`Checked in Reservation: ${reservationId}`, {
                    position: toast.POSITION.TOP_RIGHT
                });

                setReservations(prevReservations => (
                    prevReservations.filter(res => res.id !== reservationId)
                ));

                fetchReservationData(); // Use the updated state here

            } else if (!response.data) {
                toast.error(`No Invalid Reservation ID Provided: ${reservationId}`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else {
                toast.error(`Unknown server error occurred`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (error) {
            toast.error("Error occurred while submitting reservation", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    return (
        <div>
            <ToastContainer />
            <Navbar />
            <Container>
                <br></br>
                <h1>Check-in Dashboard</h1>
                <Tabs
                    id="controlled-tabs"
                    activeKey={activeTab}
                    className="mb-3"
                    fill
                    justify
                    onSelect={(key) => {
                        if (key === 'today') {
                            selectedDateRangeToday();
                        } else if (key === 'thisWeek') {
                            selectedDateRangeThisWeek();
                        } else if (key === 'checkedInCustomer') {

                            fetchCheckedInCustomers();
                        }
                    }}
                >
                    <Tab eventKey="today" title="Today">
                        <br></br>
                        <Container>
                            {reservations && (
                                <Button onClick={handleCheckIn} variant="success">Check-In</Button>
                            )}
                        </Container>
                        <br></br>
                        <Container>
                            <DataTable
                                columns={columns}
                                data={reservations}
                                fixedHeader
                                striped
                                selectableRows
                                selectableRowsSingle={true}
                                selectableRowsNoSelectAll
                                onSelectedRowsChange={handleRowSelected}
                                selectableRowsHighlight
                            />
                        </Container>
                    </Tab>
                    <Tab eventKey="thisWeek" title="This week">
                        <br></br>
                        <Container>
                            {reservations && (
                                <Button onClick={handleCheckIn} variant="success">Check-In</Button>
                            )}
                        </Container>
                        <br></br>
                        <Container>
                            <DataTable
                                columns={columns}
                                data={reservations}
                                fixedHeader
                                striped
                                selectableRows
                                selectableRowsSingle={true}
                                selectableRowsNoSelectAll
                                onSelectedRowsChange={handleRowSelected}
                                selectableRowsHighlight
                            />
                        </Container>
                    </Tab>
                    <Tab eventKey="checkedInCustomer" title="Checked-In Customer">
                        <br></br>
                        <Container>
                            {checkedInCustomers && checkedInCustomers.length > 0 ? (
                                <DataTable
                                    columns={columns}
                                    data={checkedInCustomers}
                                    fixedHeader
                                    striped
                                    expandableRows
                                    expandableRowsComponent={ExpandableRowComponent}
                                />
                            ) : (
                                <p>No checked-in customers</p>
                            )}
                        </Container>
                    </Tab>
                </Tabs>
            </Container>
        </div>
    );
}

export default StaffDashBoard;
