package com.github.browep.hellocelo

import com.github.browep.hellocelo.dao.Database
import com.github.browep.hellocelo.model.Post
import com.github.browep.hellocelo.model.Transformer
import com.github.browep.hellocelo.model.User
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.request.forms.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.http.content.*
import io.ktor.utils.io.core.*
import java.io.File
import kotlin.text.String

/**
 * send and retrieve data to and from the cloud
 */
class CloudService(
    private val database: Database,
    private val httpClient: HttpClient,
    private val pinataJwt: String
) {

    suspend fun persistUserPostsToCloud(userName: String): String {
        val posts = database.getPosts(userName, limit = CLOUD_POST_LIMIT)
        val (_, metadataStr) = database.getUser(userName) ?: throw IllegalArgumentException("could not find $userName in the db")

        if (posts.isEmpty()) logger.warn("posting zero messages to the cloud")

        val uploadJson = Transformer.serialize(userName, metadataStr, posts)

        val response = httpClient.post<Any>("https://api.pinata.cloud/pinning/pinJSONToIPFS") {
            header("Authorization", "Bearer $pinataJwt")
            body = TextContent(uploadJson, ContentType.Application.Json)
        } as HttpResponse

        val stringRes = String(response.readBytes())
        logger.info("res: $stringRes")

        return Transformer.deserializeCloudPostRes(stringRes)
    }

    suspend fun persistMediaToCloud(file: File): String {
        val response = httpClient.post<HttpResponse>("https://api.pinata.cloud/pinning/pinFileToIPFS") {
            header("Authorization", "Bearer $pinataJwt")
            body = MultiPartFormDataContent(
                formData {
                    appendInput(key = "file", size = file.length(), headers = Headers.build {
                        append(
                            HttpHeaders.ContentDisposition,
                            "filename=file.jpg"
                        )
                    }) { buildPacket { writeFully(file.readBytes()) } }
                }
            )
        }

        val stringRes = String(response.readBytes())
        logger.info("res: $stringRes")

        return Transformer.deserializeCloudPostRes(stringRes)

    }

    suspend fun getUserDataFromCloud(ipfsLocation: String): Pair<User, List<Post>> {
        val response = httpClient.get<HttpResponse>("https://gateway.pinata.cloud/ipfs/${ipfsLocation}")

        val stringRes = String(response.readBytes())
        logger.info("res: $stringRes")

        return Transformer.deserialize(stringRes)

    }

    companion object : LoggerCompanion(CloudService::class) {
        const val CLOUD_POST_LIMIT = 20
    }

}