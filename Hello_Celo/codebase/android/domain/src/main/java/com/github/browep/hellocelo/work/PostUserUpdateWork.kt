package com.github.browep.hellocelo.work

import com.github.browep.hellocelo.CloudService
import com.github.browep.hellocelo.LoggerCompanion
import com.github.browep.hellocelo.blockchain.BlockchainService
import com.github.browep.hellocelo.dao.CredProvider
import com.github.browep.hellocelo.dao.Database
import com.github.browep.hellocelo.model.Post
import com.github.browep.hellocelo.model.Transformer
import java.io.File

/**
 * intern this users post on the blockchain and locally in the db
 */
class PostUserUpdateWork(
    private val blockchainService: BlockchainService,
    private val database: Database,
    private val cloudService: CloudService,
    private val credProvider: CredProvider,
    private val post: Post,
    private val imageFile: File? = null
) : AppWork {

    override suspend fun exec(): Boolean = try {

        val userName = post.userName

        // upload image to cloud
        val updatedPost = imageFile?.let { imageFile ->
            val imageIpfsHash = cloudService.persistMediaToCloud(imageFile)
            post.copy(metaData = Transformer.serializePostMetadata("https://gateway.pinata.cloud/ipfs/${imageIpfsHash}"))
        } ?: post

        // add this post to the db
        database.insertUserPosts(listOf(updatedPost))

        // send to cloud
        val location = cloudService.persistUserPostsToCloud(userName)

        logger.debug("post location: ${location}")

        // save to chain
        blockchainService.postLocationMeta(userName, location, credProvider.getCreds())

        true
    } catch (e: Exception) {
        logger.error(e.message, e)
        false
    }

    companion object : LoggerCompanion(PostUserUpdateWork::class)

}