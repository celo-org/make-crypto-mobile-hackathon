import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import currency from 'currency.js';
import { useContractKit } from '@celo-tools/use-contractkit';
import FidiCore from '../../abi/FidiCore.json';
import Offer from '../../abi/Offer.json';
import { createOffer } from '../../api';
import ConnectWallet from '../../components/ConnectWallet/ConnectWallet';
import Spinner from '../../components/Spinner/Spinner';
import InputInfo from '../../components/InputInfo/InputInfo';
import InlineError from '../../components/InlineError/InlineError';
import Buttons from '../../components/Buttons/Buttons';
import './AddOffer.css';

const USD = (value) => currency(value, { symbol: 'USD', pattern: '# !' });
const cUSD = (value) => currency(value, { symbol: 'cUSD', pattern: '# !' });

export default function AddOffer() {
  const history = useHistory();
  const [isSaving, setIsSaving] = useState(false);
  const { address: addr, performActions, kit } = useContractKit();
  const address = typeof addr === 'string' ? addr.toLowerCase() : addr;

  const { register, watch, handleSubmit } = useForm();

  const calculateCollateral = (price, amount) => {
    return cUSD(amount).multiply(price).multiply(2);
  };

  const onSubmit = async (data) => {
    const { price, amount, details } = data;
    const collateral = calculateCollateral(price, amount);

    setIsSaving(true);
    try {
      const [offerAddr] = await performActions(async (kit) => {
        const networkId = await kit.web3.eth.net.getId();
        const cUSD = await kit.contracts.getStableToken();
        const fidiCore = new kit.web3.eth.Contract(
          FidiCore.abi,
          FidiCore.networks[networkId].address
        );

        const gasPrice = kit.web3.utils.toWei('0.5', 'Gwei');

        // Create offer
        const txObjectCreateOffer = await fidiCore.methods.createOffer(
          cUSD.address
        );
        const txCreateOffer = await kit.sendTransactionObject(
          txObjectCreateOffer,
          {
            // feeCurrency: cUSD.address,
            gasPrice,
            from: address
          }
        );
        const receipt = await txCreateOffer.waitReceipt();
        console.log({ receipt });

        const offerAddress = receipt.events.OfferCreated.returnValues.offer;

        // Increase allowance
        const approveTx = await cUSD
          .approve(offerAddress, kit.web3.utils.toWei(String(collateral)))
          .send({ gasPrice });
        await approveTx.waitReceipt();

        // Deposit collateral
        const offerContract = new kit.web3.eth.Contract(
          Offer.abi,
          offerAddress
        );

        const txObjectDepositCollateral =
          await offerContract.methods.depositCollateral(
            kit.web3.utils.toWei(String(collateral))
          );
        const txDepositCollateral = await kit.sendTransactionObject(
          txObjectDepositCollateral,
          {
            // feeCurrency: cUSD.address,
            gasPrice,
            from: address
          }
        );
        await txDepositCollateral.waitReceipt();

        return offerAddress;
      });
      const offerAddress =
        typeof offerAddr === 'string' ? offerAddr.toLowerCase() : offerAddr;

      await createOffer({
        address,
        offerAddress,
        price: currency(price).value,
        amount: currency(amount).value,
        collateral: collateral.value,
        details
      });

      history.push(`/offers/${offerAddress}`);
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

  const [errorMessage, setErrorMessage] = useState(null);
  const onErrorDismiss = () => setErrorMessage(null);

  let error = false;

  const defaultAmount = '';
  const amount = watch('amount', defaultAmount);

  let amountError = null;
  {
    const numericValue = Number(amount.replace(',', '.'));
    if (numericValue === 0) {
      amountError = <InputInfo error={true}>Specify amount</InputInfo>;
      error = true;
    } else if (Number.isNaN(numericValue)) {
      amountError = <InputInfo error={true}>Invalid amount</InputInfo>;
      error = true;
    }
  }

  const defaultPrice = '';
  const price = watch('price', defaultPrice);

  let priceError = null;
  {
    const numericValue = Number(price.replace(',', '.'));
    if (numericValue === 0) {
      priceError = <InputInfo error={true}>Specify price</InputInfo>;
      error = true;
    } else if (Number.isNaN(numericValue)) {
      priceError = <InputInfo error={true}>Invalid price</InputInfo>;
      error = true;
    }
  }

  if (!address) {
    return (
      <div>
        <ConnectWallet />
        <InputInfo type="bottom">
          Connect your wallet to create offers
        </InputInfo>
      </div>
    );
  }

  return (
    <div>
      <h2>Create new offer</h2>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="amount">Amount in USD to sell</label>
        <div style={{ position: 'relative' }}>
          <input
            autoFocus
            id="amount"
            name="amount"
            className="offer-input"
            type="number"
            step="any"
            rules={{
              required: true,
              validate: (value) => {
                const numericValue = Number(value);
                if (Number.isNaN(numericValue)) return false;
                if (numericValue === 0) return false;
                return true;
              }
            }}
            ref={register}
            disabled={isSaving}
          ></input>
          {amountError}
        </div>
        <label htmlFor="price">Price in cUSD per 1 USD</label>
        <div style={{ position: 'relative' }}>
          <input
            id="price"
            name="price"
            className="offer-input"
            type="number"
            step="any"
            rules={{
              required: true,
              validate: (value) => {
                const numericValue = Number(value);
                if (Number.isNaN(numericValue)) return false;
                if (numericValue === 0) return false;
                return true;
              }
            }}
            ref={register}
            disabled={isSaving}
          ></input>
          {priceError}
        </div>
        <label htmlFor="details">Delivery details</label>
        <div style={{ position: 'relative' }}>
          <input
            id="details"
            name="details"
            className="offer-input"
            type="text"
            ref={register}
            disabled={isSaving}
          ></input>
        </div>
        {amount && price && (
          <div className="offer-summary">
            <h4 className="offer-summary__header">Offer Summary</h4>
            <div className="offer-summary__item">
              For sale: <span className="strong">{USD(amount).format()}</span>
            </div>
            <div className="offer-summary__item">
              Price per 1 USD:
              <span className="strong">{cUSD(price).format()}</span>
            </div>
            <div className="offer-summary__item">
              You expect to receive:{' '}
              <span className="strong">
                {cUSD(price).multiply(amount).format()}
              </span>
            </div>
            <div className="offer-summary__item">
              Collateral needed:{' '}
              <span className="strong">
                {calculateCollateral(price, amount).format()}
              </span>
            </div>
            <div className="offer-summary__info">
              <div>
                Collateral is always <span className="strong">x2</span> you
                expect to receive.
                <br />
                You will get it back once the offer is closed.
              </div>
            </div>
          </div>
        )}
        <Buttons>
          {isSaving && <Spinner />}
          {!isSaving && (
            <React.Fragment>
              <InlineError text={errorMessage} onDismiss={onErrorDismiss} />
              <div className="block">
                <button type="submit" className="button" disabled={error}>
                  Deposit
                  {amount && price
                    ? ` ${calculateCollateral(price, amount)} cUSD`
                    : ' cUSD'}
                </button>
                <InputInfo type="bottom">And place offer</InputInfo>
              </div>

              <Link to="/" className="link">
                Cancel
              </Link>
            </React.Fragment>
          )}
        </Buttons>
      </form>
    </div>
  );
}
