package com.github.browep.hellocelo.adapter

import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.github.browep.hellocelo.R
import com.github.browep.hellocelo.activity.BaseActivity
import com.github.browep.hellocelo.activity.UserPostsDetailActivity
import com.github.browep.hellocelo.model.Post
import com.github.browep.hellocelo.model.Transformer
import com.github.browep.hellocelo.horizStartActivity
import com.github.browep.hellocelo.layoutInflater
import com.github.browep.hellocelo.model.User
import com.github.browep.hellocelo.toColor
import com.github.browep.hellocelo.v
import java.util.*
import org.jetbrains.anko.backgroundDrawable

class UserPostsAdapter(
    private val posts: List<Post>,
    users: List<User>,
    private val delegate: Delegate
) : RecyclerView.Adapter<UserPostsAdapter.ViewHolder>() {

    interface Delegate {
        fun onClick(post: Post)
    }

    private val userMap: Map<String, User>

    init {
        userMap = mutableMapOf()
        userMap += users.map { it.userName to it }
    }

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val ivUserIcon = itemView.v<ImageView>(R.id.iv_user_icon)
        val tvUserName = itemView.v<TextView>(R.id.tv_username)
        val tvTimestamp = itemView.v<TextView>(R.id.tv_timestamp)
        val tvMessage = itemView.v<TextView>(R.id.tv_message)
        val ivPostImage = itemView.v<ImageView>(R.id.iv_post_image)

        init {
            itemView.setOnClickListener {
                (it.tag as? Post)?.let { post ->
                    delegate.onClick(post)
                }
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder = ViewHolder(parent.context.layoutInflater.inflate(R.layout.item_user_post, parent, false))

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val post = posts[position]
        holder.tvUserName.text = post.userName
        holder.tvMessage.text = post.message
        holder.tvTimestamp.text = Date(post.timestamp).toString()

        holder.ivPostImage.visibility = View.GONE
        post.metaData?.let { metadataStr ->
            val postMetaData = Transformer.deserializePostMetaData(metadataStr)
            postMetaData.imageUrl?.let {
                Glide.with(holder.ivPostImage)
                    .load(it)
                    .into(holder.ivPostImage)

                holder.ivPostImage.visibility = View.VISIBLE
            }

        }

        userMap[post.userName]?.profilePicUrl?.let {
            holder.ivUserIcon.setImageDrawable(null)
            holder.ivUserIcon.backgroundDrawable = null
            Glide.with(holder.ivUserIcon)
                .load(it)
                .into(holder.ivUserIcon)
        } ?: run {
            holder.ivUserIcon.setImageDrawable(null)
            holder.ivUserIcon.setBackgroundColor(post.userName.toColor())
        }

        holder.itemView.tag = post
    }

    override fun getItemCount(): Int = posts.size
}