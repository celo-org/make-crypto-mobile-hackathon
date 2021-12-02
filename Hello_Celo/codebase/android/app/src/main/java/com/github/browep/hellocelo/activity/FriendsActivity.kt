package com.github.browep.hellocelo.activity

import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.github.browep.hellocelo.R
import com.github.browep.hellocelo.Router
import com.github.browep.hellocelo.USERNAME
import com.github.browep.hellocelo.adapter.FriendsAdapter
import com.github.browep.hellocelo.database
import com.github.browep.hellocelo.datastore
import com.github.browep.hellocelo.setupActionBarArrowWithTitle
import com.github.browep.hellocelo.v
import com.github.browep.hellocelo.withIOProgressDialog
import com.google.android.material.floatingactionbutton.FloatingActionButton
import org.jetbrains.anko.alert

/**
 * list of friends, ability to add or delete
 */
class FriendsActivity : HorizontalTransitionActivity(), FriendsAdapter.Delegate {

    val recyclerView by lazy { v<RecyclerView>(R.id.recycler_view) }
    val fab by lazy { v<FloatingActionButton>(R.id.fab) }

    val router = Router(this)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_friends)
        setupActionBarArrowWithTitle(R.string.friends_titlecase)
        recyclerView.layoutManager = LinearLayoutManager(this)

        fab.setOnClickListener { router.routerAddFriend() }
    }

    override fun onResume() {
        super.onResume()
        updateFriendsList()
    }

    private fun updateFriendsList() {
        io {
            val currentUserName = datastore.get(USERNAME)
            val userNames = database.getUserNames().filterNot { it == currentUserName }
            main {
                recyclerView.adapter = FriendsAdapter(userNames, this)
            }
        }
    }

    override fun onClick(userName: String) = router.routeFriendsPosts(userName)

    override fun onLongPress(userName: String) {
        alert {
            titleResource = R.string.remove_friend_titlecase
            message = getString(R.string.remove_friend_confirm_message_template, userName)
            negativeButton(R.string.cancel_titlecase) { /* do nothing */ }
            positiveButton(R.string.confirm_titlecase) {
                withIOProgressDialog {
                    database.removeUser(userName)
                    main { updateFriendsList() }
                }
            }
        }.show()
    }
}