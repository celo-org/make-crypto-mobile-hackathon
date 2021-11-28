import React, { useContext } from 'react';
import { useContractKit } from '@celo-tools/use-contractkit';

import AppContext from '../../AppContext';
import Deal from '../../components/Deal/Deal';
import './Deals.css';

export default function Deals() {
  const { state } = useContext(AppContext);
  const { address: addr } = useContractKit();
  const address = typeof addr === 'string' ? addr.toLowerCase() : addr;

  if (state.loading) {
    return <div>Loading</div>;
  }

  if (!address) {
    return null;
  }

  const deals = state.deals.filter(
    (deal) => deal.buyer === address || deal.seller.name === address
  );

  if (deals.length === 0) {
    return null;
  }

  return (
    <div>
      <h2>Deals in progress</h2>
      <ul className="deals">
        {deals.map((deal) => {
          const { id, amount, buyer } = deal;
          const status = buyer === address ? 'PURCHASE' : 'SALE';
          return <Deal key={id} id={id} amount={amount} status={status} />;
        })}
      </ul>
    </div>
  );
}
