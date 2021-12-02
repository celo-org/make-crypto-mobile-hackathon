package com.github.browep.hellocelo

import com.github.browep.hellocelo.blockchain.generateSeed
import com.github.browep.hellocelo.blockchain.privKeyFromSeed
import org.junit.Assert
import org.junit.Test

class EthUtilsTest {

    @Test
    fun `test mnemonic generation`() {
        val seed1 = generateSeed()
        val seed2 = generateSeed()
        Assert.assertNotSame(seed1, seed2)
    }

    @Test
    fun `test derivation`() {
        mapOf(
            "spare access pluck proof talk pipe verb reveal impose slight degree food" to "0xc5cbe6a50195670ae433e07d9c90d1ab3e962e99e02b2651abad3b2139d8a704",
            "dinosaur debate staff grace unable digital sustain begin source vivid cover fan" to "0x7ef13f7fd02f843df5d52e9d07344c4052c84e8008915ff5753b14f534edbdd1",
            "fat exchange estate clip normal awake deal scissors health audit lesson roast" to "0x187f1de993abec2c5a7ad7d8171f38058dcb0e42058bed01142c87b924b6ad7d"
        ).forEach { (seedStr, expectedPrivKey) ->
            val seed = seedStr.split(" ")
            val privKey = privKeyFromSeed(seed)
            Assert.assertEquals(expectedPrivKey, privKey)
        }
    }
}