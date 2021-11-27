<template>
  <main>
    <Header @connectToWallet="connectToWallet()" />
    <SingleItemBanner
      :title="item.title"
      :tags="item.tags"
      :excerpt="item.excerpt"
      :description="item.description"
      :goal="item.goal"
      :raised="item.raised"
      :supporters="item.supporters"
      :end_time="item.end_time"
      @supportCampaign="supportCampaign($route.params.id, 10)"
    />
    <section class="w-full bg-white pt-7 pb-7 md:pt-20 md:pb-24">
      <div
        class="
          box-border
          flex flex-col
          px-8
          mx-auto
          leading-6
          text-black
          border-0 border-gray-300 border-solid
          md:flex-row
          max-w-7xl
          lg:px-16
        "
      >
        <!-- Image -->
        <div
          class="
            box-border
            relative
            w-full
            max-w-md
            px-4
            mt-5
            mb-4
            -ml-5
            bg-no-repeat bg-contain
            border-solid
            md:ml-0 md:mt-0 md:max-w-none
            lg:mb-0
            md:w-1/2
            xl:pl-10
          "
        >
          <div class="container mx-auto">
            <div
              class="
                grid-cols-2
                p-2
                space-y-2
                lg:space-y-0 lg:grid lg:gap-3 lg:grid-rows-3
              "
            >
              <div class="w-full col-span-2 row-span-2 rounded">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80"
                  alt="image"
                />
              </div>
              <div class="w-full rounded">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80"
                  alt="image"
                />
              </div>
              <div class="w-full rounded">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80"
                  alt="image"
                />
              </div>
              <div class="w-full rounded">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80"
                  alt="image"
                />
              </div>
              <div class="w-full rounded">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80"
                  alt="image"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div
          class="
            box-border
            order-first
            w-full
            text-black
            border-solid
            md:w-1/2 md:pl-10 md:order-none
          "
        >
          <p
            class="
              pt-4
              pb-8
              m-0
              leading-7
              text-gray-700
              border-0 border-gray-300
              sm:pr-12
              xl:pr-32
              lg:text-lg
            "
          >
            {{ item.description }}
          </p>
        </div>
        <!-- End  Content -->
      </div>
    </section>

    <Footer />
  </main>
</template>
<script>
import Header from '~/components/headers/Header.vue'
import Footer from '~/components/footers/Footer.vue'
import SingleItemBanner from '~/components/widgets/SingleItemBanner.vue'
import ItemHeader from '~/components/widgets/ItemHeader.vue'

import CeloMixin from '~/mixins/celo.js'

export default {
  mixins: [CeloMixin],
  components: { Footer, Header, SingleItemBanner, ItemHeader },
  data() {
    return {
      item: {},
    }
  },
  async mounted() {
    try {
      await this.connectToWallet()

      await this.getWalletBalance()

      this.item = await this.fetchCampaignFull(this.$route.params.id)
    } catch (error) {
      console.log(error)
    }
  },
}
</script>
