import logo from './logo.svg';
import './App.css';
import './components/assets/style.css';
import { useContractKit } from '@celo-tools/use-contractkit';
import { ContractKitProvider } from '@celo-tools/use-contractkit';
import '@celo-tools/use-contractkit/lib/styles.css';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import SignIn from './components/SignIn';
import Inputs from './components/Inputs';
import Convo from './components/Convo';
import Transactions from './components/Transactions';
import CreateProposal from './components/CreateProposal'
import Header from './components/Header';
import Output from './components/Output';
import Calculate from './components/Calculate';
import {
  BrowserRouter as Router,
  Switch,
  Route,Redirect,
  Link
} from "react-router-dom";
import ProjectKelvin from './abis/ProjectKelvin.json'
const Web3 = require('web3')
const ContractKit = require('@celo/contractkit')
const web3 = new Web3('https://alfajores-forno.celo-testnet.org')
const kit = ContractKit.newKitFromWeb3(web3)
function App() {


  const [title, setTitle] = useState("Project Kelvin : A Currency That Measures Impact");


   useEffect(() => {
    // This will run when the page first loads and whenever the title changes
    document.title = title;
  }, [title]);

   
  const { address, connect, kit, getConnectedKit} = useContractKit()
  async function initContract(){
    // Create a new contract instance with the HelloWorld contract info
    let instance = new kit.web3.eth.Contract( ProjectKelvin.abi, '0x4F9f9c56C4Ba59545c5e8Ced29AA6e8E588A0dB8')
   // let name = await instance.methods.name().call()
    //console.log(`Current Contract Name: "${name}"`);
   //let address = await instance.methods.createProposal(50,"Kelvin","K").call();
    //console.log(`Address of minted token: ${address}`);
  }
  initContract();
  return (
    <div className="App">
  <Router>
    <main>
    <Switch>
 
       <Route path="/signin">
            <SignIn  address={address} connect={connect}/>
        </Route>
        <Route path="/transactions">
            <Transactions />
        </Route>   
        <Route path="/create" >
            <CreateProposal address={address}   />
        </Route>    
        <Route path="/inputs" >
            <Inputs address={address}   />
        </Route>  

         <Route path="/convo" >
            <Convo address={address}  kit={kit}  />
        </Route> 

        <Route path="/calculate" >
            <Calculate address={address}  kit={kit}  />
        </Route> 
         <Route path="/output" >
            <Output address={address}  kit={kit}  />
        </Route> 

        
    </Switch>
      
<Route exact path="/">
  {address ? <Redirect to="/transactions" /> : <Redirect to="/signin" />}
</Route>
<Route exact path="/signin">
  {address ? <Redirect to="/transactions" /> : <Redirect to="/signin" />}
</Route>
  
   
    </main>
    </Router>
      {
                    address ? (
                        <label>Welcome {address}</label>
                    ) : (
                        <>
                            
                        </>
                    )
                }
    </div>
  );
}
function WrappedApp() {
  return (
    <ContractKitProvider
      dapp={{
          name: "Project Kelvin",
          description: "A Currency That Measures Impact",
          url: "https://projectkelvin.io/",
        }}
    >
      <App />
    </ContractKitProvider>
  );
}
export default WrappedApp;