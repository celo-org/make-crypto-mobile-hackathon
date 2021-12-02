package com.github.browep.hellocelo.activity

import android.app.Activity
import android.content.Intent
import android.graphics.Bitmap
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
import com.github.browep.hellocelo.blockchainService
import com.github.browep.hellocelo.cloudService
import com.github.browep.hellocelo.credProvider
import com.github.browep.hellocelo.database
import com.github.browep.hellocelo.datastore
import com.github.browep.hellocelo.LoggerCompanion
import com.github.browep.hellocelo.R
import com.github.browep.hellocelo.REQUEST_CODE_DEFAULT
import com.github.browep.hellocelo.REQUEST_CODE_IMAGE_CAPTURE
import com.github.browep.hellocelo.USERNAME
import com.github.browep.hellocelo.model.Post
import com.github.browep.hellocelo.uuid
import com.github.browep.hellocelo.work.PostUserUpdateWork
import com.github.browep.hellocelo.onClick
import com.github.browep.hellocelo.removeProgressView
import com.github.browep.hellocelo.s
import com.github.browep.hellocelo.setupActionBarArrowWithTitle
import com.github.browep.hellocelo.showProgress
import com.github.browep.hellocelo.v
import com.github.browep.hellocelo.withIOProgressDialog
import org.jetbrains.anko.toast
import java.io.ByteArrayOutputStream
import java.io.File
import java.lang.Exception

/**
 * allow user to input post data and then send it
 */
class CreatePostActivity : HorizontalTransitionActivity() {

    val editTextView by lazy { v<EditText>(R.id.edit_text) }
    val btnAddPhoto by lazy { v<Button>(R.id.btn_add_photo) }
    val imageView by lazy { v<ImageView>(R.id.image) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_post)
        setupActionBarArrowWithTitle(R.string.post_titlecase)

        currentPhotoPath = null

        onClick(R.id.fab) {

            val message = editTextView.text.toString()
            logger.debug("editText.text: $message")

            withIOProgressDialog(stringRes = R.string.posting_ellipse) {
                val post = Post(datastore.get(USERNAME) as String, message, System.currentTimeMillis(), uuid())

                if (PostUserUpdateWork(blockchainService, database, cloudService, credProvider, post, currentPhotoPath?.let { File(it) }).exec()) {
                    main {
                        startActivityForResult(
                            SuccessActivity.intent(
                                this,
                                title = s(R.string.success_titlecase),
                                message = s(R.string.post_successfully_sent),
                                buttonText = s(android.R.string.ok)
                            ), REQUEST_CODE_DEFAULT
                        )
                    }
                } else toast(R.string.post_error)
            }
        }

        onClick(R.id.btn_add_photo) { dispatchTakePictureIntent() }

    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) = when {
        requestCode == REQUEST_CODE_DEFAULT -> {
            setResult(resultCode, data); finish()
        }
        requestCode == REQUEST_CODE_IMAGE_CAPTURE && resultCode == Activity.RESULT_OK -> {
            currentPhotoPath?.let {
                Glide.with(imageView).load(File(it))
                    .into(imageView)
            }
            btnAddPhoto.visibility = View.GONE
            imageView.visibility = View.VISIBLE
        }
        else -> super.onActivityResult(requestCode, resultCode, data)
    }

    companion object : LoggerCompanion(CreatePostActivity::class)

}