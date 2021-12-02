package com.github.browep.hellocelo.dao

import com.github.browep.hellocelo.LoggerCompanion
import java.io.File
import java.sql.Connection
import java.sql.DatabaseMetaData
import java.sql.DriverManager
import java.sql.ResultSet
import java.sql.SQLException
import kotlin.io.path.createTempDirectory

/**
 * JVM impl for db conn mgr
 */
class JdbcDbConnManager(
    private val dbDirectory: File = File(createTempDirectory("hello-celo").toString())
) : DbConnManager {

    private val dbFile: File = File( dbDirectory, "hello-celo.sqlite")

    init {
        // check to see if the db exists, if it does not then create it
        if (!dbFile.exists()) {
            createNewDatabase()
        } else {
            logger.debug("file already exists, not creating it: ${dbFile.absolutePath}")
        }
    }

    override fun select(sql: String, block: (row: DbConnManager.Row) -> Unit) {
        DriverManager.getConnection(getConnStr()).use { conn ->
            if (conn != null) {
                logger.debug("execSql: $sql")
                val prepareStatement = conn.prepareStatement(sql)
                val execRes = prepareStatement.execute()
                logger.debug("execRes: $execRes")
                val resultSet = prepareStatement.resultSet
                while (resultSet.next()) block(JvmRow(resultSet))
            }
        }
    }

    override fun insert(sql: String) {
        DriverManager.getConnection(getConnStr()).use { conn ->
            if (conn != null) {
                logger.debug("execSql: $sql")
                val prepareStatement = conn.prepareStatement(sql)
                val execRes = prepareStatement.execute()
                logger.debug("execRes: $execRes")
            }
        }
    }

    private fun createNewDatabase() {
        try {
            DriverManager.getConnection(getConnStr()).use { conn ->
                if (conn != null) {
                    val meta: DatabaseMetaData = conn.metaData
                    logger.debug("The driver name is " + meta.driverName)
                    logger.debug("A new database has been created at ${dbFile.absolutePath}")
                    for (sqlSource in SQL_SOURCES) { execSql(conn, sqlSource) }
                }
            }
        } catch (e: SQLException) {
            logger.error(e.message, e)
        }
    }

    private fun getConnStr() = "jdbc:sqlite:${dbFile.absolutePath}"

    private fun execSql(conn: Connection, sql: String): ResultSet? {
        logger.debug("execSql: $sql")
        val prepareStatement = conn.prepareStatement(sql)
        val execRes = prepareStatement.execute()
        logger.debug("execRes: $execRes")
        return prepareStatement.resultSet
    }

    class JvmRow(private val rs: ResultSet) : DbConnManager.Row {
        override fun getString(columnName: String): String? {
            return rs.getString(columnName)
        }
        override fun getLong(columnName: String): Long? = rs.getLong(columnName)
    }

    companion object : LoggerCompanion(JdbcDbConnManager::class) {

    }

}