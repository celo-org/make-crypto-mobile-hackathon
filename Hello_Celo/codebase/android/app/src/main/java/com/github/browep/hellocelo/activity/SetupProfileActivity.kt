package com.github.browep.hellocelo.activity

import android.app.Activity
import android.content.Intent
import android.graphics.drawable.Drawable
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.DataSource
import com.bumptech.glide.load.engine.GlideException
import com.bumptech.glide.request.RequestListener
import com.bumptech.glide.request.target.Target
import com.github.browep.hellocelo.LoggerCompanion
import com.github.browep.hellocelo.R
import com.github.browep.hellocelo.REQUEST_CODE_DEFAULT
import com.github.browep.hellocelo.REQUEST_CODE_IMAGE_CAPTURE
import com.github.browep.hellocelo.blockchainService
import com.github.browep.hellocelo.cloudService
import com.github.browep.hellocelo.credProvider
import com.github.browep.hellocelo.database
import com.github.browep.hellocelo.datastore
import com.github.browep.hellocelo.onClick
import com.github.browep.hellocelo.removeProgressView
import com.github.browep.hellocelo.s
import com.github.browep.hellocelo.setupActionBarArrowWithTitle
import com.github.browep.hellocelo.showProgress
import com.github.browep.hellocelo.v
import com.github.browep.hellocelo.withIOProgressDialog
import com.github.browep.hellocelo.work.ClaimUserWork
import org.jetbrains.anko.toast
import java.io.File

/**
 * inputs for setting up profile
 */
class SetupProfileActivity : HorizontalTransitionActivity() {

    val editTextView by lazy { v<EditText>(R.id.edit_text) }

    val btnAddPhoto by lazy { v<Button>(R.id.btn_add_photo) }
    val imageView by lazy { v<ImageView>(R.id.image) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_setup_profile)
        setupActionBarArrowWithTitle(R.string.profile_setup_titlecase)

        if (savedInstanceState == null) currentPhotoPath = null

        onClick(R.id.fab) {

            val userName = editTextView.text.toString()
            logger.debug("editText.text: $userName")
            if (userName.length < 6) {
                toast(R.string.username_too_short_message)
            } else if (userName.length > 32) {
                toast(R.string.username_too_long_message)
            } else {
                withIOProgressDialog {

                    val ret = ClaimUserWork(blockchainService, datastore, database, cloudService, credProvider, userName, currentPhotoPath).exec()
                    if (ret) {
                        main {
                            startActivityForResult(
                                SuccessActivity.intent(
                                    this,
                                    title = s(R.string.success_titlecase),
                                    message = getString(R.string.claimed_username_template, userName),
                                    buttonText = s(android.R.string.ok)
                                ), REQUEST_CODE_DEFAULT
                            )
                        }
                    } else {
                        main {
                            toast(R.string.error_claiming_username)
                        }
                    }
                }
            }
        }

        onClick(R.id.btn_add_photo) { dispatchTakePictureIntent() }

    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        when {
            requestCode == REQUEST_CODE_IMAGE_CAPTURE && resultCode == Activity.RESULT_OK -> {
                currentPhotoPath?.let {
                    Glide.with(imageView).load(File(it))
                        .into(imageView)
                }
                btnAddPhoto.visibility = View.GONE
                imageView.visibility = View.VISIBLE
            }
            requestCode == REQUEST_CODE_DEFAULT -> finish()
            else -> super.onActivityResult(requestCode, resultCode, data)
        }
    }

    companion object : LoggerCompanion(SetupProfileActivity::class)


}