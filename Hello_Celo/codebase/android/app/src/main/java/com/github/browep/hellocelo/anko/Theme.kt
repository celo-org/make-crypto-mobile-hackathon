@file:Suppress("NOTHING_TO_INLINE", "unused")
package org.jetbrains.anko

import android.app.Fragment
import android.content.Context
import android.content.res.Resources
import android.util.TypedValue
import android.view.View
import androidx.annotation.AttrRes

fun Resources.Theme.attr(@AttrRes attribute: Int): TypedValue {
    val typedValue = TypedValue()
    if (!resolveAttribute(attribute, typedValue, true)) {
        throw IllegalArgumentException("Failed to resolve attribute: $attribute")
    }

    return typedValue
}

fun Resources.Theme.color(@AttrRes attribute: Int): Int {
    val attr = attr(attribute)
    if (attr.type < TypedValue.TYPE_FIRST_COLOR_INT || attr.type > TypedValue.TYPE_LAST_COLOR_INT) {
        throw IllegalArgumentException("Attribute value type is not color: $attribute")
    }

    return attr.data
}

fun Context.attr(@AttrRes attribute: Int): TypedValue = theme.attr(attribute)

fun Context.dimenAttr(@AttrRes attribute: Int): Int =
        TypedValue.complexToDimensionPixelSize(attr(attribute).data, resources.displayMetrics)

fun Context.colorAttr(@AttrRes attribute: Int): Int = theme.color(attribute)


inline fun AnkoContext<*>.dimenAttr(@AttrRes attribute: Int): Int = ctx.dimenAttr(attribute)

inline fun AnkoContext<*>.colorAttr(@AttrRes attribute: Int): Int = ctx.colorAttr(attribute)

inline fun AnkoContext<*>.attr(@AttrRes attribute: Int): TypedValue = ctx.attr(attribute)


inline fun View.dimenAttr(@AttrRes attribute: Int): Int = context.dimenAttr(attribute)

inline fun View.colorAttr(@AttrRes attribute: Int): Int = context.colorAttr(attribute)

inline fun View.attr(@AttrRes attribute: Int): TypedValue = context.attr(attribute)


@Deprecated(message = "Use support library fragments instead. Framework fragments were deprecated in API 28.")
inline fun Fragment.dimenAttr(@AttrRes attribute: Int): Int = activity.dimenAttr(attribute)

@Deprecated(message = "Use support library fragments instead. Framework fragments were deprecated in API 28.")
inline fun Fragment.colorAttr(@AttrRes attribute: Int): Int = activity.colorAttr(attribute)

@Deprecated(message = "Use support library fragments instead. Framework fragments were deprecated in API 28.")
inline fun Fragment.attr(@AttrRes attribute: Int): TypedValue = activity.attr(attribute)
