# TuBoleto + Valora

This website is the one running inside a TuBoleto Webview. It handles the WalletConnect connection and transaction and  triggers a callback to the TuBoleto app.



The rest of the docs are from the example:

# Valora + Wallet Connect v1

This is an example repo to show how to connect a React app to Valora using Wallet Connect version 1.

The relevant code is in `./src/App.js`.

The additional packages required are:

- [Wallet connect web3 provider](https://docs.walletconnect.com/1.0/quick-start/dapps/web3-provider)
- [Web3](https://www.npmjs.com/package/web3)
- [Contractkit](https://www.npmjs.com/package/@celo/contractkit)

[Install Valora here.](https://valoraapp.com/)

## Run it

Install dependencies with

```shell
yarn
```

Run the demo application with

```shell
yarn start
```

The app should show a "Connect" button when there is not a wallet connected. A wallet connect modal will appear that you should scan with Valora.

Once the app is connected, it should show a "Send cUSD" button. Click the button and Valora will ask you to approve the transaction. The recipient and amount of the transaction are hardcoded, but feel free to edit and test. The transaction receipt will be logged in the browser console.

## Additional Info

You can [read more about using Wallet Connect v1 here](https://docs.walletconnect.com/1.0/).

This example was started with [Create React App](https://reactjs.org/docs/create-a-new-react-app.html). Unnecessary files were deleted.


Other commands:

yarn add firebase
firebase init hosting

Deploy:

yarn build && firebase deploy --only hosting && time /t
