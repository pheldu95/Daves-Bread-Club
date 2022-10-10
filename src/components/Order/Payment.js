import { useEffect, useState, useMemo } from "react";
import {loadStripe} from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import {Elements} from "@stripe/react-stripe-js";
import axios from "axios";
import './Order.css';

function Payment(props) {
  const[stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const options = {
    clientSecret: clientSecret
  };
  useEffect(() =>{
    axios({
      method: 'GET',
      url: '/config'
    }).then(async(response) => {
      const publishableKey = response.data.publishableKey;
      setStripePromise(loadStripe(publishableKey));
    }).catch((error) => {
      console.log(error);
      alert(error);
    })
  }, [])

  useEffect(()=>{
    // fetch("create-payment-intent",{
    //   method: "POST",
    //   body: JSON.stringify({})
    // }).then(async(r)=>{
    //   const{clientSecret} = await r.json();
    //   setClientSecret(clientSecret);
    // })

    axios({
      method: 'POST',
      url: '/create-payment-intent',
      body: JSON.stringify({})
    }).then(async(response) => {
      const clientSecret = response.data.clientSecret;
      setClientSecret(clientSecret);
    }).catch((error) => {
      console.log(error);
      alert(error);
    })
  },[])
  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
