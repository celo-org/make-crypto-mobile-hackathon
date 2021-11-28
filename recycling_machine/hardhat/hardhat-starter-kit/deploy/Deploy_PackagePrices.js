let { networkConfig } = require('../helper-hardhat-config')

module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {
    
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = await getChainId()
    const packagePrices = await deploy('PackagePrices', {
        from: deployer,
        log: true
    })
    log("npx hardhat packagePrices --contract " + packagePrices.address + " --network " + networkConfig[chainId]['name'])
}

module.exports.tags = ['all', 'packagePrices']
