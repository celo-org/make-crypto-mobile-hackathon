package com.github.browep.hellocelo

import android.app.Activity
import android.content.Context
import com.github.browep.hellocelo.data.AndroidDatastore
import com.github.browep.hellocelo.data.AndroidDbConnManager
import com.github.browep.hellocelo.blockchain.BlockchainService
import com.github.browep.hellocelo.blockchain.TestNetBlockchainService
import com.github.browep.hellocelo.dao.CredProvider
import com.github.browep.hellocelo.dao.Database
import com.github.browep.hellocelo.dao.Datastore
import io.ktor.client.*
import io.ktor.client.engine.android.*

class Provider(context: Context) {

    val datastore: Datastore
    val database: Database
    val blockchainService: BlockchainService
    val credProvider: CredProvider
    val cloudService: CloudService

    init {
        val androidHttpClient = HttpClient(Android)
        datastore = AndroidDatastore(context)
        val dbConnManager = AndroidDbConnManager(context)
        dbConnManager.writableDatabase // this should init the db
        database = Database(dbConnManager)
        cloudService = CloudService(database, androidHttpClient, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkOTUwODQ4Ni0zYjZlLTQ5OTItYTQxMS1kZGI1ZjM3ZjNmODUiLCJlbWFpbCI6ImJyb3dlci5wYXVsQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2V9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJhYjYwMTQ0NjAxMGE4NWE1ZmViMiIsInNjb3BlZEtleVNlY3JldCI6Ijc3YWRjYTk4YmMwYzEzNDY1MDVkMTkzMTAxNmM3YWEyNjEzMmE5YzRmNjg0NGNlMTczODI2ZjgzNTE5MTc0YTQiLCJpYXQiOjE2MzQ5NTE2ODB9.B9SgqP9LUDpS4E3_AIUOKhmeglPA3XPxdwZ9Z1ZhuN4")
        blockchainService = TestNetBlockchainService()
        credProvider = CredProvider(datastore)
        instance = this
    }

    companion object : LoggerCompanion(Provider::class) {
        var instance: Provider? = null
    }

}

val Activity.datastore
    get() = Provider.instance!!.datastore
val Activity.database
    get() = Provider.instance!!.database
val Activity.blockchainService
    get() = Provider.instance!!.blockchainService
val Activity.credProvider
    get() = Provider.instance!!.credProvider
val Activity.cloudService
    get() = Provider.instance!!.cloudService