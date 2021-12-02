package com.github.browep.hellocelo.blockchain

import com.github.browep.hellocelo.LoggerCompanion
import org.celo.contractkit.CeloContract
import org.celo.contractkit.ContractKit
import java.math.BigInteger

class TestNetBlockchainService(
    override val contractAddress: String = DEFAULT_CONTRACT_ADDRESS
) : BlockchainService() {

    override fun postInit(contractKit: ContractKit) = contractKit.let {
        it.addAccount(testNetPrivKey)
        logger.debug("default address: ${it.address}")
        logger.debug("contract address: $contractAddress")
    }

    override fun getGasPrice() = BigInteger.valueOf(21000)

    override fun getFeeCurrencyContractAddress() = CeloContract.GoldToken

    override fun getHttpEndPoint() = ContractKit.ALFAJORES_TESTNET

    companion object : LoggerCompanion(TestNetBlockchainService::class) {
        const val DEFAULT_CONTRACT_ADDRESS = "0xbbf504A64E6057282713FC19c86A07821d4Dd2c5"
        const val testNetPrivKey = "0x14f146f19601c12fcf827bdec0c1a6be3d58c250db0d62d82812dfce902a8ef1"
        const val testNetMetaPrivKey = "0x5d799d71e49eae372da12f6b1fa05f061b96e646481a2c3cd0352d7dd57b4e90"
    }

}