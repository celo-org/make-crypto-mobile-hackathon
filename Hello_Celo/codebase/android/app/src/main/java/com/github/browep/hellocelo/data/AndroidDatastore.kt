package com.github.browep.hellocelo.data

import android.content.Context
import android.content.SharedPreferences
import androidx.security.crypto.EncryptedSharedPreferences
import com.github.browep.hellocelo.LoggerCompanion
import com.github.browep.hellocelo.dao.Datastore

/**
 * android impl for shared prefs
 */
class AndroidDatastore(
    context: Context
): Datastore {

    private val sharedPreferences: SharedPreferences = EncryptedSharedPreferences.create(
        SHARED_PREFS_FILE_NAME,
        MAIN_KEY_ALIAS,
        context,
        EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
        EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
    )

    override fun get(key: String): Any? = sharedPreferences.getString(key, null)

    override fun save(key: String, value: String) = sharedPreferences.edit().putString(key, value).apply()

    companion object : LoggerCompanion(AndroidDatastore::class) {
        const val MAIN_KEY_ALIAS = "shared_prefs_key"
        val SHARED_PREFS_FILE_NAME = "encrypted_shared_prefs_v2.xml"
    }

}