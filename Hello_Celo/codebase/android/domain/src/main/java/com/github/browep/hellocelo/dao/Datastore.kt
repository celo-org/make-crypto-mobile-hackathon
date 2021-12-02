package com.github.browep.hellocelo.dao

interface Datastore {
    fun get(key: String): Any?
    fun save(key: String, value: String)
}