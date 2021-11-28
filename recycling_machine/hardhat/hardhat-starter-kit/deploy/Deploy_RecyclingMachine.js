let { networkConfig } = require('../helper-hardhat-config')

module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {
    
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = await getChainId()
    let nativeTokenUsdPriceFeed = networkConfig[chainId]['nativeTokenUsdPriceFeed'];
    const recyclingMachineFactory = await deploy('RecyclingMachineFactory', {
        from: deployer,
        args: [nativeTokenUsdPriceFeed],
        log: true
    })
    log("npx hardhat recycling-machine --contract " + recyclingMachineFactory.address + " --network " + networkConfig[chainId]['name'])
}

module.exports.tags = ['all', 'recyclingMachine']
