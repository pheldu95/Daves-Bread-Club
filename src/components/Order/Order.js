import './Order.css';
import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

function Order() {
    console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
    const [product, setProduct] = useState({
        name: "Loaf of Bread",
        price: 10,

    });
    
    const makeOrder = token =>{
        const body = {
            token,
            product
        }
        axios.post('/order', body).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
    }
    return(
        <>
            <h1>Order</h1>
            <StripeCheckout
                stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
                token={makeOrder}
                amount = {product.price *100}
                name="Buy a Loaf"
            >
                <button className="btn zoom-out zoom-out--red">Order a loaf</button>
            </StripeCheckout>
        </>
    );
}

export default Order;