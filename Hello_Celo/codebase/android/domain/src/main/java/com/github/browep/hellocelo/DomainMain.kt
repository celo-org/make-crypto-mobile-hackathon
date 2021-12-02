package com.github.browep.hellocelo

import com.github.browep.hellocelo.blockchain.TestNetBlockchainService
import com.github.browep.hellocelo.dao.Database
import com.github.browep.hellocelo.dao.JdbcDbConnManager
import com.github.browep.hellocelo.model.Post
import com.github.browep.hellocelo.work.PostUserUpdateWork
import io.ktor.client.*
import io.ktor.client.engine.java.*
import kotlinx.coroutines.runBlocking
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.web3j.crypto.Credentials
import java.io.File
import java.util.*

/**
 * some local debugging
 */
fun main(args: Array<String>) {
    logger.info("main: ${args.joinToString(",")}")
//    testBlockChainInteract()

    runBlocking {
        val contractAddress = deployContractToTestnet()
//        verifyMeta(contractAddress)
        claimUserNameMeta(contractAddress, ALICE)
        postUpdateToBlockchainMeta(contractAddress, ALICE, "d3b07384d113edec49eaa6238ad5ff00")
        getPostForUser(contractAddress, ALICE)
//        claimUserName()
//        postUpdateToBlockchain(Database(JdbcDbConnManager()))
    }
    logger.info("end")
}

private suspend fun verifyMeta(contractAddress: String) {
    val userCreds = Credentials.create(TestNetBlockchainService.testNetMetaPrivKey.lowercase(Locale.getDefault()))
    TestNetBlockchainService(contractAddress).proof(ALICE, userCreds)
}

private suspend fun getPostForUser(contractAddress: String, username: String) {
    val postForUser = TestNetBlockchainService(contractAddress).getPostForUser(username)
    logger.debug("last post for user: $username->$postForUser")
}

private suspend fun claimUserNameMeta(contractAddress: String, userName: String) {
    val userCreds = Credentials.create(TestNetBlockchainService.testNetMetaPrivKey.lowercase(Locale.getDefault()))
    TestNetBlockchainService(contractAddress).claimUserNameMeta(userName, userCreds)
}

private suspend fun postUpdateToBlockchainMeta(contractAddress: String, username: String, location: String) {
    val userCreds = Credentials.create(TestNetBlockchainService.testNetMetaPrivKey.lowercase(Locale.getDefault()))
    TestNetBlockchainService(contractAddress).postLocationMeta(username, location, userCreds)
}

private suspend fun claimUserName(): Boolean {
    TestNetBlockchainService().claimUserName(JACK)
    return true
}

private suspend fun postUpdateToBlockchain(database: Database): Boolean {

    database.insertUser(JACK)

    val cloudService = CloudService(database, httpClient, System.getenv("PINATA_JWT"))
//    return PostUserUpdateWork(
//        blockchainService = TestNetBlockchainService(),
//        database = database,
//        cloudService = cloudService,
//        Post(JACK, "here is my cool message", System.currentTimeMillis(), uuid())
//    ).exec()
    return true
}

private val httpClient: HttpClient = HttpClient(Java)
val sqlSourceFolder = File("domain/src/main/resources/sql")

private fun testDbInteract() {
    val database = Database(JdbcDbConnManager())
    val userPosts = mutableListOf<Post>()
    userPosts += Post("jack", "hey its jack", System.currentTimeMillis(), uuid(), """{"pic":"http://example.com/img.jpg"}""")
    userPosts += Post("jill", "hey its jill", System.currentTimeMillis(), uuid(), """{"pic":"http://example.com/img.jpg"}""")
    userPosts += Post("jill", "hey its jill again", System.currentTimeMillis(), uuid(), """{"pic":"http://example.com/img.jpg"}""")
    database.insertUserPosts(userPosts)

    // query for jill
    val jillPosts = database.getPosts("jill")
    logger.debug("jillPosts: ${jillPosts.joinToString("\n")}")

}

private suspend fun deployContractToTestnet() : String {
    val blockchainService = TestNetBlockchainService()
    val helloCeloContractAddress = blockchainService.deployContract()
    logger.info("deployed contract to: ${helloCeloContractAddress}")
    return helloCeloContractAddress
}

private suspend fun testBlockChainInteract() {
    val blockchainService = TestNetBlockchainService()
    val helloCeloContractAddress = blockchainService.deployContract()
    val userName = "foo"
    val postLocation = "d3b07384d113edec49eaa6238ad5ff00"
    blockchainService.claimUserName(userName)
    blockchainService.createHelloPost(userName, postLocation)
    blockchainService.getPostForUser(userName)
}

val logger: Logger by lazy { LoggerFactory.getLogger("DomainMain") }
const val JACK = "jack"
const val ALICE = "Alice"
