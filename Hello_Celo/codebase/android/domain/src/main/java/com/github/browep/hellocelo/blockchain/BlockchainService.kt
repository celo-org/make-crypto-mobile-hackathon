package com.github.browep.hellocelo.blockchain

import com.github.browep.hellocelo.HelloCelo
import com.github.browep.hellocelo.LoggerCompanion
import com.github.browep.hellocelo.safeLet
import com.github.browep.hellocelo.safeLetSuspend
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.async
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.supervisorScope
import kotlinx.coroutines.withContext
import org.celo.contractkit.CeloContract
import org.celo.contractkit.ContractKit
import org.celo.contractkit.ContractKitOptions
import org.celo.contractkit.protocol.CeloGasProvider
import org.ethereum.crypto.ECKey
import org.ethereum.solidity.Abi
import org.ethereum.util.ByteUtil
import org.ethereum.util.ByteUtil.bigIntegerToBytes
import org.web3j.abi.TypeEncoder
import org.web3j.abi.datatypes.Utf8String
import org.web3j.crypto.Credentials
import org.web3j.crypto.Hash
import org.web3j.protocol.Web3j
import org.web3j.protocol.http.HttpService
import org.web3j.utils.Numeric
import java.math.BigInteger
import java.nio.charset.StandardCharsets

abstract class BlockchainService() {

    val supervisorJob = SupervisorJob()
    val coroutineScope = CoroutineScope(Dispatchers.Main + supervisorJob)

    private var contractKit: ContractKit? = null
    private var web3j: Web3j? = null

    private val setupJob: Job

    init {

        web3j = Web3j.build(HttpService(getHttpEndPoint()))

        val config: ContractKitOptions = ContractKitOptions.Builder()
            .setFeeCurrency(getFeeCurrencyContractAddress())
            .setGasPrice(getGasPrice())
            .build()

        setupJob = coroutineScope.launch(Dispatchers.IO) {
            contractKit = ContractKit(web3j, config)
            postInit(contractKit!!)
        }
    }

    abstract fun postInit(contractKit: ContractKit): Unit

    abstract fun getGasPrice(): BigInteger

    abstract fun getFeeCurrencyContractAddress(): CeloContract

    abstract fun getHttpEndPoint(): String

    abstract val contractAddress: String

    suspend fun deployContract() = withAuthedAccount { web3j, contractKit, credentials ->
        logger.debug("deploying contract")
        val celoGasProvider = celoGasProvider(contractKit)
        val helloCelloContract = HelloCelo.deploy(web3j, contractKit.transactionManager, celoGasProvider).send()
        logger.debug("deployed contract, address: ${helloCelloContract.contractAddress}")
        val hash = helloCelloContract.transactionReceipt?.get()?.transactionHash
        logger.debug("transaction hash: $hash")
        helloCelloContract.contractAddress!!
    }


    suspend fun claimUserName(userName: String) = withAuthedAccount { web3j, contractKit, credentials ->
        logger.debug("claiming username: $userName, from ${contractAddress}")
        val helloCeloContract = HelloCelo.load(contractAddress, web3j, contractKit.transactionManager, celoGasProvider(contractKit))
        val txReceipt = helloCeloContract.claimUserName(userName).send()
        logger.debug("txHash: ${txReceipt.transactionHash}")
    }

    suspend fun claimUserNameMeta(userName: String, userCreds: Credentials) = withAuthedAccount { web3j, contractKit, credentials ->
        logger.debug("claiming username: $userName, from ${contractAddress}, meta tx, via ${userCreds.address}")
        val helloCeloContract = HelloCelo.load(contractAddress, web3j, contractKit.transactionManager, celoGasProvider(contractKit))
        val ecKey: ECKey = ECKey.fromPrivate(userCreds.ecKeyPair.privateKey.toByteArray())
        val (sig, hashByteArray) = sign(userName, ecKey)
        val txReceipt = helloCeloContract.claimUsernameMeta(hashByteArray, sig.v.toInt().toBigInteger(), bigIntegerToBytes(sig.r), bigIntegerToBytes(sig.s), userName).send()
        logger.debug("txHash: ${txReceipt.transactionHash}")
    }

