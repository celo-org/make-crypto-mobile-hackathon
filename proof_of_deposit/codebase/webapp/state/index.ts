import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Network, useContractKit } from '@celo-tools/use-contractkit';
import { Address, eqAddress } from '@celo/base';
import { AddressUtils } from '@celo/utils';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useState } from 'react';
import useStateRef from 'react-usestateref';
import toast from 'react-hot-toast';
import { createContainer } from 'unstated-next';
import { FiatCurrency, tokens, locked_tokens } from '../constants';
import ERC20 from '../utils/abis/ERC20.json';

function getApolloClient(n: Network) {
  return new ApolloClient({
    uri: n.graphQl,
    cache: new InMemoryCache(),
  });
}

interface AccountSummary {
  address: string;
  name: string;
  authorizedSigners: {
    vote: Address;
    validator: Address;
    attestation: Address;
  };
  metadataURL: string;
  wallet: Address;
  dataEncryptionKey: string;
}

const defaultAccountSummary = {
  address: AddressUtils.NULL_ADDRESS,
  name: '',
  authorizedSigners: {
    vote: AddressUtils.NULL_ADDRESS,
    validator: AddressUtils.NULL_ADDRESS,
    attestation: AddressUtils.NULL_ADDRESS,
  },
  metadataURL: '',
  wallet: AddressUtils.NULL_ADDRESS,
  dataEncryptionKey: AddressUtils.NULL_ADDRESS,
};

const defaultBalances = tokens.reduce(
  (accum, cur) => ({
    ...accum,
    [cur.ticker]: {
      balance: new BigNumber(0),
      total_locked: new BigNumber(0),
      nonvoting_locked: new BigNumber(0),
      unlocking: new BigNumber(0),
      withdrawable: new BigNumber(0),
    }
  }),
  {}
);

const defaultSettings = {
  currency: FiatCurrency.USD,
  darkMode: false,
};
const LOCALSTORAGE_KEY = 'plock/settings';
let localSettings = {};
if (typeof localStorage !== 'undefined') {
  localSettings = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '{}');
}
const initialSettings = {
  ...defaultSettings,
  ...localSettings,
};

function State() {
  const { network, kit, address } = useContractKit();
  const [graphql, setGraphql] = useState(getApolloClient(network));
  const [settings, setSettings] = useState(initialSettings);

  const [accountSummary, setAccountSummary, accountSummaryRef] = useStateRef<AccountSummary>(
    defaultAccountSummary
  );
  const [balances, setBalances] = useState<{
    [x: string]: {
      balance: BigNumber;
      total_locked: BigNumber;
      nonvoting_locked: BigNumber;
      unlocking: BigNumber;
      withdrawable: BigNumber;
    }
  }>(defaultBalances);
  const [fetchingBalances, setFetchingBalances, fetchingBalancesRef] = useStateRef(false);

  useEffect(() => {
    setGraphql(getApolloClient(network));
  }, [network]);

  const fetchBalances = useCallback(async () => {
    if (fetchingBalancesRef.current) {
      return;
    }
    setFetchingBalances(true);

    const address = accountSummaryRef.current.address;
    if (eqAddress(address, AddressUtils.NULL_ADDRESS)) {
      setBalances(defaultBalances);
    }else{
      try {
        const goldToken = await kit.contracts.getGoldToken();
        const erc20s = await Promise.all(
          tokens
            .map(async (t) => {
              const tokenAddress = t.address;
              let balance;
              // this is due to a bug where erc20.balanceOf on native asset
              // is way off.
              if (eqAddress(tokenAddress, goldToken.address)) {
                balance = await goldToken.balanceOf(address);
              } else {
                const erc20 = new kit.web3.eth.Contract(
                  ERC20 as any,
                  tokenAddress
                );
                balance = await erc20.methods.balanceOf(address).call();
              }
              
              const locked_erc20 = new kit.web3.eth.Contract(
                  locked_tokens[t.ticker].contract.abi as any,
                  locked_tokens[t.ticker].address
              );

              let total_locked = await locked_erc20.methods.getAccountTotalLockedToken(address).call();
              let nonvoting_locked = await locked_erc20.methods.getAccountNonvotingLockedToken(address).call();
              let pendingWithdrawals = await locked_erc20.methods.getPendingWithdrawals(address).call();
              let withdrawals = pendingWithdrawals[0]
                .reduce(
                (totals, value, i) => {
                  value = new BigNumber(value);
                  const time = new BigNumber(pendingWithdrawals[1][i]);
                  const available = new Date(time.toNumber() * 1000);
          
                  if (available.getTime() < Date.now()) {
                    return {
                      unlocking: totals.unlocking.plus(value),
                      withdrawable: totals.withdrawable.plus(value),
                    };
                  }
          
                  return {
                    ...totals,
                    unlocking: totals.unlocking.plus(value),
                  };
                },
                { withdrawable: new BigNumber(0), unlocking: new BigNumber(0) }
              );

              return {
                ...t,
                balance,
                total_locked,
                nonvoting_locked,
                unlocking: withdrawals.unlocking,
                withdrawable: withdrawals.withdrawable
              };
            })
        );

        const balances = erc20s.reduce((accum, t) => {
          return {
            ...accum,
            [t.ticker]: {
              balance: new BigNumber(t.balance),
              total_locked: new BigNumber(t.total_locked),
              nonvoting_locked: new BigNumber(t.nonvoting_locked),
              unlocking: new BigNumber(t.unlocking),
              withdrawable: new BigNumber(t.withdrawable),
            }
          };
        }, {});

        setBalances({
          ...defaultBalances,
          ...balances,
        });
      } catch (e) {
        toast.error(e.message);
      }
    }

    setFetchingBalances(false);
    setTimeout(fetchBalances, 1000);
  }, [address, network, kit, accountSummary]);

  const fetchAccountSummary = useCallback(async () => {
    if (!address) {
      setAccountSummary(defaultAccountSummary);
      return;
    }

    const accounts = await kit.contracts.getAccounts();
    try {
      setAccountSummary(await accounts.getAccountSummary(address));
    } catch (_) {}
  }, [kit, address]);

  const updateSetting = useCallback(
    (property: string, value: any) => {
      setSettings((s) => {
        const newSettings = { ...s, [property]: value };
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newSettings));
        return newSettings;
      });
      localStorage;
    },
    [settings]
  );

  const track = useCallback(
    (event: string, props: any = {}) => {
      // @ts-ignore
      window.plausible(event, {
        props: {
          ...props,
          network: network.name,
        },
      });
    },
    [network]
  );

  const toggleDarkMode = useCallback(() => {
    track('plock/change-theme');
    if (settings.darkMode) {
      document.querySelector('html').classList.remove('dark');
      updateSetting('darkMode', false);
    } else {
      document.querySelector('html').classList.add('dark');
      updateSetting('darkMode', true);
    }
  }, [settings, updateSetting, track]);

  const updateDefaultFiatCurrency = useCallback(
    (c: FiatCurrency) => {
      track('plock/change-currency');
      updateSetting('currency', c);
    },
    [updateSetting]
  );

  useEffect(() => {
    fetchBalances();
    fetchAccountSummary();
  }, [fetchBalances, fetchAccountSummary]);

  return {
    graphql,
    accountSummary,
    fetchAccountSummary,
    accountSummaryRef,

    fetchBalances,
    balances,
    fetchingBalances,

    toggleDarkMode,
    updateDefaultFiatCurrency,
    settings,

    track,
  };
}

export const Base = createContainer(State);
