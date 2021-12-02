package com.github.browep.hellocelo

import com.github.browep.hellocelo.dao.Database
import com.github.browep.hellocelo.dao.DbConnManager
import com.github.browep.hellocelo.dao.JdbcDbConnManager
import com.github.browep.hellocelo.model.Post
import org.junit.Assert
import org.junit.Test
import java.io.File

class DatabaseTest {

    private val sqlSourceFolder = File("src/main/resources/sql")

    fun createConnMgr(): DbConnManager = JdbcDbConnManager()

    @Test
    fun `can create a db`() {
        val database = Database(createConnMgr())
    }

    @Test
    fun `can insert and retrieve posts`() {
        val database = Database(createConnMgr())
        val userPosts = mutableListOf<Post>()
        userPosts += Post("jack", "hey its jack", System.currentTimeMillis(), uuid(), """{"pic":"http://example.com/img.jpg"}""")
        userPosts += Post("jill", "hey its jill", System.currentTimeMillis(), uuid(), """{"pic":"http://example.com/img.jpg"}""")
        userPosts += Post("jill", "hey its jill again", System.currentTimeMillis() - 100, uuid(), null)
        database.insertUserPosts(userPosts)

        // query for jill
        database.getPosts("jill").apply {
            Assert.assertEquals(2, size)
            Assert.assertNull(get(1).metaData)
        }

        // inserting the same posts will not fail
        database.insertUserPosts(userPosts)

        // query for jill again
        database.getPosts("jill").apply {
            Assert.assertEquals(2, size)
            Assert.assertNull(get(1).metaData)
        }

    }

    @Test
    fun `can query for all posts`() {
        val database = Database(createConnMgr())
        val userPosts = mutableListOf<Post>()
        repeat(100) { index ->
            userPosts += Post("jack", "hey its jack ${index}", System.currentTimeMillis() + index, uuid(), """{"pic":"http://example.com/img.jpg"}""")
            userPosts += Post("jill", "hey its jill ${index}", System.currentTimeMillis() + index, uuid(), """{"pic":"http://example.com/img.jpg"}""")
            userPosts += Post("jill", "hey its jill again ${index}", System.currentTimeMillis() + index, uuid(), """{"pic":"http://example.com/img.jpg"}""")
        }
        database.insertUserPosts(userPosts)

        var posts = database.getPosts()
        Assert.assertEquals(20, posts.size)

        // add offset
        posts = database.getPosts(offset = Database.POST_PAGE_SIZE)
        Assert.assertEquals(20, posts.size)

        // page to end
        posts = database.getPosts(offset = userPosts.size)
        Assert.assertEquals(0, posts.size)

        // limit is respected
        posts = database.getPosts(limit = 1)
        Assert.assertEquals(1, posts.size)
    }

    @Test
    fun `can query for all usernames and a single user`() {
        val database = Database(createConnMgr())

        database.insertUser("jack")
        database.insertUser("jill", """{"profile_pic":"https://example.com/img.jpg"}""")
        val userNames = database.getUserNames()
        Assert.assertEquals(2, userNames.size)

        val jackObj = database.getUser("jack")!!
        Assert.assertEquals("jack", jackObj.first)
        Assert.assertNull(jackObj.second)
        val jillObj = database.getUser("jill")!!
        Assert.assertEquals("jill", jillObj.first)
        Assert.assertEquals("""{"profile_pic":"https://example.com/img.jpg"}""", jillObj.second)

        // looking for non-present user will return a null and not throw error
        Assert.assertNull(database.getUser("does not exist"))
    }
}