package com.github.browep.hellocelo.activity

import com.github.browep.hellocelo.R

/**
 * activity that slides out to the right on finish
 */
open class HorizontalTransitionActivity : BaseActivity() {

    override fun finish() {
        super.finish()
        overridePendingTransition(R.anim.slide_in_left, R.anim.slide_out_right);
    }

}