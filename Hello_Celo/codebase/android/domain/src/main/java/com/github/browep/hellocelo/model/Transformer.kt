package com.github.browep.hellocelo.model

import org.json.simple.JSONArray
import org.json.simple.JSONObject
import org.json.simple.JSONValue

/**
 * Turn Objects into serialized data and back
 */
object Transformer {

    fun deserialize(locationDMStr: String): Pair<User, List<Post>> {
        val locationDMJsonObj = JSONValue.parse(locationDMStr) as JSONObject

        val user = (locationDMJsonObj["user"] as JSONObject).let {
            User(
                userName = it.get("userName") as String,
                profilePicUrl = it.get("profilePicUrl") as String?,
                location = it.get("location") as String?,
                profileBody = it.get("profileBody") as String?
            )
        }

        val posts = mutableListOf<Post>()

        (locationDMJsonObj["posts"] as? JSONArray)?.forEach { postJsonObj ->
            postJsonObj as JSONObject
            posts += Post(
                userName = user.userName,
                message = postJsonObj["message"] as String,
                timestamp = postJsonObj["timestamp"] as Long,
                uuid = postJsonObj["uuid"] as String,
                metaData = (postJsonObj["metaData"] as? JSONObject)?.toJSONString()
            )
        }

        return user to posts
    }

    fun deserializePostMetaData(postMetadataStr: String): PostMetaData {
        val jsonObj = JSONValue.parse(postMetadataStr) as JSONObject
        return PostMetaData(
            imageUrl = jsonObj["imageUrl"] as String?
        )
    }

    fun deserializeUserMetaData(userName: String, userMetaData: String?): User = if (userMetaData != null ) {
        val jsonObj = JSONValue.parse(userMetaData) as JSONObject
        User(
            userName = userName,
            profilePicUrl = jsonObj["profilePicUrl"] as String?
        )
    } else {
        User(userName)
    }

    fun deserializeCloudPostRes(postRes: String): String = (JSONValue.parse(postRes) as JSONObject)["IpfsHash"] as String

    fun serialize(userName: String, userMetaData: String?, posts: List<Post>): String {

        val userJsonObject = userMetaData?.let { JSONValue.parse(userMetaData) as JSONObject } ?: JSONObject()
        userJsonObject["userName"] = userName

        val postsJsonArray = JSONArray()
        for (post in posts) postsJsonArray.add(toJson(post))

        return JSONObject(
            mapOf(
                "user" to userJsonObject,
                "posts" to postsJsonArray
            )
        ).toJSONString()
    }

    fun serializeUserMetadata(user: User): String = userMetadataToJsonObject(user).toJSONString()

    fun serialize(user: User, posts: List<Post>): String {

        val userJsonObject = userMetadataToJsonObject(user)
        userJsonObject["userName"] = user.userName

        val postsJsonArray = JSONArray()
        for (post in posts) postsJsonArray.add(toJson(post))

        return JSONObject(
            mapOf(
                "user" to userJsonObject,
                "posts" to postsJsonArray
            )
        ).toJSONString()
    }

    fun serialize(post: Post): String = toJson(post).toJSONString()


    fun serializePostMetadata(imageUrl: String? = null) : String {

        val jsonObject = JSONObject()

        imageUrl?.run {
            jsonObject["imageUrl"] = this
        }

        return jsonObject.toJSONString()
    }

    private fun toJson(post: Post): JSONObject {
        val map = mutableMapOf<String, Any>(
            "message" to post.message,
            "timestamp" to post.timestamp,
            "uuid" to post.uuid
        )
        post.metaData?.let { metaDataStr ->
            map["metaData"] = JSONValue.parse(metaDataStr)
        }
        return JSONObject(map)
    }

    private fun userMetadataToJsonObject(user: User): JSONObject {
        val userJsonObject = JSONObject()
        user.location?.let { userJsonObject["location"] = it }
        user.profileBody?.let { userJsonObject["profileBody"] = it }
        user.profilePicUrl?.let { userJsonObject["profilePicUrl"] = it }
        return userJsonObject
    }


}