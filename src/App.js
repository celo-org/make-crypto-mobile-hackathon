import './App.css';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import React from 'react';
import { newKitFromWeb3 } from '@celo/contractkit';


const sleep = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class App extends React.Component {

  componentDidMount() {
    this.connect();
  }

  constructor(props){
    super(props)
    this.state = {
      provider: null,
      kit: null,
      someAddress: "0xca0bc7119a461d58fb4d498921248892677060fa", // J
      // someAddress: "0xc528f91cf9035878d92d7c043377eab2af9dc6a7", // K
      trLoading: false,
    }

    this.connect = this.connect.bind(this)
    this.sendcUSD = this.sendcUSD.bind(this)
    this.disconnect = this.disconnect.bind(this)
  }

  connect = async() => {
    try {
      if (this.state.provider == null) {
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
      }

      const amountStr = this.getAmountFromQueryParams();

      // TODO: maybe trigger sendcUSD automatically
      this.sendcUSD(amountStr);

    } catch (e) {
      console.error(e);
    }
    
  }

  sendcUSD = async (amountStr) => {
    if (this.state.trLoading) {
      console.log("There is already a transaction in progress");
      return;
    }

    this.setState({
      trLoading: true,
    });

    await sleep(2); // millis

    try {
      let kit = this.state.kit;
  
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
      if (e.message.indexOf("execution reverted: transfer value exceeded balance of sender") !== -1) {
        // not enough balance
        alert("Lo siento, no tienes suficientes Celo Dólares 😢");
      } else {
        console.log(e);
        console.error(e);
      }
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
    // let ts = params.get("ts") ?? "0.001";
    return amount;
  }

  render() {

    let conectionDependantContent, account;
    
    const amountStr = this.getAmountFromQueryParams();
    const amn = parseFloat(amountStr);
    const aproxPEN = amn * 4;

    if(this.state.kit !== null){
      account = this.state.kit.defaultAccount
    }


    if(this.state.provider !== null){
      conectionDependantContent = (
        <>
          <div>
            <button onClick={() => this.sendcUSD(amountStr)}>Reintentar el envío de {amountStr} cUSD (aprox. {aproxPEN.toFixed(2)} soles)</button>
          </div>
          <p>
          <span style={{
            fontSize: '14px',
          }}>🟢 Billetera conectada</span>
          <br/>
          <span style={{
            fontSize: '12px',
          }}>{account}</span>
          </p>
          

          <button onClick={() => this.disconnect()}>Desconectar</button>
        </>
      )
    } else {
      conectionDependantContent = (<div>
                  <button onClick={() => this.connect()}>Conectar Billetera</button>
                </div>)
    }


    return(
      <div className="App">
        <header className="App-header">
          <img src={"https://static.wixstatic.com/media/b75418_3675dc741fce4c85a6264579958ee039~mv2.png/v1/fill/w_298,h_108,al_c,q_85,usm_0.66_1.00_0.01/logo-tu-boleto-pago-sin-contacto-peru_pn.webp"} 
          style={{
            width: 149,
            height: 54,
          }}
          className="App-logo" alt="logo" />
          <br/>
          <br/>
          {
            (
                this.state.trLoading ? 
                  "Cargando... ✌️" : 
                  <>
                    {conectionDependantContent}
                    <br/>
                    {/* <button onClick={() => this.openTuBoleto(amountStr)}>Abrir TuBoleto</button>
                    <br/> */}
                  </>
            )
          }
          

          <p style={{
            fontSize: '8px',
          }}>TuBoleto - Celo connector v0.0.17</p>
        </header>
      </div>
    )
  }
}

export default App;
