import React, { useEffect, useState } from 'react';
import { useContractKit } from '@celo-tools/use-contractkit';
import currency from 'currency.js';
import Spinner from '../../components/Spinner/Spinner';
import { getBalance } from '../../api';
import './Balance.css';

const USD = (value) => currency(value, { symbol: 'USD', pattern: '# !' });
const cUSD = (value) => currency(value, { symbol: 'cUSD', pattern: '# !' });

export default function Balance() {
  const { address: addr } = useContractKit();
  const address = typeof addr === 'string' ? addr.toLowerCase() : addr;

  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (!address) {
      return;
    }
    setLoading(true);
    getBalance(address).then((balance) => {
      setBalance(balance);
      setLoading(false);
    });
  }, [address]);

  if (!address) {
    return null;
  }

  return (
    <div>
      {loading && <Spinner />}
      {!loading && (
        <div>
          <h2>Balance</h2>
          <div className="balance-item">
            Total:{' '}
            <span className="strong">{cUSD(balance?.total).format()}</span>
          </div>
          <div className="balance-item">
            Locked in deals:{' '}
            <span className="strong">{cUSD(balance?.locked).format()}</span>
          </div>
          <div className="balance-item">
            Redeemable:{' '}
            <span className="strong">{cUSD(balance?.available).format()}</span>
          </div>
        </div>
      )}
    </div>
  );
}
