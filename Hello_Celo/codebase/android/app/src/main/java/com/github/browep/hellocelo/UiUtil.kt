package com.github.browep.hellocelo

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.graphics.PorterDuff
import android.graphics.PorterDuffColorFilter
import android.util.TypedValue
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.inputmethod.InputMethodManager
import android.widget.TextView
import androidx.annotation.AttrRes
import androidx.annotation.ColorInt
import androidx.annotation.IdRes
import androidx.annotation.LayoutRes
import androidx.annotation.StringRes
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityOptionsCompat
import androidx.core.view.children
import com.github.browep.hellocelo.activity.BaseActivity
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.security.MessageDigest

private val logger: Logger by lazy { LoggerFactory.getLogger("UiUtil") }

fun AppCompatActivity.setupActionBarArrowWithTitle(@StringRes titleRes: Int) {
    setupActionBarArrowWithTitle(getString(titleRes))
}

fun AppCompatActivity.setupActionBarArrowWithTitle(titleStr: String) {
    val toolbar = findViewById<androidx.appcompat.widget.Toolbar>(R.id.toolbar)
    setSupportActionBar(toolbar)
    supportActionBar?.run {
        setDisplayHomeAsUpEnabled(true)
        setDisplayShowHomeEnabled(true)
        title = titleStr
        toolbar?.setNavigationOnClickListener { onBackPressed() }
        toolbar?.navigationIcon?.setColorFilter(PorterDuffColorFilter(getColorFromAttr(R.attr.colorOnPrimary), PorterDuff.Mode.SRC_ATOP));
    } ?: run { logger.warn("setupActionBarArrowWithTitle called but no support action bar") }
}

@ColorInt
fun Context.getColorFromAttr(
    @AttrRes attrColor: Int,
    typedValue: TypedValue = TypedValue(),
    resolveRefs: Boolean = true
): Int {
    theme.resolveAttribute(attrColor, typedValue, resolveRefs)
    return typedValue.data
}

inline fun <reified T> Activity.intentParam(key: String): T = this.intent.extras?.get(key) as T
inline fun <reified T : View> Activity.v(@IdRes id: Int): T = findViewById(id)
inline fun <reified T : View> View.v(@IdRes id: Int): T = findViewById(id)

inline val Context.layoutInflater: android.view.LayoutInflater
    get() = getSystemService(Context.LAYOUT_INFLATER_SERVICE) as android.view.LayoutInflater

fun Activity.horizStartActivityForResult(intent: Intent, requestCode: Int) {
    startActivityForResult(intent, requestCode)
    horizActivityTransition()
}

fun Activity.horizStartActivity(intent: Intent) {
    startActivity(intent)
    horizActivityTransition()
}

fun Activity.horizActivityOptions() = ActivityOptionsCompat.makeCustomAnimation(this, R.anim.slide_in_right, R.anim.slide_out_left)

fun Activity.horizActivityTransition() {
    overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left)
}

fun Activity.onClick(@IdRes viewId: Int, onClick: ((v: View) -> Unit)) {
    findViewById<View>(viewId).setOnClickListener { onClick(it) }
}

fun Activity.s(@StringRes stringRes: Int) = getString(stringRes)

/**
 * inflate a layout into a parent and return the inflated layout
 */
fun ViewGroup.inflateChild(@LayoutRes layoutRes: Int): View {
    this.context!!.let { ctx ->
        LayoutInflater.from(ctx).inflate(layoutRes, this, true)
        return children.last()
    }
}

fun Activity.showProgress(message: String? = null): View = findViewById<ViewGroup>(android.R.id.content).inflateChild(R.layout.partial_progress).apply {
    findViewById<TextView>(R.id.tv_progress_text).text = message
}

fun BaseActivity.withIOProgressDialog(@StringRes stringRes: Int = R.string.updating_ellipse, block: suspend (() -> Unit)) {
    val progressView = showProgress(getString(stringRes))
    coroutineScope.launch(Dispatchers.IO) {
        try {
            block()
            main {
                try {
                    removeProgressView(progressView)
                } catch (e: Exception) {
                    logger.error(e.message, e)
                }
            }
        } catch (e: Exception) {
            logger.error(e.message, e)
            main {
                removeProgressView(progressView)
            }
        }
    }
}

fun BaseActivity.removeProgressView(progressView: View) {
    (findViewById<ViewGroup>(R.id.vg_progress_container).parent as? ViewGroup)?.removeViewInLayout(progressView)
}

fun Activity.hideKeyboard() = try {
    val imm: InputMethodManager = getSystemService(Activity.INPUT_METHOD_SERVICE) as InputMethodManager
    //Find the currently focused view, so we can grab the correct window token from it.
    var view = currentFocus
    //If no view currently has focus, create a new one, just so we can grab a window token from it
    if (view == null) {
        view = View(this)
    }
    imm.hideSoftInputFromWindow(view.windowToken, 0)
} catch (e: Exception) { logger.error(e.message, e) }

fun String.toColor(): Int {
    val md = MessageDigest.getInstance("MD5")
    md.update(toByteArray())
    val digest = md.digest()
    return Color.parseColor("#" + digest.toHexString().substring(0..5))
}