import React, { useEffect } from 'react';
import { useContractKit } from '@celo-tools/use-contractkit';
import { registerUser } from '../../api';

export default function Wallet() {
  const { address: addr, connect } = useContractKit();
  const address = typeof addr === 'string' ? addr.toLowerCase() : addr;

  useEffect(() => {
    if (!address) {
      return;
    }

    registerUser({ address });
  }, [address]);

  if (!address) {
    return (
      <button type="button" className="button" onClick={connect}>
        Connect wallet
      </button>
    );
  }

  return <div>{address}</div>;
}
