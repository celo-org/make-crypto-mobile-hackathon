import React, { useEffect, useState, useCallback } from 'react';
import { useContractKit } from '@celo-tools/use-contractkit';
import currency from 'currency.js';
import Spinner from '../../components/Spinner/Spinner';
import Deal from '../../components/Deal/Deal';
import { getOpenDeals } from '../../api';
import './OpenDeals.css';

const USD = (value) => currency(value, { symbol: 'USD', pattern: '# !' });
const cUSD = (value) => currency(value, { symbol: 'cUSD', pattern: '# !' });

export default function OpenOffers() {
  const { address: addr } = useContractKit();
  const address = typeof addr === 'string' ? addr.toLowerCase() : addr;

  const [loading, setLoading] = useState(false);
  const [deals, setDeals] = useState([]);

  const loadDeals = useCallback(async (address) => {
    setLoading(true);
    const deals = await getOpenDeals(address);
    setDeals(deals);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!address) {
      return;
    }
    loadDeals(address);
  }, [address, loadDeals]);

  if (deals.length === 0) {
    return null;
  }

  return (
    <div>
      <h2>Deals in progress</h2>
      <ul className="deals">
        {deals.map((deal) => {
          const { address: dealAddress, amount, value, buyer, offer } = deal;
          const isBuyer = buyer.address === address;
          const dealAmount = isBuyer
            ? USD(value).format()
            : cUSD(amount).format();
          const status = isBuyer ? 'PURCHASE' : 'SALE';
          return (
            <Deal
              key={dealAddress}
              address={dealAddress}
              amount={dealAmount}
              status={status}
            />
          );
        })}
      </ul>
      {loading && <Spinner />}
    </div>
  );
}
