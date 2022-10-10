import './Order.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

function Order() {
    return(
        <>
            <h1>Order</h1>
            <Link className="btn zoom-out zoom-out--red" to="/payment">
                Order a loaf
            </Link>
        </>
    );
}

export default Order;