import React from 'react';
import StripeCheckoutForm from '../components/forms/StripeCheckoutForm';

const WaiterDashBoard = () => {
  return (
    <div>
      <h1>Customer Order Dashboard</h1>
      <StripeCheckoutForm amount={1000} />
    </div>
  );
};

export default WaiterDashBoard;
