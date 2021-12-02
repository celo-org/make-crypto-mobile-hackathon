package com.github.browep.hellocelo

import com.github.browep.hellocelo.model.Post
import com.github.browep.hellocelo.model.Transformer
import com.github.browep.hellocelo.model.User
import org.junit.Assert
import org.junit.Test

class TransformerTest {

    @Test
    fun `can serialize and deserialize location data model`() {
        val user = User("Alice", "https://profilepic.com/img.jpg", "New York, NY", "this is my profile")
        val uuid1 = uuid()
        val uuid2 = uuid()
        val posts = listOf(
            Post("Alice", "here is the message", 1, uuid1),
            Post("Alice", "here is the message", 1, uuid2, """{"img":"http:\/\/example.com\/img.jpg"}"""),
        )
        val locationDMstr = Transformer.serialize(user, posts)

        Assert.assertNotNull(locationDMstr)
        Assert.assertEquals(
            """
            {"user":{"location":"New York, NY","userName":"Alice","profileBody":"this is my profile","profilePicUrl":"https:\/\/profilepic.com\/img.jpg"},"posts":[{"message":"here is the message","uuid":"$uuid1","timestamp":1},{"metaData":{"img":"http:\/\/example.com\/img.jpg"},"message":"here is the message","uuid":"$uuid2","timestamp":1}]}
        """.trimIndent().trim(), locationDMstr
        )

        val (_user, _posts) = Transformer.deserialize(locationDMstr)
        Assert.assertEquals(user, _user)
        Assert.assertEquals(posts, _posts)
    }

    @Test
    fun `can serialize a db response to cloud doc`() {
        val uuid1 = uuid()
        val uuid2 = uuid()
        val posts = listOf(
            Post("Alice", "here is the message", 1, uuid1),
            Post("Alice", "here is the message", 1, uuid2, """{"img":"http:\/\/example.com\/img.jpg"}"""),
        )

        val uploadDocJson = Transformer.serialize("Jack", """{"location":"New York, NY","profileBody":"this is my profile","profilePicUrl":"https:\/\/profilepic.com\/img.jpg"}""", posts)
        Assert.assertEquals("""{"user":{"userName":"Jack","metaData":{"profileBody":"this is my profile","profilePicUrl":"https:\/\/profilepic.com\/img.jpg","location":"New York, NY"}},"posts":[{"message":"here is the message","uuid":"$uuid1","timestamp":1},{"metaData":{"img":"http:\/\/example.com\/img.jpg"},"message":"here is the message","uuid":"$uuid2","timestamp":1}]}""", uploadDocJson)
    }

    @Test
    fun `can deserialize a post metadata`() {
        val metadataPost = Transformer.deserializePostMetaData(
            """ 
      {
        "imageUrl": "https://gateway.pinata.cloud/ipfs/QmVdQaswfxB6tackurq6jUKeAYS1HEqH8Lasmf4bYc2Vj6"
      }
      """
        )
        Assert.assertEquals("https://gateway.pinata.cloud/ipfs/QmVdQaswfxB6tackurq6jUKeAYS1HEqH8Lasmf4bYc2Vj6", metadataPost.imageUrl)
    }


}