/*
 * Copyright 2016 JetBrains s.r.o.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

@file:Suppress("NOTHING_TO_INLINE", "unused")

package org.jetbrains.anko

import android.app.Fragment
import android.content.Context
import android.content.DialogInterface

inline fun AnkoContext<*>.selector(
        title: CharSequence? = null,
        items: List<CharSequence>,
        noinline onClick: (DialogInterface, Int) -> Unit
) = ctx.selector(title, items, onClick)

@Deprecated(message = "Use support library fragments instead. Framework fragments were deprecated in API 28.")
inline fun Fragment.selector(
        title: CharSequence? = null,
        items: List<CharSequence>,
        noinline onClick: (DialogInterface, Int) -> Unit
) = activity.selector(title, items, onClick)

fun Context.selector(
        title: CharSequence? = null,
        items: List<CharSequence>,
        onClick: (DialogInterface, Int) -> Unit
) {
    with(AndroidAlertBuilder(this)) {
        if (title != null) {
            this.title = title
        }
        items(items, onClick)
        show()
    }
}
