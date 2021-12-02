package com.github.browep.hellocelo.blockchain

import org.bouncycastle.util.encoders.Hex
import org.bouncycastle.util.encoders.HexEncoder
import org.web3j.crypto.MnemonicUtils
import kotlin.random.Random.Default.nextBytes
import org.web3j.crypto.Bip32ECKeyPair

import org.web3j.crypto.Bip32ECKeyPair.HARDENED_BIT

fun generateSeed(): List<String> {

    val byteArray = nextBytes(16)
    val words = MnemonicUtils.generateMnemonic(byteArray)

    return words.split(" ")
}

/**
 * return the 0x prefixed private key from
 */
fun privKeyFromSeed(words: List<String>) : String {
    val masterKeypair = Bip32ECKeyPair.generateKeyPair(MnemonicUtils.generateSeed(words.joinToString(" "), null))
    val path = intArrayOf(44 or HARDENED_BIT, 60 or HARDENED_BIT, 0 or HARDENED_BIT, 0, 0)
    val x = Bip32ECKeyPair.deriveKeyPair(masterKeypair, path)
    return "0x" + Hex.toHexString(x.privateKeyBytes33).substring(2..65)
}