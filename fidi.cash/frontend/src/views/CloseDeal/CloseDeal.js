import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useContractKit } from '@celo-tools/use-contractkit';
import currency from 'currency.js';
import DealContract from '../../abi/Deal.json';
import AppContext from '../../AppContext';
import { closeDeal, fulfillDeal, getDeal } from '../../api';
import ConnectWallet from '../../components/ConnectWallet/ConnectWallet';
import Spinner from '../../components/Spinner/Spinner';
import InputInfo from '../../components/InputInfo/InputInfo';
import InlineError from '../../components/InlineError/InlineError';
import Buttons from '../../components/Buttons/Buttons';
import './CloseDeal.css';

const USD = (value) => currency(value, { symbol: 'USD', pattern: '# !' });
const cUSD = (value) => currency(value, { symbol: 'cUSD', pattern: '# !' });

export default function AcceptOffer() {
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);
  const [isSaving, setIsSaving] = useState(false);
  const { dealAddress: dealAddr } = useParams();
  const dealAddress =
    typeof dealAddr === 'string' ? dealAddr.toLowerCase() : dealAddr;
  const { address: addr, performActions } = useContractKit();
  const address = typeof addr === 'string' ? addr.toLowerCase() : addr;

  const [errorMessage, setErrorMessage] = useState(null);
  const onErrorDismiss = () => setErrorMessage(null);

  const [deal, setDeal] = useState(null);

  useEffect(() => getDeal(dealAddress).then(setDeal), [dealAddress]);

  if (!address) {
    return (
      <div>
        <ConnectWallet />
        <InputInfo type="bottom">
          Connect your wallet to work with deals
        </InputInfo>
      </div>
    );
  }

  if (!deal) {
    return null;
  }

  const {
    amount,
    value,
    order,
    fulfilled,
    seller,
    buyer,
    collateral,
    details
  } = deal;

  const handleConfirmReceipt = async () => {
    setIsSaving(true);
    try {
      await performActions(async (kit) => {
        const gasPrice = kit.web3.utils.toWei('0.5', 'Gwei');

        // Close deal
        const dealContract = new kit.web3.eth.Contract(
          DealContract.abi,
          dealAddress
        );

        const txObjectCloseDeal = await dealContract.methods.close();
        const txCloseDeal = await kit.sendTransactionObject(txObjectCloseDeal, {
          // feeCurrency: cUSD.address,
          gasPrice,
          from: address
        });
        await txCloseDeal.waitReceipt();
      });

      await closeDeal(dealAddress);
      history.push('/');
    } catch (error) {
      let errorValue = String(error);
      if (typeof error === 'object') {
        errorValue = JSON.stringify(error);
      }
      setErrorMessage(errorValue);
      console.error(errorValue);
    }
    setIsSaving(false);
  };

  const handleConfirmFulfillment = async () => {
    setIsSaving(true);
    try {
      await performActions(async (kit) => {
        const gasPrice = kit.web3.utils.toWei('0.5', 'Gwei');

        // Confirm fulfillment
        const dealContract = new kit.web3.eth.Contract(
          DealContract.abi,
          dealAddress
        );

        const txObjectFulfill = await dealContract.methods.fulfill();
        const txFulfill = await kit.sendTransactionObject(txObjectFulfill, {
          // feeCurrency: cUSD.address,
          gasPrice,
          from: address
        });
        await txFulfill.waitReceipt();
      });

      await fulfillDeal(dealAddress);
      getDeal(dealAddress).then(setDeal);
    } catch (error) {
      let errorValue = String(error);
      if (typeof error === 'object') {
        errorValue = JSON.stringify(error);
      }
      setErrorMessage(errorValue);
      console.error(errorValue);
    }
    setIsSaving(false);
  };

  return (
    <div>
      {buyer.address === address ? (
        <React.Fragment>
          <h2>Purchase in progress</h2>
          <div className="deal-details">
            {seller.address} {fulfilled ? 'has sent you' : 'should send you'}
            <span className="strong"> {USD(value).format()}</span>.
          </div>
          <div>
            <span className="strong">{cUSD(collateral).format()}</span> is
            locked upon closing the deal.
          </div>
          {!fulfilled && (
            <div className="deal-current-status">
              Please wait until the seller confirms dispatch of
              <span className="strong"> {USD(value).format()}</span> you have
              ordered.
            </div>
          )}
          {fulfilled && (
            <Buttons>
              {isSaving && <Spinner />}
              {!isSaving && (
                <React.Fragment>
                  <InlineError text={errorMessage} onDismiss={onErrorDismiss} />
                  <div className="block">
                    <button
                      type="button"
                      onClick={handleConfirmReceipt}
                      className="button"
                    >
                      Confirm receipt
                    </button>

                    <InputInfo type="bottom">
                      This will unlock your {cUSD(collateral).format()}{' '}
                      collateral
                    </InputInfo>
                  </div>
                </React.Fragment>
              )}
            </Buttons>
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h2>Sale in progress</h2>
          <div className="deal-details">
            <div>Your buyer is: {buyer.address}</div>
            <br />
            <div>
              You are selling{' '}
              <span className="strong">{USD(value).format()}</span> for{' '}
              <span className="strong">{cUSD(amount).format()}</span>.
            </div>
            <br />
            <div>
              <span className="strong">{cUSD(collateral).format()}</span> is
              locked upon closing the deal.
            </div>
            <br />
            {fulfilled && (
              <div className="deal-current-status">
                Please wait until the buyer confirms receipt of{' '}
                <span className="strong"> {USD(value).format()}</span> you have
                sent.
              </div>
            )}
            {!fulfilled && (
              <div className="deal-current-status">
                Please send{' '}
                <span className="strong"> {USD(value).format()}</span> following
                buyer's instructions:
                <div className="strong">
                  <br />
                  {details}
                </div>
              </div>
            )}
          </div>
          {!fulfilled && (
            <Buttons>
              {isSaving && <Spinner />}
              {!isSaving && (
                <React.Fragment>
                  <InlineError text={errorMessage} onDismiss={onErrorDismiss} />
                  <div className="block">
                    <button
                      type="button"
                      onClick={handleConfirmFulfillment}
                      className="button"
                    >
                      Cash is sent
                    </button>

                    <InputInfo type="bottom">
                      This will enable the buyer to confirm receipt of the cash
                    </InputInfo>
                  </div>
                </React.Fragment>
              )}
            </Buttons>
          )}
        </React.Fragment>
      )}
    </div>
  );
}