    suspend fun postLocationMeta(userName: String, location: String, userCreds: Credentials) = withAuthedAccount { web3j, contractKit, credentials ->
        logger.debug("user: $userName, from ${contractAddress}, posting location: ${location}, meta tx, via ${userCreds.address}")
        val helloCeloContract = HelloCelo.load(contractAddress, web3j, contractKit.transactionManager, celoGasProvider(contractKit))
        val ecKey: ECKey = ECKey.fromPrivate(userCreds.ecKeyPair.privateKey.toByteArray())
        val (sig, hashByteArray) = sign(location, ecKey)
        val txReceipt = helloCeloContract.postLocationMeta(hashByteArray, sig.v.toInt().toBigInteger(), bigIntegerToBytes(sig.r), bigIntegerToBytes(sig.s), userName, location).send()
        logger.debug("txHash: ${txReceipt.transactionHash}")
    }

    /**
     *
     */
    @Deprecated("was just for verifying hash")
    suspend fun proof(userName: String, userCreds: Credentials) = withAuthedAccount { web3j, contractKit, credentials ->
        logger.debug("proof: $userName")
        val helloCeloContract = HelloCelo.load(contractAddress, web3j, contractKit.transactionManager, celoGasProvider(contractKit))
        val ecKey: ECKey = ECKey.fromPrivate(userCreds.ecKeyPair.privateKey.toByteArray())
        val (sig, hashByteArray) = sign(userName, ecKey)

//        val txReceipt = helloCeloContract.proof(hashByteArray, userName).send()
//        logger.debug("proof ret: ${txReceipt}")
    }

    fun sign(userName: String, ecKey: ECKey): Pair<ECKey.ECDSASignature, ByteArray> {
        val hash = Hash.sha3(userName.toByteArray(StandardCharsets.UTF_8))
        val ecdsaSignature = ecKey.sign(hash)
        return ecdsaSignature to hash
    }

    suspend fun createHelloPost(userName: String, location: String) = withAuthedAccount { web3j, contractKit, credentials ->
        logger.debug("creating post for $userName->$location")
        val helloCeloContract = HelloCelo.load(contractAddress, web3j, contractKit.transactionManager, celoGasProvider(contractKit))
        val txReceipt = helloCeloContract.postLocation(userName, location).send()
        logger.debug("txHash: ${txReceipt.transactionHash}")
    }

    suspend fun getPostForUser(userName: String): String? = withAuthedAccount { web3j, contractKit, credentials ->
        val helloCeloContract = HelloCelo.load(contractAddress, web3j, contractKit.transactionManager, celoGasProvider(contractKit))
        val postForUser = helloCeloContract.postForUser(userName).send()
        logger.debug("postForUser: $postForUser")
        return@withAuthedAccount postForUser
    }

    private fun celoGasProvider(contractKit: ContractKit): CeloGasProvider {
        val gasPriceMinimum = contractKit.contracts.gasPriceMinimum.contract
        val goldTokenContractAddress = contractKit.contracts.goldToken.contract.contractAddress
        val celoGasProvider = CeloGasProvider(gasPriceMinimum, goldTokenContractAddress)
        return celoGasProvider
    }

    private suspend inline fun <reified T> withAuthedAccount(crossinline block: ((web3j: Web3j, contractKit: ContractKit, credentials: Credentials) -> T)): T = supervisorScope {
        setupJob.join()
        safeLetSuspend(web3j, contractKit, contractKit?.transactionManager?.credentials) { web3j, contractKit, credentials ->
            // wait to make sure the contractKit is setup
            block(web3j, contractKit, credentials)
        } ?: throw IllegalStateException("contract kit did not have a private key")
    }

    companion object : LoggerCompanion(BlockchainService::class)
}