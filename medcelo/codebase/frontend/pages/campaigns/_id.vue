<template>
  <main>
    <Header />
    <SingleItemBanner
      title="lorem ipsum dolor dolor dolor lorem ipsum ipsum ipsum ipsum ipsum"
      excerpt="lorem ipsum dolor dolor dolor lorem ipsum ipsum ipsum ipsum ipsum lorem ipsum dolor dolor dolor lorem ipsum ipsum ipsum ipsum ipsum"
    />
    <!-- Section 1 -->
    <section class="w-full bg-white pt-7 pb-7 md:pt-20 md:pb-24">
      <div
        class="
          box-border
          flex flex-col
          items-center
          content-center
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
            text-center
            bg-no-repeat bg-contain
            border-solid
            md:ml-0 md:mt-0 md:max-w-none
            lg:mb-0
            md:w-1/2
            xl:pl-10
          "
        >
          <img
            src="https://cdn.devdojo.com/images/december2020/productivity.png"
            class="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20"
          />
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
          <h2
            class="
              m-0
              text-xl
              font-semibold
              leading-tight
              border-0 border-gray-300
              lg:text-3xl
              md:text-2xl
            "
          >
            Boost Productivity
          </h2>
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
            Build an atmosphere that creates productivity in your organization
            and your company culture.
          </p>
          <ul class="p-0 m-0 leading-6 border-0 border-gray-300">
            <li
              class="
                box-border
                relative
                py-1
                pl-0
                text-left text-gray-500
                border-solid
              "
            >
              <span
                class="
                  inline-flex
                  items-center
                  justify-center
                  w-6
                  h-6
                  mr-2
                  text-white
                  bg-yellow-300
                  rounded-full
                "
                ><span class="text-sm font-bold">✓</span></span
              >
              Maximize productivity and growth
            </li>
            <li
              class="
                box-border
                relative
                py-1
                pl-0
                text-left text-gray-500
                border-solid
              "
            >
              <span
                class="
                  inline-flex
                  items-center
                  justify-center
                  w-6
                  h-6
                  mr-2
                  text-white
                  bg-yellow-300
                  rounded-full
                "
                ><span class="text-sm font-bold">✓</span></span
              >
              Speed past your competition
            </li>
            <li
              class="
                box-border
                relative
                py-1
                pl-0
                text-left text-gray-500
                border-solid
              "
            >
              <span
                class="
                  inline-flex
                  items-center
                  justify-center
                  w-6
                  h-6
                  mr-2
                  text-white
                  bg-yellow-300
                  rounded-full
                "
                ><span class="text-sm font-bold">✓</span></span
              >
              Learn the top techniques
            </li>
          </ul>
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

export default {
  components: { Footer, Header, SingleItemBanner, ItemHeader },
}
</script>
