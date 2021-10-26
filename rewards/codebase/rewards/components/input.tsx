import { useContractKit } from '@celo-tools/use-contractkit';
import BigNumber from 'bignumber.js';
import QRCode from 'qrcode.react';
import { InputHTMLAttributes, useState } from 'react';
if (typeof window != 'undefined') {
  var QrReader = require('react-qr-reader');
}
import Web3 from 'web3';
import { toast } from '.';
import { Token, tokens } from '../constants';
import { CopyText } from './copy-text';
import { Modal } from './modals';
import Image from 'next/image';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className } = props;
  const clean = { ...props, className: undefined };
  return (
    <input
      {...clean}
      className={`w-full appearance-none block px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-indigo-500 sm:text-sm dark:bg-gray-600 w-64 ${className}`}
    />
  );
}

export function AddressInput(
  props: InputHTMLAttributes<HTMLInputElement> & {
    copyable?: boolean;
    scanToInput?: boolean;
    scanToCopy?: boolean;
  }
) {
  const [qrScanModal, setQrScanModal] = useState(false);
  const [qrInputModal, setQrInputModal] = useState(false);

  const handleScan = (value: string) => {
    if (value) {
      console.log('handleScan', value);
      // @ts-ignore
      props.onChange({ target: { value } });
      setQrInputModal(false);
    }
  };

  const handleError = (err: Error) => {
    console.log('handleError', err);
    toast.error(err.message);
    setQrInputModal(false);
  };

  return (
    <>
      {qrScanModal && (
        <Modal onDismiss={() => setQrScanModal(false)}>
          <QRCode
            className="w-48 w-48 md:h-96 md:w-96"
            style={{ height: undefined, width: undefined }}
            value={props.value as string}
          />
        </Modal>
      )}

      {qrInputModal && (
        <Modal onDismiss={() => setQrInputModal(false)}>
          <div className="w-48 w-48 md:h-96 md:w-96">
            <QrReader delay={300} onError={handleError} onScan={handleScan} />
          </div>
        </Modal>
      )}

      <div className="flex flex-row space-x-4 items-center">
        <Input
          type="text"
          placeholder="0x7d21685c17607338b313a7174bab6620bad0aab7"
          {...props}
        />

        <div className="flex items-center justify-around space-x-2">
          {props.copyable && <CopyText text={props.value as string} />}
          {props.scanToCopy && (
            <button onClick={() => setQrScanModal(true)}>
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
              </svg>
            </button>
          )}
          {props.scanToInput && (
            <button onClick={() => setQrInputModal(true)}>
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export function TokenInput(
  props: Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
    token: Token;
    onTokenChange?: (t: Token) => void;
    tokens?: Token[];
    max?: string;
    onChange: (x: string) => void;
  }
) {
  const { network } = useContractKit();

  return (
    <div className="group flex items-center rounded-md shadow-sm w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-600 focus-within:outline-none focus-within:ring-indigo-500 focus-within:border-indigo-500">
      <span
        className="inline-flex items-center ml-2"
        style={{ minWidth: '25px' }}
      >
        <Image
          height={25}
          width={25}
          src={`/tokens/${props.token.ticker}.png`}
          className="rounded-full"
        />
      </span>
      <input
        type="text"
        name="price"
        id="price"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder ?? '0.0'}
        className={`w-full appearance-none border-0 focus:outline-none focus:ring-0 block px-3 py-2 placeholder-gray-400 sm:text-sm dark:bg-gray-600`}
      />

      <div className="ml-auto flex items-center space-x-3">
        {props.max && (
          <button
            onClick={() => {
              const amount = new BigNumber(
                Web3.utils.fromWei(props.max, 'ether')
              );
              props.onChange(amount.toFixed(2));
            }}
            className="text-sm font-medium uppercase text-gray-700 hover:text-gray-800 dark:text-indigo-50 dark:hover:text-indigo-200 focus:outline-none focus:ring-0 transition"
          >
            MAX
          </button>
        )}

        {props.onTokenChange ? (
          <select
            id="currency"
            name="currency"
            className="border-transparent bg-transparent border-0 sm:text-sm rounded-md focus:outline-none focus:ring-0"
            style={{ marginRight: '0.5em' }}
            value={props.token.ticker}
            onChange={(e) => {
              const tok = tokens.find((t) => t.ticker === e.target.value);
              if (tok) {
                props.onTokenChange(tok);
              }
            }}
          >
            {(props.tokens || tokens)
              .filter((t) => !!t.networks[network.name])
              .map((t) => (
                <option value={t.ticker}>{t.ticker}</option>
              ))}
          </select>
        ) : (
          <>
            <div className="w-12 text-sm">{props.token.ticker}</div>
          </>
        )}
      </div>
    </div>
  );
}
