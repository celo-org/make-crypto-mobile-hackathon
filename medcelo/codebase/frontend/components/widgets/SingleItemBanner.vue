<template>
  <section class="py-20 bg-gray-50">
    <div class="  w-full
        px-5
        py-6
        mx-auto
        space-y-5
        sm:py-8
        md:py-12
        sm:space-y-8
        md:space-y-16
        max-w-7xl">
      <div class="flex flex-wrap items-center -mx-3">
        <div class="order-1 w-full px-3 lg:w-1/2 lg:order-0">
          <div class="w-full lg:max-w-md">
            <h2
              class="
                mb-4
                text-3xl
                font-bold
                leading-tight
                tracking-tight
                sm:text-4xl
                font-heading
              "
            >
              {{ title }}
            </h2>
            <p class="mb-4 font-medium tracking-tight text-gray-400 xl:mb-6">
              {{ excerpt }}
            </p>
          </div>
          <div class="relative flex flex-col sm:flex-row sm:space-x-4">
            <button
              @click="supportCampaign()"
              class="
                flex
                items-center
                w-full
                px-6
                py-3
                mb-3
                text-lg text-white
                bg-red-600
                rounded-md
                sm:mb-0
                hover:bg-red-700
                sm:w-auto
              "
            >
              Donate
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 ml-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <a
              href="#_"
              class="
                flex
                items-center
                px-6
                py-3
                text-gray-500
                bg-gray-100
                rounded-md
                hover:bg-gray-200 hover:text-gray-600
              "
            >
              Learn More
            </a>
          </div>
          <p class="mt-4 font-bold text-xl tracking-tight text-dark xl:mb-6">
              raised ${{ raised }} of ${{  goal }}
            </p>
        </div>
        <div class="w-full px-3 mb-12 lg:w-1/2 order-0 lg:order-1 lg:mb-0">
          <img
            class="mx-auto sm:max-w-sm lg:max-w-full"
            src="https://cdn.devdojo.com/images/november2020/feature-graphic.png"
            alt="feature image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SingleItemBanner',
  props: {
    title: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    raised: {
      type: Number,
      required: true,
    },
    goal: {
      type: Number,
      required: true,
    }
  },
  methods: {
    supportCampaign: function() {
      this.$emit('supportCampaign')
    }
  }
}
</script>

<style>
</style>