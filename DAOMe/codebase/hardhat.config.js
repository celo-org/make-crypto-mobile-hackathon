require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
	solidity: "0.8.4",
	defaultNetwork: "hardhat",
	networks: {
		hardhat: {
			chainId: 1337,
			gas: 12000000,
			blockGasLimit: 0x1fffffffffffff,
			allowUnlimitedContractSize: true,
		},
		alfajores: {
			url: "https://alfajores-forno.celo-testnet.org",
			chainId: 44787,
			accounts: [process.env.WALLET_PRIVATE_KEY],
		},
	},
};
