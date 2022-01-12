import React , {useState, useEffect} from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CheckoutForm } from "./CheckoutForm";

const PUBLIC_KEY = "pk_test_51JaEkbSEdYeugLgvlWB5oKaxRL5mzfN4cFd420EEbpqYSgGC9mlSUVwLjHkAPYAb1WmMd95dWi4VjJ2LE00NN4El00BCpkntRt";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

function Stripe(props) {

  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm sellFunc= {props.sellFunc} />
    </Elements>
  );
};

export default Stripe;
