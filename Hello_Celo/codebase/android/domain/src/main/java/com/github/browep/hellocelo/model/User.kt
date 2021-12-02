package com.github.browep.hellocelo.model

data class User(
    val userName: String,
    val profilePicUrl: String? = null,
    val location: String? = null,
    val profileBody: String? = null
)