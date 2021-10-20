import React from 'react';
import Web3 from "web3";
import { inject, observer } from "mobx-react";

const Currency = ({ amount, precision }) => {
  if(amount) {
    amount = Web3.utils.fromWei(amount)

    if(typeof precision === 'undefined') precision = 5

    if(amount.includes('.')) {
      amount = amount.substring(0, amount.indexOf('.') + precision)
    }

    if('0.0000' === amount) {
      amount = '0'
    }

    return (
      <span className={`currency`}>
        { (+amount).toLocaleString(navigator.language) }
      </span>
    )
  }
}

export default inject("web3Store")(observer(Currency));
