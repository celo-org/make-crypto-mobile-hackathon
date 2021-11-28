import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {isAuthenticated} from '../authBE';
import axios from 'axios';

import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';
import BigNumber from 'bignumber.js';
import saveearthAbi from '../contracts/saveearth.abi.json';
import erc20Abi from '../contracts/erc20.abi.json';
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
const ContractAddress = "0x186933a8ebc64c9827D0365AE9558589c1820BB8";



const Checkout = ({ amount, nameValue }) => {

  const [data, setData] = useState({
    success: false,
    error: '',
    comment: ''
  })


  // Celo contract start here
  const [address, setAddress] = useState('0x0')
  const [kit, setKit] = useState(null);
  const [contract, setContract] = useState(null);

  // const userId = isAuthenticated() && isAuthenticated().user._id;
  const username = isAuthenticated() && isAuthenticated().user.name;

  let deliveryComment = data.comment;


  useEffect(() => {
    loadWeb3()
  }, [address])

  useEffect(() => {
    if (!kit) return; // useeffect run first before checking dependecy, this ensure that it doesn't run before
    loadCeloContract()
  }, [kit])


  async function loadWeb3() {
    if (window.celo) {
      try {
        // enable celo interaction
        window.web3 = new Web3(window.celo);
        await window.celo.enable();
        let celoKit = newKitFromWeb3(window.web3);
        await setKit(celoKit);

      }
      catch (error) {
        console.error(error);
      }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      window.web3.eth.net.getId()
        .then(async (res) => {
          if (res == 44787) {
            window.ethereum.send('eth_requestAccounts');
            let celoKit = newKitFromWeb3(window.web3);
            await setKit(celoKit);

          } else {
            alert("You need to switch to celo network on metamask")
          }
        }).catch(error => console.error(error))
    } else {
      alert("Get the celo browser chrome extension or... \n  metamask before making donations")
    }
  }

  async function loadCeloContract() {
    let address_ = await kit.web3.eth.getAccounts();

    // get and set default address
    kit.defaultAccount = address_[0];
    await setAddress(address_[0]); // return address

    // sign and set contract
    const myContract = new kit.web3.eth.Contract(saveearthAbi, ContractAddress);
    await setContract(myContract); // return contract        


  }


  let keep;

  async function donate() {
    const amount_ = new BigNumber(amount).shiftedBy(10).toString(); // i used 10 instead of 18 since cusdContract wont approve more than 50cUSD

    const cusdContract = await new kit.web3.eth.Contract(erc20Abi, cUSDContractAddress)

    console.log('amount_, nameValue', amount_, nameValue);

    await cusdContract.methods.approve(ContractAddress, amount_)
      .send({ from: kit.defaultAccount })
      .on('transactionHash', hash => {
        contract.methods.donate(amount_, nameValue)
          .send({ from: kit.defaultAccount })
          .on('transactionHash', hash => {
            // do something
            keep = {
              username: username,
              notes: deliveryComment,
              donated: amount
            }

            axios.post('/.netlify/functions/thanks', keep)

            setData({ ...data, success: true })

          }).catch(error => setData({ ...data, error: error.message }))

      }).catch(error => setData({ ...data, error: error.message }))
  }

  // Celo contract ends here




  const showCheckout = () => {
    return isAuthenticated() ? (
      <div className="">{showDropIn()}</div>
    ) : (
      <Link to='/signin'><button className="btn btn-primary">Signin first</button></Link>
    )
  }




  const handleAddress = (event) => {
    setData({...data, comment: event.target.value})
  }

  const showDropIn = () => {
    return (
      <div onBlur = {() => setData({...data, error: ''})} >
        { kit !== null && amount > 0 ? (
          <div>
            <div className="form-group mb-3">
              <label htmlFor="" className="text-muted">Add a note!: </label>
              <textarea name="" id="" cols="30" rows="4" onChange={handleAddress} className="form-control" value={data.comment} placeholder="Thank You! You can add a note here"></textarea>
            </div>
            <button onClick={donate} className="btn btn-success btn-block">Pay!</button>
          </div>
        ): null}
      </div>
    )
  }

  const showError = (error) => (
    <div className="alert alert-danger" style={{display: error ? '' : 'none' }}>
      {error}
    </div>
  )

  const showSuccess = (success) => (
    <div className="alert alert-info" style={{display: success ? '' : 'none' }}>
      <h3>Payment successful!, Thank You!</h3>
    </div>
  )

  return (
    <div>
      <h2>Total of: ${ `${amount}` }</h2>

      { showError(data.error) }
      { showSuccess(data.success) }
      {showCheckout()}
    </div>
  )
}


export default Checkout;
