import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios'; 
import { toast } from 'react-toastify';

const CheckoutForm = ({ amount }) => { 
  const stripe = useStripe();
  const elements = useElements();

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
      } catch (error) {
        console.error('Payment error:', error.response ? error.response.data : error.message);
        toast.error('Payment failed: Please check payment details!',{
                position: toast.POSITION.TOP_RIGHT,

            });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay ${amount / 100}.00   
      </button>
    </form>
  );
};

export default CheckoutForm;
