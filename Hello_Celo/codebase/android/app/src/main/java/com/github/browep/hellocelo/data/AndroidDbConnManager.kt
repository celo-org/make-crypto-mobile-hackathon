package com.github.browep.hellocelo.data

import android.annotation.SuppressLint
import android.content.Context
import android.database.Cursor
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper
import com.github.browep.hellocelo.LoggerCompanion
import com.github.browep.hellocelo.dao.DbConnManager
import com.github.browep.hellocelo.dao.SQL_SOURCES

/**
 * android imple for db conn
 */
class AndroidDbConnManager(
    context: Context,
) : DbConnManager, SQLiteOpenHelper(context, DATABASE_NAME, null, DATABASE_VERSION) {

    override fun select(sql: String, block: ((row: DbConnManager.Row) -> Unit)) {
        logger.info("select:\n$sql")
        readableDatabase.apply {
            rawQuery(sql, emptyArray()).use {
                if (it.moveToFirst()) {
                    do {
                        block(AndroidRow(it))
                    } while (it.moveToNext())
                }
            }
        }
    }

    override fun insert(sql: String) {
        logger.debug("insert:\n$sql")
        writableDatabase.apply {
            execSQL(sql, emptyArray())
        }
    }

    override fun onCreate(db: SQLiteDatabase) {
        logger.info("onCreate")
        db.apply {
            for (sqlSource in SQL_SOURCES) {
                logger.info("create db: $sqlSource")
                execSQL(sqlSource)
            }
        }
    }

    override fun onUpgrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) = Unit

    override fun onDowngrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) = Unit

    class AndroidRow(val cursor: Cursor) : DbConnManager.Row {
        @SuppressLint("Range")
        override fun getString(columnName: String): String? = cursor.getString(cursor.getColumnIndex(columnName))

        @SuppressLint("Range")
        override fun getLong(columnName: String): Long? = cursor.getLong(cursor.getColumnIndex(columnName))
    }

    companion object : LoggerCompanion(AndroidDbConnManager::class) {
        const val DATABASE_NAME = "hello_celo.sqlite"
        const val DATABASE_VERSION = 1
    }

}