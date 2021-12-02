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

class UpdateUserWork(
    val blockchainService: BlockchainService,
    val datastore: Datastore,
    val database: Database,
    val cloudService: CloudService,
    val credProvider: CredProvider,
    val photoFilePath: String
) : AppWork {
    override suspend fun exec(): Boolean = try {

        val userName = datastore.get(USERNAME) as String

        val userMetaData = photoFilePath.let {
            val imageIpfsHash = cloudService.persistMediaToCloud(File(it))
            Transformer.serializeUserMetadata(
                User(
                    userName,
                    profilePicUrl = "https://gateway.pinata.cloud/ipfs/${imageIpfsHash}"
                )
            )
        }

        // update userMetaData
        database.insertUser(userName, userMetaData)

        // send to cloud
        val location = cloudService.persistUserPostsToCloud(userName)

        logger.debug("post location: ${location}")

        // save to chain
        blockchainService.postLocationMeta(userName, location, credProvider.getCreds())

        true
    } catch (e: Exception) {
        ClaimUserWork.logger.error(e.message, e)
        false
    }

    companion object : LoggerCompanion(UpdateUserWork::class) {

    }

}