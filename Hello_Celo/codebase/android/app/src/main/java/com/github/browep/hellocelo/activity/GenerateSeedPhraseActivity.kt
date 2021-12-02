package com.github.browep.hellocelo.activity

import android.app.Activity
import android.os.Bundle
import com.github.browep.hellocelo.R

/**
 * help a user generate a seed phrase
 */
class GenerateSeedPhraseActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_generate_seed_phrase)
    }
}