package com.github.browep.hellocelo.toolbox

import android.util.Log
import com.github.browep.hellocelo.BuildConfig

import org.slf4j.helpers.MarkerIgnoringBase
import org.slf4j.helpers.MessageFormatter

internal class LoggerAdapter(tag: String) : MarkerIgnoringBase() {

    init {
        this.name = tag
    }

    override fun isTraceEnabled(): Boolean = true

    override fun trace(msg: String) = log(Log.VERBOSE, msg, null)

    override fun trace(format: String, arg: Any) = formatAndLog(Log.VERBOSE, format, arg)

    override fun trace(format: String, arg1: Any, arg2: Any) = formatAndLog(Log.VERBOSE, format, arg1, arg2)

    override fun trace(format: String, vararg argArray: Any) = formatAndLog(Log.VERBOSE, format, *argArray)

    override fun trace(msg: String, t: Throwable) = log(Log.VERBOSE, msg, t)

    override fun isDebugEnabled(): Boolean = true

    override fun debug(msg: String) = log(Log.DEBUG, msg, null)

    override fun debug(format: String, arg: Any) = formatAndLog(Log.DEBUG, format, arg)

    override fun debug(format: String, arg1: Any, arg2: Any) = formatAndLog(Log.DEBUG, format, arg1, arg2)

    override fun debug(format: String, vararg argArray: Any) = formatAndLog(Log.DEBUG, format, *argArray)

    override fun debug(msg: String, t: Throwable) = log(Log.VERBOSE, msg, t)

    override fun isInfoEnabled(): Boolean = true

    override fun info(msg: String) = log(Log.INFO, msg, null)

    override fun info(format: String, arg: Any) = formatAndLog(Log.INFO, format, arg)

    override fun info(format: String, arg1: Any, arg2: Any) = formatAndLog(Log.INFO, format, arg1, arg2)

    override fun info(format: String, vararg argArray: Any) = formatAndLog(Log.INFO, format, *argArray)

    override fun info(msg: String, t: Throwable) = log(Log.INFO, msg, t)

    override fun isWarnEnabled(): Boolean = true

    override fun warn(msg: String) = log(Log.WARN, msg, null)

    override fun warn(format: String, arg: Any) = formatAndLog(Log.WARN, format, arg)

    override fun warn(format: String, arg1: Any, arg2: Any) = formatAndLog(Log.WARN, format, arg1, arg2)

    override fun warn(format: String, vararg argArray: Any) = formatAndLog(Log.WARN, format, *argArray)

    override fun warn(msg: String, t: Throwable) = log(Log.WARN, msg, t)

    override fun isErrorEnabled(): Boolean = true

    override fun error(msg: String) = log(Log.ERROR, msg, null)

    override fun error(format: String, arg: Any) = formatAndLog(Log.ERROR, format, arg)

    override fun error(format: String, arg1: Any, arg2: Any) =
            formatAndLog(Log.ERROR, format, arg1, arg2)

    override fun error(format: String, vararg argArray: Any) = formatAndLog(Log.ERROR, format, *argArray)

    override fun error(msg: String, t: Throwable) = log(Log.ERROR, msg, t)

    private fun formatAndLog(priority: Int, format: String, vararg argArray: Any) {
        val ft = MessageFormatter.arrayFormat(format, argArray)
        logInternal(priority, ft.message, ft.throwable)
    }

    private fun log(priority: Int, message: String, throwable: Throwable?) {
        logInternal(priority, message, throwable)
    }

    private fun logInternal(priority: Int, message: String, throwable: Throwable?) {
        var message = message
        if (throwable != null) {
            message += '\n' + Log.getStackTraceString(throwable)
        }

        if (priority >= Log.ERROR || BuildConfig.DEBUG ){
            Log.println(priority, name, message)
        }

    }

    companion object {
        private const val serialVersionUID = -1227274521521287937L
    }
}