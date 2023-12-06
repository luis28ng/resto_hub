import React, { useState } from 'react';
import StripeCheckoutForm from '../components/forms/StripeCheckoutForm';

//TODO: Dynamically pass amount to StripeCheckoutForm
const WaiterDashBoard = () => {

  const [amount, setAmount] = useState(0);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div>
      <h1>Customer Order Dashboard</h1>
      <div style={{ textAlign: 'center', margin: '20px' }}>
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        placeholder="Enter amount"
      />
      </div>
      <StripeCheckoutForm amount={amount*100} /> 
    </div>
  );
};

export default WaiterDashBoard;
