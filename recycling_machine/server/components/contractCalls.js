const web3 = require('../contract/web3');
const axios = require('axios');
const recyclingMachineContract = require('../contract/recyclingMachineContract');
const {getCurrentBalance, restartSession} = require('./bottlesReceiver');
const CELO_ALFAJORES = '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9';
const CUSD_ALFAJORES = '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1';

getWeb3AndContractInstance = () => {
  return [web3.web3Alfajores, recyclingMachineContract.recyclingMachineAlfajores]
}

getCELOUSDPrice = async () => {
  console.log("Getting CELOUSD price...");
  try {
    response = await axios.get('https://api.binance.com/api/v3/ticker/price\?symbol\=CELOUSDT');
    console.log(response.data.price);
    return(response.data.price);
  } catch (error) {
    console.error(error);
  }
  return 0;
}

module.exports = function (app) {

  app.post('/addFunds', async (req, res) => {
    const [web3, contractInstance] = getWeb3AndContractInstance();
    if (!web3 || !contractInstance) {
      res.send("Network error");
      return;
    }
    const accounts = await web3.eth.getAccounts();
    const amount = req.query.amount;
    console.log("Attempting to send", amount, "[wei] from account", accounts[0]);
    try {
      await contractInstance.methods.addFunds().send({
        from: accounts[0],
        value: amount,
        gas: '1000000'
      });
      res.send("Success!");
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.get('/checkBalance', async (req, res) => {
    const contractInstance = getWeb3AndContractInstance()[1];
    if (!contractInstance) {
      res.send("Network error");
      return;
    }
    console.log("Checking balance!");
    const balance = await contractInstance.methods.checkBalance().call();
    console.log("Balance:", balance);
    res.send(balance);
  });

  app.post('/withdraw', async (req, res) => {
    const [web3, contractInstance] = getWeb3AndContractInstance();
    if (!web3 || !contractInstance) {
      res.send("Network error");
      return;
    }
    const accounts = await web3.eth.getAccounts();
    try {
      await contractInstance.methods.withdraw().send({
        from: accounts[0],
        gas: '1000000',
      });
      res.send("Success!");
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.get('/getNativeTokenUsdPrice', async (req, res) => {
    tokenPrice = await getCELOUSDPrice();
    res.send(tokenPrice);
  });

  app.post('/payOut', async (req, res) => {
    if (getCurrentBalance() == 0) {
      res.send("Zero balance");
      return;
    }
    console.log("Payout...", getCurrentBalance());
    const [web3, contractInstance] = getWeb3AndContractInstance();
    if (!web3 || !contractInstance) {
      res.send("Network error");
      return;
    }
    const accounts = await web3.eth.getAccounts();
    try {
      // Use CELO token as default.
      let tokenAddress = CELO_ALFAJORES;
      let amount = 0;
      if (req.body.token == "cusd") {
        tokenAddress = CUSD_ALFAJORES;
        amount = getCurrentBalance() / 100;
      } else {
        tokenPrice = await getCELOUSDPrice();
        amount = getCurrentBalance() / tokenPrice / 100;
      }
      console.log("AMOUNT: ", amount);
      let ret = await contractInstance.methods
        .payOut(req.body.receiver,
          web3.utils.toWei(String(amount), 'ether'),
          tokenAddress).send({
        from: accounts[0],
        gas: '1000000',
      });
      console.log(ret);
      console.log("Payment completed successfully");
      res.send("Payment completed successfully!");
      restartSession();
    } catch (err) {
      console.log(err.message);
      res.send("Payment failed, try again!");
    }
  });

  app.post('/addDonation', async (req, res) => {
    const [web3, contractInstance] = getWeb3AndContractInstance();
    if (!web3 || !contractInstance) {
      res.send("Network error");
      return;
    }
    const accounts = await web3.eth.getAccounts();
    console.log("Adding donation:", getCurrentBalance(), "[cents]");
    try {
      await contractInstance.methods.addDonation(getCurrentBalance()).send({
        from: accounts[0],
        gas: '1000000'
      });
      console.log("Donation completed successfully");
      res.send("Thank you for your donation!");
      restartSession();
    } catch (err) {
      console.log(err.message);
      res.send("Donation failed, try again!");
    }
  });
}
