import { requestAccountAddress, waitForAccountAuth } from '@celo/dappkit';
import React, { createContext, useContext, useState } from 'react';
import * as Linking from 'expo-linking';
import { useAuth } from './auth';
import { useModal } from './modal.context';

interface IWalletProps {
  connect: () => Promise<void>;
  wallet: {
    address: string;
    phoneNumber: string;
  };
  failed: boolean;
}

const WalletContext = createContext({} as IWalletProps);

const WalletProvider: React.FC = ({ children }) => {
  const [wallet, setWallet] = useState({ address: '', phoneNumber: '' });
  const [failed, setFailed] = useState(false);

  const { signIn } = useAuth();

  const { closeModal } = useModal();

  const connect = async () => {
    const requestId = 'login';
    const dappName = 'HIPA';
    const callback = Linking.makeUrl('/my/path');

    requestAccountAddress({
      requestId,
      dappName,
      callback,
    });

    const dappkitResponse = await waitForAccountAuth(requestId);

    if (!dappkitResponse) {
      setFailed(true);
      closeModal();
      return;
    }

    await signIn(dappkitResponse.address, dappkitResponse.phoneNumber);

    setWallet({
      address: dappkitResponse.address,
      phoneNumber: dappkitResponse.phoneNumber,
    });
    closeModal();
  };

  return (
    <WalletContext.Provider value={{ connect, wallet, failed }}>{children}</WalletContext.Provider>
  );
};

const useWallet = () => {
  const context = useContext(WalletContext);

  return context;
};

export { WalletProvider, useWallet };
