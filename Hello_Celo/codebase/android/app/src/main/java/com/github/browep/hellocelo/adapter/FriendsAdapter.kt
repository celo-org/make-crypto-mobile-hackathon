package com.github.browep.hellocelo.adapter

import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.github.browep.hellocelo.R
import com.github.browep.hellocelo.layoutInflater
import com.github.browep.hellocelo.v

/**
 * adapter for list of friends
 */
class FriendsAdapter(private val userNames: List<String>, private val delegate: Delegate) : RecyclerView.Adapter<FriendsAdapter.ViewHolder>() {

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val tvUserName = itemView.v<TextView>(R.id.tv_name)

        init {
            itemView.setOnClickListener { view -> (view.tag as? String)?.let { delegate.onClick(it) } }
            itemView.setOnLongClickListener { view ->
                (view.tag as? String)?.let { delegate.onLongPress(it) }
                true
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder = ViewHolder(parent.context.layoutInflater.inflate(R.layout.item_friend, parent, false))

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val userName = userNames[position]
        holder.tvUserName.text = userName
        holder.itemView.tag = userName
    }

    override fun getItemCount(): Int = userNames.size

    interface Delegate {
        fun onClick(userName: String)
        fun onLongPress(userName: String)
    }
}