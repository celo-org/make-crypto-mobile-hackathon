import React, {useEffect, useState} from 'react';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import {getWeb3,getContracts} from "../utils.js";
import '../styles/cards.css'
import '../styles/grid.css'
import '../styles/global.css'
import '../styles/nav.css'
import '../styles/gallery.css'

function CheckoutForm (props) {

  const [web3,setWeb3]= useState(undefined)
  const [accounts,setAccounts]= useState([])
  const [contracts ,setContracts]= useState(undefined);

  useEffect(()=>{
    const init=async()=>{
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const contracts = await getContracts(web3);
      setWeb3(web3);
      setAccounts(accounts);
      setContracts(contracts);
    }
    init();
  },[])

  let te = 'not done'
  const stripe = useStripe();
  const elements = useElements();
  console.log(props.item);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:8080/stripe/charge",
          {
            amount: 999,
            id: id,
          }
        );

        console.log("Stripe 35 | data", response.data.success);
        if (response.data.success) {
          console.log("CheckoutForm.js 25 | payment successful!");
          te = 'done'
          const itemId =await props.item;
          props.sellFunc()


        }
      } catch (error) {
        console.log("CheckoutForm.js 28 | ", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <CardElement className="card button myst"/>
      <br />
      <button className="myst">Confirm Payment</button>
    </form>
  );
};
export {CheckoutForm} ;
