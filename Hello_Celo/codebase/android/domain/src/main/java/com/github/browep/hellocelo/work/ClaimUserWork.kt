package com.github.browep.hellocelo.work

import com.github.browep.hellocelo.CloudService
import com.github.browep.hellocelo.LoggerCompanion
import com.github.browep.hellocelo.USERNAME
import com.github.browep.hellocelo.blockchain.BlockchainService
import com.github.browep.hellocelo.dao.CredProvider
import com.github.browep.hellocelo.dao.Database
import com.github.browep.hellocelo.dao.Datastore
import com.github.browep.hellocelo.model.Transformer
import com.github.browep.hellocelo.model.User
import java.io.File

/**
 * claim a users username and setup profile
 */
class ClaimUserWork(
    val blockchainService: BlockchainService,
    val datastore: Datastore,
    val database: Database,
    val cloudService: CloudService,
    val credProvider: CredProvider,
    val userName: String,
    val photoFilePath: String? = null
) : AppWork {

    override suspend fun exec(): Boolean = try {

        blockchainService.claimUserNameMeta(userName, credProvider.getCreds())

        datastore.save(USERNAME, userName)

        val userMetaData = photoFilePath?.let {
            val imageIpfsHash = cloudService.persistMediaToCloud(File(it))
            Transformer.serializeUserMetadata(
                User(
                    userName,
                    profilePicUrl = "https://gateway.pinata.cloud/ipfs/${imageIpfsHash}"
                )
            )
        }

        database.insertUser(userName, userMetaData)

        true
    } catch (e: Exception) {
        logger.error(e.message, e)
        false
    }

    companion object : LoggerCompanion(ClaimUserWork::class) {

    }

}