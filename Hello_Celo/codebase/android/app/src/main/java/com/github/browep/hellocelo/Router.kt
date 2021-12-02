package com.github.browep.hellocelo

import android.content.Intent
import com.github.browep.hellocelo.activity.AddFriendActivity
import com.github.browep.hellocelo.activity.BaseActivity
import com.github.browep.hellocelo.activity.CreatePostActivity
import com.github.browep.hellocelo.activity.EditProfileActivity
import com.github.browep.hellocelo.activity.SetupProfileActivity
import com.github.browep.hellocelo.activity.UserPostsDetailActivity
import org.jetbrains.anko.intentFor

class Router(private val baseActivity: BaseActivity) {

    fun routeAuthorPost() = baseActivity.horizStartActivity(Intent(baseActivity, CreatePostActivity::class.java))

    fun routeSetupProfile() = baseActivity.horizStartActivity(Intent(baseActivity, SetupProfileActivity::class.java))

    fun routeEditProfile() = baseActivity.horizStartActivity(Intent(baseActivity, EditProfileActivity::class.java))

    fun routeFriendsPosts(userName: String) = baseActivity.horizStartActivity(UserPostsDetailActivity.intent(baseActivity, userName))

    fun routerAddFriend() = baseActivity.horizStartActivity(baseActivity.intentFor<AddFriendActivity>())
}