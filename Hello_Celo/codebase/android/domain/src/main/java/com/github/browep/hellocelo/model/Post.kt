package com.github.browep.hellocelo.model

/**
 * a user post
 */
data class Post(
    val userName: String,
    val message: String,
    val timestamp: Long,
    val uuid: String,
    val metaData: String? = null
)