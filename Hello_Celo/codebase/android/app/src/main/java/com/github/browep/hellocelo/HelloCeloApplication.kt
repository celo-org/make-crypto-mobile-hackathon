package com.github.browep.hellocelo

import android.app.Application

class HelloCeloApplication : Application() {

    override fun onCreate() {
        super.onCreate()
        logger.debug("onCreate")
        Provider(this)
    }

    companion object : LoggerCompanion(HelloCeloApplication::class) {

    }

}