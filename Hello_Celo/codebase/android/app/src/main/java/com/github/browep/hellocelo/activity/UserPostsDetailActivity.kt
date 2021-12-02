package com.github.browep.hellocelo.activity

import android.content.Context
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.github.browep.hellocelo.R
import com.github.browep.hellocelo.adapter.UserPostsAdapter
import com.github.browep.hellocelo.database
import com.github.browep.hellocelo.LoggerCompanion
import com.github.browep.hellocelo.USERNAME
import com.github.browep.hellocelo.intentParam
import com.github.browep.hellocelo.model.Post
import com.github.browep.hellocelo.setupActionBarArrowWithTitle
import com.github.browep.hellocelo.v
import org.jetbrains.anko.intentFor

/**
 * show a list of a specific user's posts
 */
class UserPostsDetailActivity : HorizontalTransitionActivity(), UserPostsAdapter.Delegate {

    private val recyclerView by lazy { v<RecyclerView>(R.id.recycler_view) }

    private val userName by lazy { intentParam<String>(USERNAME) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_user_posts_detail)
        setupActionBarArrowWithTitle(userName)
        recyclerView.layoutManager = LinearLayoutManager(this)
    }

    override fun onResume() {
        super.onResume()

        io {
            val posts = database.getPosts(userName, limit = 1000)
            val users = database.getUsers()
            main {
                recyclerView.adapter = UserPostsAdapter(posts, users, this)
            }
        }

    }

    companion object : LoggerCompanion(UserPostsDetailActivity::class) {
        fun intent(context: Context, userName: String) = context.intentFor<UserPostsDetailActivity>(
            USERNAME to userName
        )
    }

    override fun onClick(post: Post) {
        // do nothing for a click
    }

}