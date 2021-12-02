package com.github.browep.hellocelo.dao

interface DbConnManager {
    fun select(sql: String, block: ((row: DbConnManager.Row)->Unit))
    fun insert(sql: String)

    interface Row {
        fun getString(columnName: String): String?
        fun getLong(columnName: String): Long?
    }
}