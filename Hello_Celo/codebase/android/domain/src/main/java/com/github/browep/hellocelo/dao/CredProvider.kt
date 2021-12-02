package com.github.browep.hellocelo.dao

import com.github.browep.hellocelo.SEED_PHRASE
import com.github.browep.hellocelo.blockchain.privKeyFromSeed
import org.web3j.crypto.Credentials

/**
 * handle creds
 */
class CredProvider(private val datastore: Datastore) {

    fun getPrivateKey(): String {
        val seedPhrase = datastore.get(SEED_PHRASE) as String
        return privKeyFromSeed(seedPhrase.split(" "))
    }

    fun getCreds(): Credentials {
        return Credentials.create(getPrivateKey())
    }
}