import './Order.css';
import React, { useState } from 'react';

//stripe stuff
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

function Order() {
    return (

        <div className="container">
            <h1>Order a Loaf!</h1>
        </div>

    );
}

export default Order;
