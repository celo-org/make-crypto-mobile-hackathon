import React from 'react';
import { Link } from 'react-router-dom';
import currency from 'currency.js';
import './Offer.css';

const USD = (value) => currency(value, { symbol: 'USD', pattern: '# !' });
const cUSD = (value) => currency(value, { symbol: 'cUSD', pattern: '# !' });

export default function Offer({ address, price, amount, details, user }) {
  return (
    <li className="offer">
      <Link to={`/offers/${address}`}>
        <div className="offer-header">
          <div>
            <span className="offer-price">{cUSD(price).format()}</span> for 1
            USD
          </div>
          <div className="offer-amount">Max {amount} USD</div>
        </div>
        <br />
        <div className="offer-comment">{details}</div>
      </Link>
    </li>
  );
}
