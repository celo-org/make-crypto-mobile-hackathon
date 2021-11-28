import React from 'react';
import { useContractKit } from '@celo-tools/use-contractkit';
import OpenOffers from '../../components/OpenOffers/OpenOffers';
import OpenDeals from '../../components/OpenDeals/OpenDeals';
import Balance from '../../components/Balance/Balance';
import ConnectWallet from '../../components/ConnectWallet/ConnectWallet';
import InputInfo from '../../components/InputInfo/InputInfo';
import './Profile.css';

export default function Profile() {
  const { address: addr } = useContractKit();
  const address = typeof addr === 'string' ? addr.toLowerCase() : addr;

  if (!address) {
    return (
      <div>
        <ConnectWallet />
        <InputInfo type="bottom">
          Connect your wallet to access your profile
        </InputInfo>
      </div>
    );
  }

  return (
    <div>
      <h2>Address</h2>
      <div>{address}</div>
      <Balance />
      <OpenDeals />
      <OpenOffers />
    </div>
  );
}
