package com.github.browep.hellocelo.dao

import com.github.browep.hellocelo.LoggerCompanion
import com.github.browep.hellocelo.model.Post
import com.github.browep.hellocelo.model.Transformer
import com.github.browep.hellocelo.model.User
import java.sql.SQLException

/**
 * encapsulate all the interactions with the db
 */
class Database(
    private val dbConnManager: DbConnManager
) {

    /**
     * TODO: this needs to be sanitized
     */
    fun insertUserPosts(posts: List<Post>) {
        try {
            logger.debug("inserting ${posts.size}")

            val postLines = posts.map {
                if (it.metaData != null) """("${it.userName}",${it.timestamp},"${it.message}","${it.uuid}",'${it.metaData}')"""
                else """("${it.userName}",${it.timestamp},"${it.message}","${it.uuid}",null)"""
            }

            val sql = """
                        INSERT OR REPLACE INTO "posts" ("userName", "timestamp", "message", "uuid", "metaData")
                        VALUES                           
                            ${postLines.joinToString(",")}                        	
                    ;""".trimIndent()
            dbConnManager.insert(sql)

            logger.debug("finished inserting ${posts.size}")

        } catch (e: SQLException) {
            logger.error(e.message, e)
            throw e
        }
    }

    /**
     * remove a user from the users list and all their posts
     */
    fun removeUser(userName: String) = try {

        val deleteFromUsersTable = """
                    DELETE 
                    FROM users 
                    WHERE rowid 
                        = (SELECT rowid FROM users WHERE userName = '$userName' LIMIT 1 )
                """.trimIndent()

        dbConnManager.insert(deleteFromUsersTable)

        val deleteFromPostsTable = """
            DELETE
            FROM posts 
            WHERE userName = "$userName";
        """.trimIndent()

        dbConnManager.insert(deleteFromPostsTable)

    } catch (e: SQLException) {
        logger.error(e.message, e)
        throw e
    }


    /**
     * needs to be sanitized
     */
    fun insertUser(userName: String, metaData: String? = null) = try {
        val values = if (metaData != null) {
            """'${userName}','${metaData}'"""
        } else {
            """'${userName}', NULL"""
        }
        val sql = """
                    INSERT OR REPLACE INTO "users" ("userName", "metaData" )
                    VALUES ($values)                                                                    
                """.trimIndent()

        dbConnManager.insert(sql)

    } catch (e: SQLException) {
        logger.error(e.message, e)
        throw e
    }

    /**
     * [return] pair userName, metadata
     */
    fun getUser(userName: String): Pair<String, String?>? {
        var userObj: Pair<String, String?>? = null
        try {
            val sql = """
                        SELECT userName, metaData
                        FROM users
                        WHERE userName = '${userName}'
                    """.trimIndent()

            dbConnManager.select(sql) { rs ->
                userObj = rs.getString("userName")!! to rs.getString("metaData")
            }

        } catch (e: SQLException) {
            logger.error(e.message, e)
            throw e
        }

        return userObj
    }

    fun getUserNames(): List<String> {
        val userNames = mutableListOf<String>()
        try {
            val sql = """
                        SELECT userName
                        FROM users
                        ORDER BY userName ASC
                    """.trimIndent()

            dbConnManager.select(sql) { rs ->
                userNames += rs.getString("userName")!!
            }

        } catch (e: SQLException) {
            logger.error(e.message, e)
            throw e
        }

        return userNames
    }

    fun getUsers(): List<User> {
        val users = mutableListOf<User>()
        try {
            val sql = """
                        SELECT *
                        FROM users
                        ORDER BY userName ASC
                    """.trimIndent()

            dbConnManager.select(sql) { rs ->
                val userName = rs.getString("userName")!!
                users += rs.getString("metaData")?.let { Transformer.deserializeUserMetaData(userName, it) } ?: User(userName)
            }

        } catch (e: SQLException) {
            logger.error(e.message, e)
            throw e
        }

        return users
    }

    fun getPosts(filterForUserName: String? = null, offset: Int = 0, limit: Int = POST_PAGE_SIZE, filterOutUserName: String? = null): List<Post> {

        val posts = mutableListOf<Post>()
        try {
            logger.debug("getting posts for ${filterForUserName}, offset=$offset")

            var sql = """
                        SELECT userName, timestamp, message, uuid, metaData
                        FROM posts              
            """;

            sql += when {
                filterForUserName != null -> "WHERE userName = '${filterForUserName}'"
                filterOutUserName != null -> "WHERE userName != '${filterOutUserName}'"
                else -> ""
            }

            sql += """
                            ORDER BY timestamp DESC
                            LIMIT $limit OFFSET $offset
            """.trimIndent()

            dbConnManager.select(sql) { rs ->
                posts += Post(
                    userName = rs.getString("userName")!!,
                    message = rs.getString("message")!!,
                    timestamp = rs.getLong("timestamp")!!,
                    uuid = rs.getString("uuid")!!,
                    metaData = rs.getString("metaData")
                )
            }
        } catch (e: SQLException) {
            logger.error(e.message, e)
            throw e
        }

        return posts
    }


    companion object : LoggerCompanion(Database::class) {
        const val POST_PAGE_SIZE = 20
    }

}