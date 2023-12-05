import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import OrderForm from './forms/OrderForm';

const ExpandableRowComponent = ({ data }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleRowClick = () => {
        setIsExpanded(true);
    };

    return (
        <Container>
            {/* Render your regular row content here */}
            <Row
                style={{ cursor: 'pointer', borderBottom: '1px solid #ddd', padding: '10px' }}
                onClick={handleRowClick}
            >
                {/* Render the OrderForm component with necessary props */}
                <OrderForm customer={data} />
            </Row>
        </Container>
    );
};

export default ExpandableRowComponent;
