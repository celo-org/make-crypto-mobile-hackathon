package com.github.browep.hellocelo.work

interface AppWork {
    suspend fun exec(): Boolean
}