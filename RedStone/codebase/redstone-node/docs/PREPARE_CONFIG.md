# How to prepare a config file

Config file is a **private** file created by provider. It contains the following details required by the redstone-node:

| Param | Optionality | Description |
|---|:---:|---|
| arweaveKeysFile | required | path to the arweave wallet (for relative paths it assumes that you are in the project root folder) |
| minimumArBalance | required | minimum AR balance required to run the node |
| useManifestFromSmartContract | optional | if set to true , manifest will be loaded from Arweave Smart Contracts |
| manifestFile | optional | path to the manifest file |
| addEvmSignature | optional | if set to true, EVM signature will be added to each price for each asset |
| credentials | required | object with credentials for APIs and private keys |
| credentials.ethereumPrivateKey | required | Ethereum private key that will be used for price data signing |
| credentials.yahooFinanceRapidApiKey | optional | API key for the api-dojo-rapid fetcher |

Check out the [sample-config.json](../sample-config.json)

You should place your config file inside the `.secrets` folder, which is included in `.gitignore`. You should **never publish this file.**
