package com.github.browep.hellocelo.activity

import android.app.Activity
import android.content.Intent
import android.graphics.drawable.Drawable
import android.os.Bundle
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.DataSource
import com.bumptech.glide.load.engine.GlideException
import com.bumptech.glide.request.RequestListener
import com.bumptech.glide.request.target.Target
import com.github.browep.hellocelo.LoggerCompanion
import com.github.browep.hellocelo.R
import com.github.browep.hellocelo.REQUEST_CODE_IMAGE_CAPTURE
import com.github.browep.hellocelo.Router
import com.github.browep.hellocelo.USERNAME
import com.github.browep.hellocelo.blockchainService
import com.github.browep.hellocelo.cloudService
import com.github.browep.hellocelo.credProvider
import com.github.browep.hellocelo.database
import com.github.browep.hellocelo.datastore
import com.github.browep.hellocelo.model.Transformer
import com.github.browep.hellocelo.onClick
import com.github.browep.hellocelo.removeProgressView
import com.github.browep.hellocelo.s
import com.github.browep.hellocelo.setupActionBarArrowWithTitle
import com.github.browep.hellocelo.showProgress
import com.github.browep.hellocelo.v
import com.github.browep.hellocelo.withIOProgressDialog
import com.github.browep.hellocelo.work.UpdateUserWork
import org.jetbrains.anko.toast
import java.io.File
import java.lang.Exception

class EditProfileActivity : HorizontalTransitionActivity() {

    val imageView by lazy { v<ImageView>(R.id.image) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_edit_profile)
        setupActionBarArrowWithTitle(R.string.edit_profile_titlecase)

        imageView.setOnClickListener { dispatchTakePictureIntent() }

        onClick(R.id.fab) {
            currentPhotoPath?.let {
                withIOProgressDialog {
                    if (UpdateUserWork(blockchainService, datastore, database, cloudService, credProvider, it).exec()) {
                        toast(R.string.profile_updated)
                    } else {
                        toast(R.string.error_updating_profile)
                    }
                }
            }
        }

        (datastore.get(USERNAME) as? String)?.let { userName ->
            database.getUser(userName)?.let { (_, userMetaData) ->
                v<TextView>(R.id.tv_username).text = userName
                imageView.apply {
                    val userObj = Transformer.deserializeUserMetaData(userName, userMetaData)
                    userObj.profilePicUrl?.let { url ->
                        Glide.with(this)
                            .load(url)
                            .into(this)
                    }
                }
            }
        }

        onClick(R.id.tv_see_posts) { (datastore.get(USERNAME) as? String)?.let { Router(this).routeFriendsPosts(it) } }

    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        when {
            requestCode == REQUEST_CODE_IMAGE_CAPTURE && resultCode == Activity.RESULT_OK -> {
                currentPhotoPath?.let {
                    logger.debug("loading $it")
                    val progressView = showProgress(s(R.string.loading_ellipse))
                    Glide.with(imageView).load(File(it))
                        .addListener(object : RequestListener<Drawable> {
                            override fun onLoadFailed(p0: GlideException?, p1: Any?, p2: Target<Drawable>?, p3: Boolean): Boolean {
                                logger.error(p0?.message, p0)
                                main { removeProgressView(progressView) }
                                return true
                            }

                            override fun onResourceReady(p0: Drawable?, p1: Any?, p2: Target<Drawable>?, p3: DataSource?, p4: Boolean): Boolean {
                                main { removeProgressView(progressView) }
                                return true
                            }

                        })
                        .into(imageView)
                }
            }
            else -> super.onActivityResult(requestCode, resultCode, data)
        }
    }

    companion object : LoggerCompanion(EditProfileActivity::class)

}