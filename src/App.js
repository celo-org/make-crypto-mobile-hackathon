import './App.css';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import React from 'react';
import { newKitFromWeb3 } from '@celo/contractkit';

class App extends React.Component {

  componentDidMount() {
    this.connect();
  }

  constructor(props){
    super(props)
    this.state = {
      provider: null,
      kit: null,
      someAddress: "0xc528f91cf9035878d92d7c043377eab2af9dc6a7",
      trLoading: false,
    }

    this.connect = this.connect.bind(this)
    this.sendcUSD = this.sendcUSD.bind(this)
    this.disconnect = this.disconnect.bind(this)
  }

  connect = async() => {
    const provider = new WalletConnectProvider({
      rpc: {
        // 44787: "https://alfajores-forno.celo-testnet.org",
        42220: "https://forno.celo.org", // from: https://docs.celo.org/getting-started/wallets/using-metamask-with-celo/manual-setup
      },
    });

    await provider.enable()
    const web3 = new Web3(provider);
    let kit = newKitFromWeb3(web3)

    kit.defaultAccount = provider.accounts[0]

    provider.on("accountsChanged", (accounts) => {
      console.log(accounts);
    });

    this.setState({provider, kit});

    // TODO: maybe trigger sendcUSD automatically
    this.sendcUSD();
  }

  sendcUSD = async () => {
    this.setState({
      trLoading: true,
    });

    try {
      let kit = this.state.kit;

      const amountStr = this.getAmountFromQueryParams();
  
      let amount = kit.web3.utils.toWei(amountStr, 'ether');
  
      const stabletoken = await kit.contracts.getStableToken();
  
      const tx = await stabletoken.transfer(this.state.someAddress, amount).send(
        {feeCurrency: stabletoken.address}
      );
      const receipt = await tx.waitReceipt();
  
      console.log(receipt);
      // alert(JSON.stringify(receipt));
  
      this.openTuBoleto(amountStr);
    } catch (e) {
      console.error(e);
    }

    this.setState({
      trLoading: false,
    });

  }

  openTuBoleto = (amountStr) => {
    document.location = "tuboleto://topup?amount=" + amountStr;
  }

  disconnect = async() => {
    await this.state.provider.disconnect();
    this.setState({provider: null, kit: null});
  }

  getAmountFromQueryParams = () => {
    let params = (new URL(document.location)).searchParams;
    let amount = params.get("amount") ?? "0.001";
    return amount;
  }

  render() {

    let button, account;
    
    const amountStr = this.getAmountFromQueryParams();
    const amn = parseFloat(amountStr);
    const aproxPEN = amn * 4;

    if(this.state.provider !== null){
      button = (<div>
                  <button onClick={() => this.sendcUSD()}>Enviar {amountStr} cUSD (aprox. {aproxPEN.toFixed(2)} soles)</button>
                </div>)
    } else {
      button = (<div>
                  <button onClick={() => this.connect()}>Conectar Billetera</button>
                </div>)
    }

    if(this.state.kit !== null){
      account = this.state.kit.defaultAccount
    }

    return(
      <div className="App">
        <header className="App-header">
          {/* <img src={} className="App-logo" alt="logo" /> */}
          {
            (
                this.state.trLoading ? 
                  "Transfiriendo... ✌️" : 
                  <>
                    {button}
                    <p>{account}</p>
                    <button onClick={() => this.disconnect()}>Desconectar</button>
                    <br/>
                    <button onClick={() => this.openTuBoleto(amountStr)}>Abrir TuBoleto</button>
                    <br/>
                  </>
            )
          }
          

          <p style={{
            fontSize: '8px',
          }}>TuBoleto - Celo v0.0.6</p>
        </header>
      </div>
    )
  } 

}

export default App;
