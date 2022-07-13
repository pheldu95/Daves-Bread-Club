import './Order.css';
import React, { useState } from 'react';
// require('dotenv').config();

//components
import CheckoutForm from './CheckoutForm';
//stripe stuff
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51LKUSEFDtpwtvRKOXgnuDqZWIQIGXX1GktCgYfAMtYmXwFoOLLBttECVayGPDiknW3FdISxH22Js8xIHo92BcS1J00BKskXX0e');

function Order() {
    console.log(stripePromise);
    const options = {
        // passing the client secret obtained from the server
        clientSecret: 'sk_test_51LKUSEFDtpwtvRKO57HNf3Pm0K5elrFuTirtAnIXieE7v1FSpWpU4sbn6S357wG61vkVRc82IQ1QcxpNmkQ6gjEc002H7JYxH9',
    };
console.log(stripePromise);
    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    );
}

export default Order;