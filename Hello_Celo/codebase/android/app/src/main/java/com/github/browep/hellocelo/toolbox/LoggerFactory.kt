package com.github.browep.hellocelo.toolbox

import org.slf4j.ILoggerFactory
import org.slf4j.Logger

import java.util.concurrent.ConcurrentHashMap

/**
 * SovLogLoggerFactory is an implementation of [ILoggerFactory] returning
 * the appropriately named [SovLogLoggerAdapter] instance.
 */
class LoggerFactory : ILoggerFactory {

    private val loggerMap = ConcurrentHashMap<String, Logger>()

    /**
     * Return an appropriate [SovLogLoggerAdapter] instance by name.
     */
    override fun getLogger(tag: String): Logger {
        var logger = loggerMap[tag]
        if (logger == null) {
            val newInstance = LoggerAdapter(tag)
            val oldInstance = loggerMap.put(tag, newInstance)
            logger = oldInstance ?: newInstance
        }
        return logger
    }
}