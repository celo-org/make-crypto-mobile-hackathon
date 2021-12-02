package com.github.browep.hellocelo.activity

import android.os.Bundle
import android.view.MenuItem
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.core.view.GravityCompat
import androidx.drawerlayout.widget.DrawerLayout
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.bumptech.glide.Glide
import com.github.browep.hellocelo.R
import com.github.browep.hellocelo.Router
import com.github.browep.hellocelo.USERNAME
import com.github.browep.hellocelo.adapter.UserPostsAdapter
import com.github.browep.hellocelo.blockchainService
import com.github.browep.hellocelo.cloudService
import com.github.browep.hellocelo.database
import com.github.browep.hellocelo.datastore
import com.github.browep.hellocelo.horizStartActivity
import com.github.browep.hellocelo.model.Post
import com.github.browep.hellocelo.model.Transformer
import com.github.browep.hellocelo.onClick
import com.github.browep.hellocelo.toColor
import com.github.browep.hellocelo.v
import com.github.browep.hellocelo.work.FetchUserUpdateWork
import com.google.android.material.floatingactionbutton.FloatingActionButton
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.joinAll
import kotlinx.coroutines.launch
import org.jetbrains.anko.intentFor

class MainActivity : BaseActivity(), UserPostsAdapter.Delegate {

    lateinit var drawer: DrawerLayout

    val recyclerView by lazy { v<RecyclerView>(R.id.recycler_view) }
    val fab by lazy { v<FloatingActionButton>(R.id.fab) }
    val refreshLayout by lazy { v<SwipeRefreshLayout>(R.id.refresh) }

    val router = Router(this)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setSupportActionBar(findViewById(R.id.toolbar))

        drawer = findViewById(R.id.drawer)
        val drawerToggle = ActionBarDrawerToggle(this, drawer, R.string.open, R.string.close)
        drawer.addDrawerListener(drawerToggle)
        drawerToggle.syncState()

        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        recyclerView.layoutManager = LinearLayoutManager(this)

        fab.setOnClickListener {
            if (datastore.get(USERNAME) == null) router.routeSetupProfile() else router.routeAuthorPost()
        }

        refreshLayout.setOnRefreshListener {
            io {

                try {
                    val userNames = database.getUserNames()
                    val jobs = mutableListOf<Job>()
                    for (userName in userNames) {
                        jobs += coroutineScope.launch(Dispatchers.IO) {
                            val ret = FetchUserUpdateWork(blockchainService, cloudService, database, userName).exec()
                            logger.debug("fetched updates for ${userName}, ret=$ret")
                        }

                        jobs.joinAll()
                    }

                    main {
                        updateAdapter()
                        refreshLayout.isRefreshing = false
                    }
                } catch (e: Exception) {
                    logger.error(e.message, e)
                    main {
                        updateAdapter()
                        refreshLayout.isRefreshing = false
                    }

                }
            }
        }
    }

    private fun setupNavMenu() {

        onClick(R.id.tv_friends) {
            horizStartActivity(intentFor<FriendsActivity>())
            drawer.closeDrawer(GravityCompat.START)
        }

        onClick(R.id.tv_profile) {
            if (datastore.get(USERNAME) == null) router.routeSetupProfile() else router.routeEditProfile()
        }

        val vgHero = v<ViewGroup>(R.id.vg_hero)

        (datastore.get(USERNAME) as? String)?.let { userName ->
            database.getUser(userName)?.let { (_, userMetaData) ->
                v<TextView>(R.id.tv_username).text = userName
                v<ImageView>(R.id.iv_hero_icon).apply {
                    val userObj = Transformer.deserializeUserMetaData(userName, userMetaData)
                    userObj.profilePicUrl?.let { url ->
                        Glide.with(this)
                            .load(url)
                            .into(this)
                    } ?: run {
                        setBackgroundColor(userName.toColor())
                    }

                }
            } ?: run { vgHero.visibility = View.GONE }

        } ?: run { vgHero.visibility = View.GONE }

    }


    override fun onResume() {
        super.onResume()

        updateAdapter()

        setupNavMenu()

    }

    private fun updateAdapter() {
        io {
    //            val posts = database.getPosts()
            val posts = database.getPosts(filterOutUserName = datastore.get(USERNAME) as String?)
            val users = database.getUsers()
            main {
                recyclerView.adapter = UserPostsAdapter(posts, users, this)
            }
        }
    }

    override fun onClick(post: Post) = router.routeFriendsPosts(post.userName)

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            android.R.id.home -> {
                drawer.openDrawer(GravityCompat.START)
                true
            }
            else -> super.onOptionsItemSelected(item)
        }
    }

    override fun onBackPressed() {
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START)
        } else {
            super.onBackPressed()
        }
    }

}