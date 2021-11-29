require("dotenv").config()
const naffy = require("./build/contracts/Naffy.json")
const creator = require("./build/contracts/Creator.json")
const naffyNFT = require("./build/contracts/NaffyNFT.json")

const { newKitFromWeb3, newKit } = require("@celo/contractkit")
const Web3 = require("web3")

const web3 = new Web3(process.env.NODE_URL)
const kit = newKitFromWeb3(web3)

kit.connection.addAccount(process.env.PRIVATE_KEY)

const deploy = async () => {
  const accounts = await kit.connection.getAccounts()

  const naffyDeploytx = await kit.connection.sendTransaction({
    from: accounts[0],
    data: naffy.bytecode,
  })

  const naffyDeployreciept = await naffyDeploytx.waitReceipt()
  console.log({ naffyDeployreciept })

  const naffyNFTDeploytx = await kit.connection.sendTransaction({
    from: accounts[0],
    data: naffy.bytecode,
  })

  const naffyNFTDeployreciept = await naffyNFTDeploytx.waitReceipt()
  console.log({ naffyNFTDeployreciept })
}

deploy()
