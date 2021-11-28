import React from 'react';
import { Link } from 'react-router-dom';
import './Deal.css';

export default function Deal({ address, amount, status }) {
  return (
    <li className="deal">
      <Link to={`/deals/${address}`}>
        <div className="deal-header">
          <div>
            In progress: <span className="deal-amount">{amount}</span>
          </div>
          <div className="deal-status">{status}</div>
        </div>
      </Link>
    </li>
  );
}
