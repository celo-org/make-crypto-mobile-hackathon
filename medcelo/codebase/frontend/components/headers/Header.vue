<template>
  <!-- Section 1 -->
  <section class="w-full px-8 text-gray-700 bg-white">
    <div
      class="
        container
        flex flex-col flex-wrap
        items-center
        justify-between
        py-5
        mx-auto
        md:flex-row
        max-w-7xl
      "
    >
      <div class="relative flex flex-col md:flex-row">
        <a
          href="/"
          class="
            flex
            items-center
            mb-5
            font-medium
            text-gray-900
            lg:w-auto lg:items-center lg:justify-center
            md:mb-0
          "
        >
          <span
            class="
              mx-auto
              text-xl
              font-black
              leading-none
              text-gray-900
              select-none
            "
            >MedCelo<span class="text-indigo-600">.</span></span
          >
        </a>
        <nav
          class="
            flex flex-wrap
            items-center
            mb-5
            text-base
            md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200
          "
        >
          <a
            href="#about"
            class="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
            >About</a
          >
          <a
            href="#campaigns"
            class="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
            >Campaigns</a
          >
          <a
            href="#team"
            class="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
            >Team</a
          >
          <a
            href="#vision"
            class="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
            >Mission &amp; Vision</a
          >
        </nav>
      </div>

      <div class="inline-flex items-center ml-5 space-x-6 lg:justify-end">
        <a
          href="/campaign/start"
          class="
            text-base
            font-medium
            leading-6
            text-gray-600
            whitespace-no-wrap
            transition
            duration-150
            ease-in-out
            hover:text-gray-900
          "
        >
          Start a Campaign
        </a>
        <a
          @click="connectToWallet()"
          class="
            inline-flex
            items-center
            justify-center
            px-4
            py-2
            text-base
            font-medium
            leading-6
            text-white
            whitespace-no-wrap
            bg-green-500
            border border-transparent
            rounded-md
            shadow-sm
            hover:bg-green-400
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-green-400
          "
        >
          Connect Wallet
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    connectToWallet() {
      this.$emit('connectToWallet')
    }
  }
}
</script>