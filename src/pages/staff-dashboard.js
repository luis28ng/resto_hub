import Navbar from "../components/navbar.js";
import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { Button, Container, Tab, Tabs } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { getRestId } from "../utils/utils.js";


const StaffDashBoard = () => {
    const [activeTab, setActiveTab] = useState('today');
    const [reservations, setReservations] = useState([]);
    const [dateRange, setDateRange] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [restaurantId, setRestaurantId] = useState('')

    const selectedDateRangeToday = () => {
        console.log("Today tab selected");
        const today = new Date();
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + 1);

        const formattedStartDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} 00:00:00`;
        const formattedEndDate = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')} 00:00:00`;

        setDateRange([formattedStartDate, formattedEndDate]);
        setActiveTab('today');
    };

    const selectedDateRangeThisWeek = () => {
        console.log("This week tab selected");
        const today = new Date();
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + 7);

        const formattedStartDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} 00:00:00`;
        const formattedEndDate = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')} 00:00:00`;

        setDateRange([formattedStartDate, formattedEndDate]);
        setActiveTab('thisWeek');
    };

    useEffect(() => {
        selectedDateRangeToday(); // Set the active tab and date range for "today" tab
        setRestaurantId(getRestId);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const [startDate, endDate] = dateRange;
            const params = {
                restaurantId: restaurantId, // restaurantId is hardcoded for now
                startDate: startDate,
                endDate: endDate
            };
    
            try {
                const response = await axios.get("http://restohub-api.us-east-2.elasticbeanstalk.com/api/reservations/search", {
                    params: params,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                setReservations(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData()
    }, [dateRange]);

    
    const columns = [
        {name: 'First Name', selector: (row, i) => row.firstName, center: true, sortable: true},
        {name: 'Last Name', selector: (row, i) => row.lastName, center: true, sortable: true },
        {name: 'Reservation', selector: (row, i) => row.reservationDate, center: true, sortable: true },
    ];
      
    const handleRowSelected = (state) => {
        console.log(reservations)
        setSelectedRows(state.selectedRows.map((row) => row.id));
    };
    
    const handleCheckIn = async () => {

        if (selectedRows === null || selectedRows.length === 0 || selectedRows === undefined) {
            toast.error('No reservations selected for check-in', {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }

        let reservationId = selectedRows[0];
        try {
            let response = await axios.put('http://restohub-api.us-east-2.elasticbeanstalk.com/api/reservations/checkIn', null, {
                params: {
                    reservationId: reservationId
                }
            })
            
            if (response.status === 200) {
                toast.success(`Checked in Reservation: ${reservationId}`, {
                    position: toast.POSITION.TOP_RIGHT
                });
                
                setReservations(() => {
                    reservations.filter(res => res.id !== reservationId)
                });
                
            } else if (!response.data) {
                toast.error(`No Invalid Reservation ID Provided: ${reservationId}`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else {
                toast.error(`Unkown server error occurred`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (error) {
            toast.error("Error occurred while submitting reservation", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };
    
    return(
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
                </Tabs>
            </Container>
        </div>
    );
}  

export default StaffDashBoard;
