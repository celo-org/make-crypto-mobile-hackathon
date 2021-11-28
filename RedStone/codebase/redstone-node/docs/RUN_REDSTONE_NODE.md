# Run node locally

## Prerequisites
- Node.js (v14 or higher) and `yarn`
- Arweave wallet (> 0.1AR)

## Prepare
### 1. Install dependencies
```bash
yarn install
```

### 2. Prepare manifest
Manifest is a public JSON file that defines the provider's obligation regarding the data that they provide. It sets fetching interval, tokens, sources and other public technical details for the provided data.

There are 2 options for loading manifest in the redstone-node:
1. Loading from JSON file. This option is preferred for local runs and experiments
2. Loading from [SmartWeave contracts](./DEPLOY_MANIFEST_ON_ARWEAVE.md)

You can use any of our [ready-to-use manifests](../manifests).
For example:
- [main.json](../manifests/main.json) - 1000+ tokens, used by the main redstone provider
- [rapid.json](../manifests/rapid.json) - 10 most popular tokens, used by `redstone-rapid` provider
- [coinbase.json](../manifests/coinbase.json) - 20 tokens, uses only coinbase fetcher

If you want to create your own manifest [read this guide.](./PREPARE_MANIFEST.md)

### 3. Prepare config file

Config file is a **private** file created by provider. You should create your config file and place it inside the `.secrets` folder. To read more about config file creation [read this guide](./PREPARE_CONFIG.md)

## Run the node

### Local run

```bash
yarn start --config PATH_TO_YOUR_CONFIG
```

We recommend redirecting output to some log file(s), for example:
```bash
yarn start --config PATH_TO_YOUR_CONFIG > my-redstone-node.logs 2> my-redstone-node.error.logs
```

You can also enable JSON mode for logs to simplify the log analysing later.
To do this append `ENABLE_JSON_LOGS=true` to the node running command:

```bash
ENABLE_JSON_LOGS=true yarn start --config PATH_TO_YOUR_CONFIG > my-redstone-node.logs 2> my-redstone-node.error.logs
```

### Run in docker
You can run a local redstone-node in docker.

1. Prepare your Dockerfile based on [./Dockerfile](../Dockerfile).
Name it `Dockerfile.my-redstone-node` and place in the project root folder.

2. Build a docker container with redstone-node
```bash
docker build -f Dockerfile.my-redstone-node -t my-redstone-node .
```

3. Run the docker container
```bash
docker run -it my-redstone-node
```

