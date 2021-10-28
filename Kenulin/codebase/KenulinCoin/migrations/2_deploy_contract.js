var KenulinCoin = artifacts.require('KenulinCoin')
var MiniKen = artifacts.require('MiniKen')
module.exports = function (deployer) {
    deployer.deploy(KenulinCoin)
    deployer.deploy(MiniKen)
}