<template>
  <main>
    <Header @connectToWallet="connectToWallet()" />
    <Banner />
    <Hero />
    <ItemHeader
      title="Campaigns"
      tagline="We are fully decentralized and the funds donated goes directly to the fundraisers."
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
  mixins: [CeloMixin,],
  components: { ListItem, Hero, Footer, Header, Banner, ItemHeader },
  data() {
    return {
      items: []
    }
  },
  async mounted() {
      try {
  
        await this.connectToWallet()
  
        await this.getWalletBalance()

        await this.getAllCampaign()
  
      } catch (error) {
  
        console.log(error)
  
      }
    },
}
</script>