## Verify if node is running correctly
There are 2 main things that your node need to do:
### 1. Save prices on Arweave
To verify if prices are being saved on Arweave, navigate to [https://viewblock.io/arweave/address/YOUR_ADDRESS.](https://viewblock.io/arweave/address/YOUR_ADDRESS)
You should see some transactions with tag `app` and value `Redstone` ~20 minutes after the node running.
### 2. Broadcast signed prices to the RedStone cache layer (RedStone API)
You can simply open this URL [https://api.redstone.finance/prices?provider=YOUR_ADDRESS](https://api.redstone.finance/prices?provider=YOUR_ADDRESS) in browser and see if it returns signed data. Don't forget to replace `YOUR_ADDRESS` with your Arweave wallet address 😉

<details>
  <summary>Example of correct output</summary>

```json
{
  "USDT":{
    "id":"ffdd4454-25d0-4e2a-b022-d10dba06bd66",
    "source":{
      "binanceus":0.9998,
      "bitfinex":1.0001,
      "bitfinex2":1.0001,
      "bittrex":0.99974,
      "cex":1.0031,
      "coingecko":1,
      "currencycom":0.9985,
      "ftx":1,
      "kraken":1.0001,
      "okcoin":1,
      "kyber":0.9981773824698535,
      "sushiswap":0.9999276470174321,
      "uniswap":1.000213104216893
    },
    "symbol":"USDT",
    "timestamp":1632229811658,
    "version":"0.4",
    "value":1,
    "permawebTx":"_GY215TNS24PjgIzvNVyb6uGKAj7t53Q0pEzG34yotA",
    "provider":"zYqPZuALSPa_f5Agvf8g2JHv94cqMn9aBtnH7GFHbuA",
    "signature":"LONG_STRING_VALUE_WILL_BE_HERE....",
    "minutes":10,
    "providerPublicKey":"tfkkt6lHR3lSEBNvjistpdGb8pR9UJoOVO-IuXRXD9PckAqY7TAVuDVhrcQDM56GZ_EUh6Eg_NRYd-EGW8SEQLHXtY_CM4P8563xUpw0XcZJbpOeScFcN5JdN47gq8vllOheO6-v4nRPLVabRVJqkXEqzdEwxQNYDkmPL-gxE0ziZcQRQZdJUzL5mI9DzwpPC86JBVwsBK71iuRlstABciIu8u77qyArkNu0pPig9OFQvT3Vg4OPuWXd83EhqEuN5gqVufyomkmL8X7agiEjDf-UQIfZrSYqgiJsWiVJ2aKHRhLZN17wdX51L21Cg2Sbyb3B1Roy5EgUUTdJ2MY7LnI-CTbBBJLKUHSvN67MDhj1OSBwUULc8bgVCzmfVQryIFmb4tucKvz7TRAWseXNO2MtMlggXa42Hx0sOTopbFTmT_r9glRLYw3QLzyJVH7Ltqr8QldoU-VMWtpo5cmOGh8jwVknSHqWNURbRCoDfAuwh8lpWXBjL_V8haaY0OKFT9Lpi1VW8o4Kfx7ED1VAnLcpVIoV5CkPs_L0Qy_G7XpgA02OAbJH2KvwxZPeSSymdupmr1KMc8iGz5B4a1HEcKggk5ETFfeGz5r0hDha3dwDj-dOv1jbADcdgk7e2xaLgw1CpS1XEHhAnhBJgAzJDJpcHKrxPkD6cUc7FbnsBCE"
  },
  "AR":{
    "id":"9beef2ce-278e-4edd-bde0-f06741840c91",
    "source":{
      "binance":40.90852001974157,
      "coinex":40.93901891635859,
      "coingecko":41.41,
      "hitbtc":41.83028667225191,
      "huobipro":40.85182207094863,
      "aofex":40.85542194071326
    },
    "symbol":"AR",
    "timestamp":1632229811658,
    "version":"0.4",
    "value":40.92376946805008,
    "permawebTx":"_GY215TNS24PjgIzvNVyb6uGKAj7t53Q0pEzG34yotA",
    "provider":"zYqPZuALSPa_f5Agvf8g2JHv94cqMn9aBtnH7GFHbuA",
    "signature":"LONG_STRING_VALUE_WILL_BE_HERE....",
    "minutes":10,
    "providerPublicKey":"tfkkt6lHR3lSEBNvjistpdGb8pR9UJoOVO-IuXRXD9PckAqY7TAVuDVhrcQDM56GZ_EUh6Eg_NRYd-EGW8SEQLHXtY_CM4P8563xUpw0XcZJbpOeScFcN5JdN47gq8vllOheO6-v4nRPLVabRVJqkXEqzdEwxQNYDkmPL-gxE0ziZcQRQZdJUzL5mI9DzwpPC86JBVwsBK71iuRlstABciIu8u77qyArkNu0pPig9OFQvT3Vg4OPuWXd83EhqEuN5gqVufyomkmL8X7agiEjDf-UQIfZrSYqgiJsWiVJ2aKHRhLZN17wdX51L21Cg2Sbyb3B1Roy5EgUUTdJ2MY7LnI-CTbBBJLKUHSvN67MDhj1OSBwUULc8bgVCzmfVQryIFmb4tucKvz7TRAWseXNO2MtMlggXa42Hx0sOTopbFTmT_r9glRLYw3QLzyJVH7Ltqr8QldoU-VMWtpo5cmOGh8jwVknSHqWNURbRCoDfAuwh8lpWXBjL_V8haaY0OKFT9Lpi1VW8o4Kfx7ED1VAnLcpVIoV5CkPs_L0Qy_G7XpgA02OAbJH2KvwxZPeSSymdupmr1KMc8iGz5B4a1HEcKggk5ETFfeGz5r0hDha3dwDj-dOv1jbADcdgk7e2xaLgw1CpS1XEHhAnhBJgAzJDJpcHKrxPkD6cUc7FbnsBCE"
  }
}
```
</details>
