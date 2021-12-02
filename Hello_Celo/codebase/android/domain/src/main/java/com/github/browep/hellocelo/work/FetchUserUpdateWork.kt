package com.github.browep.hellocelo.work

import com.github.browep.hellocelo.CloudService
import com.github.browep.hellocelo.LoggerCompanion
import com.github.browep.hellocelo.blockchain.BlockchainService
import com.github.browep.hellocelo.dao.Database
import com.github.browep.hellocelo.model.Transformer

class FetchUserUpdateWork(
    val blockchainService: BlockchainService,
    val cloudService: CloudService,
    val database: Database,
    val userName: String
) : AppWork {

    override suspend fun exec(): Boolean = try {
        // get the latest location for user
        logger.debug("getting post for user: ${userName}")
        blockchainService.getPostForUser(userName)?.let { location ->
            if (location.isEmpty()) throw IllegalStateException("could not find any posts for that user, location was empty")
            logger.debug("post for ${userName}->$location")
            val (user, posts) = cloudService.getUserDataFromCloud(location)
            database.insertUserPosts(posts)
            database.insertUser(userName, Transformer.serializeUserMetadata(user))
        } ?: run { logger.error("could not get a post for ${userName}") }

        true
    } catch (e: Exception) {
        logger.error(e.message, e)
        false
    }

    companion object : LoggerCompanion(FetchUserUpdateWork::class)

}