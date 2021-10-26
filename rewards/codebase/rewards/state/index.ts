import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Network, useContractKit } from '@celo-tools/use-contractkit';
import { Address, eqAddress } from '@celo/base';
import { PendingWithdrawal } from '@celo/contractkit/lib/wrappers/LockedGold';
import { AddressUtils } from '@celo/utils';
import BigNumber from 'bignumber.js';
import { totalmem } from 'node:os';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { createContainer } from 'unstated-next';
import { FiatCurrency, tokens } from '../constants';
import ERC20 from '../utils/abis/ERC20.json';
import GrantFactory from '../utils/abis/ERC20Vestable.json';

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
    [cur.ticker]: new BigNumber(0),
  }),
  {}
);
const defaultLockedSummary = {
  total: new BigNumber(0),
  nonVoting: new BigNumber(0),
  withdrawable: new BigNumber(0),
  unlocking: new BigNumber(0),
};

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

  const [accountSummary, setAccountSummary] = useState<AccountSummary>(
    defaultAccountSummary
  );
  const [lockedSummary, setLockedSummary] = useState<{
    withdrawable: BigNumber;
    unlocking: BigNumber;
    nonVoting: BigNumber;
    total: BigNumber;
  }>(defaultLockedSummary);
  const [balances, setBalances] = useState<{
    [x: string]: BigNumber;
  }>(defaultBalances);
  const [fetchingBalances, setFetchingBalances] = useState(false);
  const [isGrantor, setIsGrantor] = useState(false);

  useEffect(() => {
    setGraphql(getApolloClient(network));
  }, [network]);

  const fetchBalances = useCallback(async () => {
    if (!address) {
      return;
    }

    setFetchingBalances(true);

    try {
      const goldToken = await kit.contracts.getGoldToken();
      console.log("Gold token fetch");
      const erc20s = await Promise.all(
        tokens
          .filter((t) => !!t.networks[network.name])
          .map(async (t) => {
            const tokenAddress = t.networks[network.name];
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

            return {
              ...t,
              balance,
            };
          })
      );

      const balances = erc20s.reduce((accum, t) => {
        return {
          ...accum,
          [t.ticker]: new BigNumber(t.balance),
        };
      }, {});

      setBalances({
        ...defaultBalances,
        ...balances,
      });
    } catch (e) {
      toast.error(e.message);
    }

    setFetchingBalances(false);

    // GetIsGrantor
    try {
      const grantFactory = new kit.web3.eth.Contract(
        GrantFactory as any,
        "0x96d468A7Ce643f36c2b823b4068837d5b0913909"
      );
      const isGrantorRet = await grantFactory.methods.IsGrantor(address).call();
      console.log("Is Grantor returned: ", isGrantorRet);
      setIsGrantor(isGrantorRet);
    } catch (e) {
      toast.error(e.message);
    }

  }, [address, network, kit]);

  const fetchAccountSummary = useCallback(async () => {
    if (!address) {
      return;
    }

    const accounts = await kit.contracts.getAccounts();
    try {
      setAccountSummary(await accounts.getAccountSummary(address));
    } catch (_) {}
  }, [kit, address]);

  const fetchLockedSummary = useCallback(async () => {
    if (!address) {
      return;
    }

    const locked = await kit.contracts.getLockedGold();

    const { pendingWithdrawals, lockedGold } = await locked.getAccountSummary(
      address
    );

    const withdrawals = pendingWithdrawals.reduce(
      (totals, { time, value }) => {
        const available = new Date(time.toNumber() * 1000);

        if (available.getTime() < Date.now()) {
          return {
            ...totals,
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

    try {
      setLockedSummary({
        unlocking: withdrawals.unlocking,
        withdrawable: withdrawals.withdrawable,
        total: lockedGold.total,
        nonVoting: lockedGold.nonvoting,
      });
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
    fetchAccountSummary();
    fetchBalances();
    //fetchLockedSummary();
  }, [fetchAccountSummary, fetchBalances/*, fetchLockedSummary*/]);

  return {
    graphql,
    accountSummary,
    fetchAccountSummary,

    fetchBalances,
    balances,
    fetchingBalances,

    lockedSummary,
    fetchLockedSummary,

    toggleDarkMode,
    updateDefaultFiatCurrency,
    settings,

    track,
    isGrantor,
  };
}

export const Base = createContainer(State);
