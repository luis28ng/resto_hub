// CheckedInCustomersTable.js
import React from 'react';
import DataTable from 'react-data-table-component';
import ExpandableRowComponent from '../ExpandableRowComponent';

const CheckedInCustomersTable = ({ checkedInCustomers }) => {
    const columns = [
        { name: 'First Name', selector: (row) => row.firstName, center: true, sortable: true },
        { name: 'Last Name', selector: (row) => row.lastName, center: true, sortable: true },
        { name: 'Email Address', selector: (row) => row.emailAddress, center: true, sortable: true },
        { name: 'Party Size', selector: (row) => row.partySize, center: true, sortable: true },
        { name: 'Reservation Date', selector: (row) => row.reservationDate, center: true, sortable: true },

    ];

    return (
        <DataTable
            columns={columns}
            data={checkedInCustomers}
            fixedHeader
            striped
            expandableRows
            expandableRowsComponent={ExpandableRowComponent}
        />
    );
};

export default CheckedInCustomersTable;
