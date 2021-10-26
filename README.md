# Valora + Wallet Connect v1

This is an example repo to show how to connect a React app to Valora using Wallet Connect version 1.

The relevant code is in `./src/App.js`.

The additional packages required are:

- [Wallet connect web3 provider](https://docs.walletconnect.com/1.0/quick-start/dapps/web3-provider)
- [Web3](https://www.npmjs.com/package/web3)
- [Contractkit](https://www.npmjs.com/package/@celo/contractkit)

## Run it

Install dependencies with

```shell
yarn
```

Run the demo application with

```shell
yarn start
```

The app should show a "Connect" button when there is not a wallet connected. It should show a "Send cUSD" button when there is a wallet connected. The recipient and amount of the transaction are hardcoded, but feel free to update and edit.

##

You can [read more about using Wallet Connect v1 here](https://docs.walletconnect.com/1.0/).


This example was started with [Create React App](https://reactjs.org/docs/create-a-new-react-app.html). Unnecessary files were deleted.