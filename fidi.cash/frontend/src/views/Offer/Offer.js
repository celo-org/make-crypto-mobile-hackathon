import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useContractKit } from '@celo-tools/use-contractkit';
import currency from 'currency.js';
import AppContext from '../../AppContext';
import FidiCore from '../../abi/FidiCore.json';
import OfferContract from '../../abi/Offer.json';
import DealContract from '../../abi/Deal.json';
import { buy, cancelOffer, getOffer } from '../../api';
import ConnectWallet from '../../components/ConnectWallet/ConnectWallet';
import Spinner from '../../components/Spinner/Spinner';
import InputInfo from '../../components/InputInfo/InputInfo';
import InlineError from '../../components/InlineError/InlineError';
import Buttons from '../../components/Buttons/Buttons';
import './Offer.css';

const USD = (value) => currency(value, { symbol: 'USD', pattern: '# !' });
const cUSD = (value) => currency(value, { symbol: 'cUSD', pattern: '# !' });

export default function Offer() {
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);
  const [isSaving, setIsSaving] = useState(false);
  const { register, watch, handleSubmit } = useForm();
  const { offerAddress: offerAddr } = useParams();
  const offerAddress =
    typeof offerAddr === 'string' ? offerAddr.toLowerCase() : offerAddr;
  const { address: addr, performActions, kit } = useContractKit();
  const address = typeof addr === 'string' ? addr.toLowerCase() : addr;

  const [offer, setOffer] = useState(null);

  useEffect(() => getOffer(offerAddress).then(setOffer), [offerAddress]);

  const onSubmit = async (data) => {
    const { amount } = data;

    const collateralAmount = cUSD(amount)
      .multiply(offer.price)
      .multiply(2).value;
    const depositAmount = cUSD(amount).multiply(offer.price).multiply(3).value;

    setIsSaving(true);
    try {
      const [dealAddr] = await performActions(async (kit) => {
        const networkId = await kit.web3.eth.net.getId();
        const cUSD = await kit.contracts.getStableToken();
        const fidiCore = new kit.web3.eth.Contract(
          FidiCore.abi,
          FidiCore.networks[networkId].address
        );

        const gasPrice = kit.web3.utils.toWei('0.5', 'Gwei');

        // Create offer
        const txObjectCreateDeal = await fidiCore.methods.createDeal(
          cUSD.address,
          offerAddress
        );
        const txCreateDeal = await kit.sendTransactionObject(
          txObjectCreateDeal,
          {
            // feeCurrency: cUSD.address,
            gasPrice,
            from: address
          }
        );
        const receipt = await txCreateDeal.waitReceipt();

        const dealAddress = receipt.events.DealCreated.returnValues.deal;

        // Increase allowance
        const approveTx = await cUSD
          .approve(dealAddress, kit.web3.utils.toWei(String(depositAmount)))
          .send({ gasPrice });
        await approveTx.waitReceipt();

        // Deposit collateral
        const dealContract = new kit.web3.eth.Contract(
          DealContract.abi,
          dealAddress
        );

        const txObjectDeposit = await dealContract.methods.deposit(
          kit.web3.utils.toWei(String(depositAmount)),
          kit.web3.utils.toWei(String(collateralAmount))
        );
        const txDeposit = await kit.sendTransactionObject(txObjectDeposit, {
          // feeCurrency: cUSD.address,
          gasPrice,
          from: address
        });
        await txDeposit.waitReceipt();

        return dealAddress;
      });
      const dealAddress =
        typeof dealAddr === 'string' ? dealAddr.toLowerCase() : dealAddr;

      await buy({
        dealAddress,
        offerAddress,
        buyerAddress: address,
        value: USD(amount).value,
        amount: cUSD(amount).multiply(offer.price).value,
        collateral: cUSD(amount).multiply(offer.price).multiply(2).value,
        details: comment
      });

      history.push(`/deals/${dealAddress}`);
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

  const handleCancelOffer = async () => {
    setIsSaving(true);
    try {
      await performActions(async (kit) => {
        const gasPrice = kit.web3.utils.toWei('0.5', 'Gwei');

        // Redeem collateral
        const offerContract = new kit.web3.eth.Contract(
          OfferContract.abi,
          offerAddress
        );

        const txObjectRedeemCollateral =
          await offerContract.methods.redeemCollateral();
        const txRedeemCollateral = await kit.sendTransactionObject(
          txObjectRedeemCollateral,
          {
            // feeCurrency: cUSD.address,
            gasPrice,
            from: address
          }
        );
        await txRedeemCollateral.waitReceipt();
      });

      await cancelOffer(offerAddress);

      history.push('/profile');
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

  if (!address) {
    return (
      <div>
        <ConnectWallet />
        <InputInfo type="bottom">
          Connect your wallet to make purchases
        </InputInfo>
      </div>
    );
  }

  if (!offer) {
    return null;
  }

  let error = false;

  const defaultAmount = String(offer.amount);
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
    } else if (numericValue > offer.amount) {
      amountError = <InputInfo error={true}>Too much</InputInfo>;
      error = true;
    }
  }

  const comment = watch('comment', '');

  let commentError = null;

  if (!comment) {
    commentError = <InputInfo error={true}>Please specify</InputInfo>;
    error = true;
  }

  return (
    <div>
      <h2>Offer</h2>
      <div className="offer-details">
        <div className="user">
          <div>Seller:</div>
          <div>{offer.user.address}</div>
        </div>
        <div className="avalable-amount">
          <span className="strong">{offer.amount}</span> USD available
        </div>
        <div className="label">Exchange rate</div>
        <div>
          <span className="strong">{offer.price}</span> cUSD for
          <span className="strong"> 1</span> USD
        </div>
        <div className="label">Delivery details</div>
        <div>{offer.details}</div>
      </div>
      {offer.user.address === address && offer.amount > 0 && (
        <div className="block">
          <button type="button" className="button" onClick={handleCancelOffer}>
            Cancel offer
          </button>
          <InputInfo type="bottom">
            Redeem {Number((2 * offer.amount * offer.price).toFixed(2))} cUSD
            collateral
          </InputInfo>
        </div>
      )}
      {offer.user.address !== address && offer.amount > 0 && (
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="amount">Purchase amount in USD</label>
          <div style={{ position: 'relative' }}>
            <input
              id="amount"
              name="amount"
              className="offer-input"
              type="number"
              step="any"
              defaultValue={defaultAmount}
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
          <label htmlFor="comment">How to deliver your purchase</label>
          <div style={{ position: 'relative' }}>
            <input
              id="comment"
              name="comment"
              className="offer-input"
              type="text"
              rules={{
                required: true
              }}
              ref={register}
              disabled={isSaving}
            ></input>
            {commentError}
          </div>
          {amount && (
            <div className="offer-summary">
              <h4 className="offer-summary__header">Offer Summary</h4>
              <div className="offer-summary__item">
                You will receive:{' '}
                <span className="strong">{USD(amount).format()}</span>
              </div>
              <div className="offer-summary__item">
                Price per 1 USD:
                <span className="strong">{cUSD(offer.price).format()}</span>
              </div>
              <div className="offer-summary__item">
                You expect to spend:{' '}
                <span className="strong">
                  {cUSD(offer.price).multiply(amount).format()}
                </span>
              </div>
              <div className="offer-summary__item">
                Collateral needed:{' '}
                <span className="strong">
                  {cUSD(amount).multiply(offer.price).multiply(2).format()}
                </span>
              </div>
              <div className="offer-summary__info">
                <div>
                  Collateral is always <span className="strong">x2</span> you
                  expect to spend.
                  <br />
                  You will get it back once the deal is closed.
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
                    Deposit{' '}
                    {amount &&
                      cUSD(amount).multiply(offer.price).multiply(3).toString()}
                    {' cUSD'}
                  </button>
                  <InputInfo type="bottom">And make the purchase</InputInfo>
                </div>

                <Link to="/" className="link">
                  Cancel
                </Link>
              </React.Fragment>
            )}
          </Buttons>
        </form>
      )}
    </div>
  );
}
