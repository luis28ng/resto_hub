import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios'; 
import { toast } from 'react-toastify';
import "../common/CheckoutForm.css"

const CheckoutForm = ({ amount }) => { 
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [paymentForm, setPaymentForm] = useState(true);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log("Stripe has not loaded.");
      return; // Stripe.js has not loaded yet.
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
      toast.error('Please check payment details!',{
                position: toast.POSITION.TOP_RIGHT,

            });
    } else {
      try {
        const response = await axios.post('http://localhost:8080/api/payment/charge', {
          amount: amount, // Amount in cents
          stripeToken: paymentMethod.id,
        });
        console.log('Payment successful!', response.data);
        toast.success(`Payment successful! $${amount / 100}`, {
                position: toast.POSITION.TOP_RIGHT,

            });
        setPaymentSuccess(true)
        setPaymentDetails(response.data)
        setPaymentForm(false)

      } catch (error) {
        console.error('Payment error:', error.response ? error.response.data : error.message);
        toast.error('Payment failed: Please check payment details!',{
                position: toast.POSITION.TOP_RIGHT,

            });
      }
    }
  };

  return (
    <div>
    {paymentForm && (
    <form onSubmit={handleSubmit} className="stripe-form">
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay ${amount / 100}.00   
      </button>
    </form>
    )}
    {paymentSuccess && (
        <div className="payment-details">
          <h4>Payment Successful!</h4>
          <p>Transaction ID: {paymentDetails.id}</p>
          <p>Amount: ${paymentDetails.amount / 100}</p>
          <p>Currency: {paymentDetails.currency.toUpperCase()}</p>
          <p>Status: {paymentDetails.status.toUpperCase()}</p>
        </div>
      )}
      </div>
  );
};

export default CheckoutForm;
