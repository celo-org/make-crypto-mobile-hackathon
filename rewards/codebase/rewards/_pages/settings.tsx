import { NetworkNames, useContractKit } from '@celo-tools/use-contractkit';
import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import {
  AddressInput,
  Input,
  Panel,
  PanelDescription,
  PanelGrid,
  PanelHeader,
  PanelWithButton,
  toast,
  Toggle,
} from '../components';
import { FiatCurrency, networks } from '../constants';
import { Base } from '../state';
import { ensureAccount } from '../utils/ensure-account';
import GrantFactory from '../utils/abis/ERC20Vestable.json';

export function Settings() {
  const { address, updateNetwork, network, performActions, kit } = useContractKit();
  const {
    accountSummary,
    fetchAccountSummary,
    fetchBalances,
    settings,
    toggleDarkMode,
    updateDefaultFiatCurrency,
    track,
    isGrantor,
  } = Base.useContainer();

  const [state, setState] = useState({
    name: '',
    metadataURL: '',
  });
  const [saving, setSaving] = useState(false);

  function changeProperty(property: string, value: any) {
    return setState((s) => ({ ...s, [property]: value }));
  }

  useEffect(() => {
    changeProperty('name', accountSummary.name);
    changeProperty('metadataURL', accountSummary.metadataURL);
  }, [accountSummary]);

  async function save() {
    // if (
    //   accountSummary.name === state.name &&
    //   accountSummary.metadataURL === state.metadataURL
    // ) {
    //   return;
    // }

    setSaving(true);
    track('account/update');

    // try {
    //   await performActions(async (k) => {
    //     await ensureAccount(k, k.defaultAccount);

    //     const accounts = await k.contracts.getAccounts();
    //     try {
    //       if (accountSummary.name !== state.name) {
    //         await accounts
    //           .setName(state.name)
    //           .sendAndWaitForReceipt({ from: k.defaultAccount });
    //       }
    //       if (accountSummary.metadataURL !== state.metadataURL) {
    //         await accounts
    //           .setMetadataURL(state.metadataURL)
    //           .sendAndWaitForReceipt({ from: k.defaultAccount });
    //       }

    //       toast.success('Account data updated');
    //     } catch (e) {
    //       console.warn(e);
    //       toast.error('Unable to update data');
    //     }

        
    try {
      if (!isGrantor) {
        const grantFactory = new kit.web3.eth.Contract(
          GrantFactory as any,
          "0x96d468A7Ce643f36c2b823b4068837d5b0913909"
        );
        await grantFactory.methods.RegisterGrantor().send({
                from: address });
      }
      else {
        toast.success('Already grantor');
      }
      toast.success('Account updated');
      fetchAccountSummary();
      fetchBalances();
    } catch (e) {
      toast.error(e.message);
    }

    setSaving(false);
  }

  return (
    <>
      <PanelWithButton>
        <PanelGrid>
          <div>
            <PanelHeader>Grantor</PanelHeader>
            <PanelDescription>
              Grantor has permission to create new grants
            </PanelDescription>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="block text-sm font-medium ">
                {isGrantor ? "You are already grantor" : "Register your address as grantor"}
              </h3>
            </div>
          </div>
        </PanelGrid>

        <button
          onClick={save}
          disabled={saving || isGrantor}
          className="ml-auto primary-button"
        >
          {saving ? (
            <Loader type="TailSpin" height={24} width={24} color="white" />
          ) : (
            'Register'
          )}
        </button>
      </PanelWithButton>

      {/* <Panel>
        <PanelGrid>
          <div>
            <PanelHeader>Account data</PanelHeader>
            <PanelDescription>
              Addresses and signing keys associated with your account
            </PanelDescription>
          </div>
          <div className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium ">
                Address
              </label>

              <AddressInput
                value={address}
                copyable
                scanToCopy
                disabled
                readOnly
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium ">
                Wallet address
              </label>
              <AddressInput
                placeholder="No wallet address set"
                value={accountSummary.wallet}
                copyable
                scanToCopy
                disabled
                readOnly
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium ">
                Vote signer
              </label>
              <AddressInput
                placeholder="No vote signing set"
                value={accountSummary.authorizedSigners.vote}
                copyable
                scanToCopy
                disabled
                readOnly
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium ">
                Attestation signer
              </label>
              <AddressInput
                placeholder="No attestation signing set"
                value={accountSummary.authorizedSigners.attestation}
                copyable
                scanToCopy
                disabled
                readOnly
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium ">
                Validator signer
              </label>
              <AddressInput
                placeholder="No attestation signing set"
                value={accountSummary.authorizedSigners.validator}
                copyable
                scanToCopy
                disabled
                readOnly
              />
            </div>
          </div>
        </PanelGrid>
      </Panel> */}

      <Panel>
        <PanelGrid>
          <div>
            <PanelHeader>RewPay</PanelHeader>
            <PanelDescription>
              Change behaviour of RewPay to suit your usage better.
            </PanelDescription>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label htmlFor="name" className="block text-sm font-medium ">
                Network
              </label>

              <select
                name=""
                id=""
                className="py-2 dark:bg-gray-750 rounded-md border border-gray-300 dark:border-gray-500"
                value={network.name}
                onChange={(e) => {
                  const network = networks.find(
                    (n) => n.name === e.target.value
                  );
                  updateNetwork(network);
                }}
              >
                {Object.values(NetworkNames).map((n) => (
                  <option value={n}>{n}</option>
                ))}
              </select>
            </div>

            {/* <div className="flex items-center justify-between">
              <label htmlFor="name" className="block text-sm font-medium ">
                Default Currency
              </label>

              <select
                name=""
                id=""
                className="py-2 dark:bg-gray-750 rounded-md border border-gray-300 dark:border-gray-500"
                value={settings.currency}
                onChange={(e) =>
                  updateDefaultFiatCurrency(e.target.value as FiatCurrency)
                }
              >
                {Object.values(FiatCurrency).map((n) => (
                  <option value={n}>{n}</option>
                ))}
              </select>
            </div> */}

            <div className="flex items-center justify-between">
              <label
                htmlFor="metadataURL"
                className="block text-sm font-medium "
              >
                Dark Mode
              </label>

              <Toggle active={settings.darkMode} onChange={toggleDarkMode} />
            </div>
          </div>
        </PanelGrid>
      </Panel>
    </>
  );
}
