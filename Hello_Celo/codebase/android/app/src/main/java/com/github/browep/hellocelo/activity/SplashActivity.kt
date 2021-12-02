package com.github.browep.hellocelo.activity

import android.content.Intent
import android.os.Bundle
import com.github.browep.hellocelo.DEFAULT_USER_NAMES
import com.github.browep.hellocelo.R
import com.github.browep.hellocelo.datastore
import com.github.browep.hellocelo.LoggerCompanion
import com.github.browep.hellocelo.REQUEST_CODE_DEFAULT
import com.github.browep.hellocelo.SEED_PHRASE
import com.github.browep.hellocelo.blockchain.generateSeed
import com.github.browep.hellocelo.blockchainService
import com.github.browep.hellocelo.cloudService
import com.github.browep.hellocelo.database
import com.github.browep.hellocelo.work.FetchUserUpdateWork

/**
 * initial screen, determines where to go
 */
class SplashActivity : BaseActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)

        // generate seed if not present
        val seed = datastore.get(SEED_PHRASE)

        if (seed == null) {
            io {
                logger.info("generating seed")
                datastore.save(SEED_PHRASE, generateSeed().joinToString(" "))

                for (userName in DEFAULT_USER_NAMES) {
                    logger.debug("getting info for $userName")
                    val ret = FetchUserUpdateWork(blockchainService, cloudService, database, userName).exec()
                    logger.debug("ret: $ret")
                }

                main { launchMain() }
            }
        } else launchMain()
    }

    private fun launchMain() {
        startActivityForResult(Intent(this, MainActivity::class.java), REQUEST_CODE_DEFAULT)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        finish()
    }

    companion object : LoggerCompanion(SplashActivity::class)

}