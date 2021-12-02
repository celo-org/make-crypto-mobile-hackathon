package com.github.browep.hellocelo.activity

import android.os.Build
import android.os.Bundle
import android.view.ViewGroup
import android.widget.EditText
import android.widget.TextView
import androidx.annotation.RequiresApi
import com.github.browep.hellocelo.DEFAULT_USER_NAMES
import com.github.browep.hellocelo.R
import com.github.browep.hellocelo.SUGGESTED_USER_NAMES
import com.github.browep.hellocelo.blockchainService
import com.github.browep.hellocelo.cloudService
import com.github.browep.hellocelo.database
import com.github.browep.hellocelo.hideKeyboard
import com.github.browep.hellocelo.inflateChild
import com.github.browep.hellocelo.onClick
import com.github.browep.hellocelo.setupActionBarArrowWithTitle
import com.github.browep.hellocelo.v
import com.github.browep.hellocelo.withIOProgressDialog
import com.github.browep.hellocelo.work.FetchUserUpdateWork
import org.jetbrains.anko.toast

/**
 * input activity for adding a friend
 */
class AddFriendActivity : HorizontalTransitionActivity() {

    val editText by lazy { v<EditText>(R.id.edit_text) }
    val vgSuggestedFriends by lazy { v<ViewGroup>(R.id.vg_suggested_friends) }

    @RequiresApi(Build.VERSION_CODES.N)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_add_friend)
        setupActionBarArrowWithTitle(R.string.add_friend_titlecase)

        vgSuggestedFriends.removeAllViews()

        io {
            val currentFriends = database.getUserNames()

            main {
                for (suggestedFriendUserName in SUGGESTED_USER_NAMES) {

                    // dont show friends who are already added
                    if (currentFriends.contains(suggestedFriendUserName)) continue

                    (vgSuggestedFriends.inflateChild(R.layout.item_suggested_friend) as TextView).apply {
                        text = suggestedFriendUserName
                        setOnClickListener {
                            addFriend(suggestedFriendUserName)
                        }
                    }
                }
            }

        }

        onClick(R.id.fab) {
            val userName = editText.text.toString()
            if (userName.isBlank()) {
                toast(R.string.username_too_short_message).show()
            } else {
                addFriend(userName)
            }
        }
    }

    private fun addFriend(userName: String) {
        hideKeyboard()
        withIOProgressDialog(R.string.updating_ellipse) {
            val ret = FetchUserUpdateWork(blockchainService, cloudService, database, userName).exec()
            if (ret) {
                main { toast(getString(R.string.friend_added, userName)).show() }
                finish()
            } else {
                main { toast(R.string.error_adding_friend).show() }
            }
        }
    }

}