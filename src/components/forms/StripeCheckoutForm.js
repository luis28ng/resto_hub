import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import "../common/StripeCheckoutForm.css"

const stripePromise = loadStripe('pk_test_51OIuIuDO4Uky0rV8frmPM757FFsPJtY2PVnrQFLmjgDjlocSVO3VNTa1i1cj17WZ8loQt1c7ArEmVdvUvh2UkRDo00IdigWFpU'); 

const StripeCheckoutForm = ({amount}) => {
  return (
    <Elements stripe={stripePromise}>
        <div className="stripe-checkout">
                  <CheckoutForm amount={amount} />
        </div>
    </Elements>
  );
};

export default StripeCheckoutForm;

