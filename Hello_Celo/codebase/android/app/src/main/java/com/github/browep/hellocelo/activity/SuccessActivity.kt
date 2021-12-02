package com.github.browep.hellocelo.activity

import android.app.Activity
import android.content.Context
import android.os.Bundle
import android.widget.TextView
import com.github.browep.hellocelo.R
import com.github.browep.hellocelo.BUTTON_TEXT
import com.github.browep.hellocelo.LoggerCompanion
import com.github.browep.hellocelo.MESSAGE
import com.github.browep.hellocelo.TITLE
import com.github.browep.hellocelo.intentParam
import com.github.browep.hellocelo.onClick
import com.github.browep.hellocelo.v
import org.jetbrains.anko.intentFor

/**
 * generic success activity
 */
class SuccessActivity : BaseActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_success)

        v<TextView>(R.id.tv_title).text = intentParam(TITLE)
        v<TextView>(R.id.tv_message).text = intentParam(MESSAGE)
        v<TextView>(R.id.btn_primary).text = intentParam(BUTTON_TEXT)

        onClick(R.id.btn_primary) {
            setResult(Activity.RESULT_OK)
            finish()
        }
    }

    companion object : LoggerCompanion(SuccessActivity::class) {
        fun intent(context: Context, title: String, message: String, buttonText: String) = context.intentFor<SuccessActivity>(
            TITLE to title,
            MESSAGE to message,
            BUTTON_TEXT to buttonText
        )
    }
}