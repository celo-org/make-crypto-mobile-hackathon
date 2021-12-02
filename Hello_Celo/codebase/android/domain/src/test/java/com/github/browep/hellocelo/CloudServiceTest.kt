package com.github.browep.hellocelo

import com.github.browep.hellocelo.dao.Database
import com.github.browep.hellocelo.dao.JdbcDbConnManager
import com.github.browep.hellocelo.model.Post
import io.ktor.client.*
import io.ktor.client.engine.java.*
import kotlinx.coroutines.runBlocking
import org.junit.Assert
import org.junit.Test
import java.io.File

class CloudServiceTest {

    private val sqlSourceFolder = File("src/main/resources/sql")
    private val httpClient: HttpClient = HttpClient(Java)

    @Test
    fun `can upload to ipfs a cloud doc`() = runBlocking {
        val database = Database(JdbcDbConnManager())
        val userPosts = mutableListOf<Post>()
        userPosts += Post(JILL, "hey its jill", System.currentTimeMillis(), uuid(),"""{"pic":"http://example.com/img.jpg"}""")
        userPosts += Post(JILL, "hey its jill again", System.currentTimeMillis(), uuid(), """{"pic":"http://example.com/img.jpg"}""")
        database.insertUserPosts(userPosts)
        database.insertUser(JILL)
        val cloudService = CloudService(database, httpClient, System.getenv("PINATA_JWT"))
        Assert.assertNotNull(cloudService.persistUserPostsToCloud(JILL))
    }

    @Test
    fun `can upload image to cloud doc`() = runBlocking {
        val database = Database(JdbcDbConnManager())
        val cloudService = CloudService(database, httpClient, System.getenv("PINATA_JWT"))
        val ipfsHash = cloudService.persistMediaToCloud(File("src/main/resources/sample.jpg"))
        Assert.assertNotNull(ipfsHash)
    }

    companion object : LoggerCompanion(CloudServiceTest::class) {
        const val JILL = "jill"
    }
    
}