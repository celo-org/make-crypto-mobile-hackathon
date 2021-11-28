<template>
  <main>
    <Header :connected="walletConnected" @connectToWallet="connectToWallet()" />
    <Banner />
    <Hero
      tag="Decentralized"
      excerpt="We are building a fully decentralized medical fundraising platform built using Celo Blockchain technology"
      title="Blockchain Technology that saves Lives."
      image="https://images.pexels.com/photos/5858855/pexels-photo-5858855.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      id="about"
    />
    <ItemHeader
      id="campaigns"
      title="Campaigns"
      tagline="We are fully decentralized and the funds donated goes directly to the fundraisers."
    />
    <Hero
      tag="Mission & Vision"
      excerpt="Our mission is to reduce the number of death due to financial limitation and provide worldclass healthcare to everyone everywhere. Our vision is to be world's leading charity platform and reduce death due to inability to pay for treatment by 50% in the next 5 years."
      title="World's Leading Charity Organization."
      image="https://images.pexels.com/photos/4167542/pexels-photo-4167542.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      id="mission"
    />
    <ListItem :items="items" />
    <Footer />
  </main>
</template>
<script>
import Banner from '~/components/widgets/Banner.vue'
import Header from '~/components/headers/Header.vue'
import ListItem from '~/components/widgets/ListItem.vue'
import Hero from '~/components/widgets/Hero.vue'
import Footer from '~/components/footers/Footer.vue'
import ItemHeader from '~/components/widgets/ItemHeader.vue'

import CeloMixin from '~/mixins/celo.js'

export default {
  mixins: [CeloMixin],
  components: { ListItem, Hero, Footer, Header, Banner, ItemHeader },
  data() {
    return {
      items: [],
    }
  },
  async mounted() {
    try {
      await this.connectToWallet()

      await this.getWalletBalance()

      this.walletConnected = true

      await this.getAllCampaign()
    } catch (error) {
      console.log(error)
    }
  },
}
</script>