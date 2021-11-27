import './App.css';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import React from 'react';
import { newKitFromWeb3 } from '@celo/contractkit';


const sleep = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


let lastTrLoadingStarted = 0;
class App extends React.Component {

  componentDidMount() {

    this.connect();
  }

  constructor(props){
    super(props)
    this.state = {
      provider: null,
      kit: null,
      someAddress: "0xDDc40255d888Df0d43C2ebc7a809F9221B493339", // J desktop
      // someAddress: "0xca0bc7119a461d58fb4d498921248892677060fa", // J mobile
      // someAddress: "0xc528f91cf9035878d92d7c043377eab2af9dc6a7", // K
      trLoading: false,
      showLoadingHelper: false,
    }

    console.log("receiving: ", this.state.someAddress);

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

      // trigger sendcUSD automatically
      this.sendcUSD(amountStr);

    } catch (e) {
      console.error(e);
    }
    
  }

  sendcUSD = async (amountStr) => {
    if (this.state.trLoading && !this.state.showLoadingHelper) {
      console.log("There is already a transaction in progress");
      return;
    }

    this.setState({
      trLoading: true,
      showLoadingHelper: false,
    });

    lastTrLoadingStarted = Date.now();
    const copylastTrLoadingStarted = lastTrLoadingStarted;

    sleep(10 * 1000).then(() => {
      // if the last call to set state
      if (lastTrLoadingStarted === copylastTrLoadingStarted) {
        if (this.state.trLoading) {
          this.setState({
            showLoadingHelper: true,
          });
        }
      }
    });

    await sleep(2); // millis

    try {
      let kit = this.state.kit;
  
      let amount = kit.web3.utils.toWei(amountStr, 'ether');
  
      const stabletoken = await kit.contracts.getStableToken();

      console.log("getStableToken");

      const tx = await stabletoken.transfer(this.state.someAddress, amount).send(
        {feeCurrency: stabletoken.address}
      ); // TransactionResult type in tx-result.d.ts
      
      console.log("transfer");

      const txHash = await tx.getHash(); // in testing it never returns (although it may have been other problem)
      console.log("getHash : ", txHash);

      const receipt = await tx.waitReceipt(); // waiting for the user to complete signing and transaction to be finished
      // I think ubeswap has a callback just when signing is finished so they can request focus at that moment
      // is it getHash? Nop


      console.log("waitReceipt");
  
      console.log(receipt);
      // alert(JSON.stringify(receipt));

      const url = "https://www.google.com/";

      // doesnt request focus to the chrome browser on android:
      // const x = window.open(url, '_blank'); //?.focus();
      // x?.focus();
      // x?.close();
      // window.focus();

      // doesnt seem to work either:
      // window.location.href = url;
  
      this.openTuBoleto(amountStr); // tuboleto callback

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

    const retryButton = (
      <div>
        <button onClick={() => this.sendcUSD(amountStr)}>Reintentar el envío de {amountStr} cUSD (aprox. {aproxPEN.toFixed(2)} soles)</button>
      </div>
    );

    if(this.state.provider !== null){
      conectionDependantContent = (
        <>
          {retryButton}
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
                !this.state.trLoading ? 
                (<>
                    {conectionDependantContent}
                    <br/>
                    {/* <button onClick={() => this.openTuBoleto(amountStr)}>Abrir TuBoleto</button>
                    <br/> */}
                  </>) :  
                
                this.state.showLoadingHelper ? (
                <>
                  <p>
                    Cargando... ✌️
                    <br/>
                    <br/>
                    <span fontSize={9}>
                    Aún no se abre la billetera? Ábrela manualmente o reintenta con el siguiente botón:
                    </span>
                    </p>
                  {retryButton}
                </>) : "Cargando... ✌️" 
                  
            )
          }
          

          <p style={{
            fontSize: '8px',
          }}>TuBoleto - Celo connector v0.0.33</p>
        </header>
      </div>
    )
  }
}

export default App;
