<template>
  <main>
    <Header :connected="walletConnected" @connectToWallet="connectToWallet()" />

    <!-- Section 1 -->
    <section class="w-full px-8 py-16 bg-gray-100 xl:px-8">
      <div class="max-w-5xl mx-auto">
        <div class="flex flex-col md:flex-row">
          <div class="w-full space-y-5 md:w-3/5 md:pr-16">
            <p class="font-medium text-blue-500 uppercase">
              There is a hope for you!
            </p>
            <h2
              class="
                text-2xl
                font-extrabold
                leading-none
                text-black
                sm:text-3xl
                md:text-5xl
              "
            >
              Every Live Matter!
            </h2>
            <p class="text-xl text-gray-600 md:pr-16">
              Raise funds for medical infrastructures, patient's treatment, and
              medical outreach in a fully transparent and decentralized way.
            </p>
          </div>

          <div class="w-full mt-16 md:mt-0 md:w-1/3">
            <div
              class="
                relative
                z-10
                h-auto
                p-8
                py-10
                overflow-hidden
                bg-white
                border-b-2 border-gray-300
                rounded-lg
                shadow-2xl
                px-7
              "
            >
              <h3 class="mb-6 text-2xl font-medium text-center">
                Start a Campaign
              </h3>
              <label for="email">Email</label>
              <input
                id="email"
                type="text"
                v-model="email"
                class="
                  block
                  w-full
                  px-4
                  py-3
                  mb-4
                  border border-2 border-transparent border-gray-200
                  rounded-lg
                  focus:ring focus:ring-blue-500 focus:outline-none
                "
                placeholder="Contact Email"
              />

              <label class="error" v-if="errors.title" for="title">{{
                errors.title
              }}</label>
              <label v-else for="title">Short Title</label>
              <input
                id="title"
                type="text"
                v-model="title"
                class="
                  block
                  w-full
                  px-4
                  py-3
                  mb-4
                  border border-2 border-transparent border-gray-200
                  rounded-lg
                  focus:ring focus:ring-blue-500 focus:outline-none
                "
                placeholder="Project Title"
              />
              <label class="error" v-if="errors.goal" for="goal">{{
                errors.goal
              }}</label>
              <label v-else for="goal"
                >How much do you need? (in Celo USD)</label
              >

              <input
                id="goal"
                type="number"
                v-model="goal"
                class="
                  block
                  w-full
                  px-4
                  py-3
                  mb-4
                  border border-2 border-transparent border-gray-200
                  rounded-lg
                  focus:ring focus:ring-blue-500 focus:outline-none
                "
                placeholder="goal"
              />
              <label class="error" v-if="errors.end_time" for="end_time">{{
                errors.end_time
              }}</label>

              <label v-else for="end_time"
                >When is the deadline to raise the fund?</label
              >

              <input
                id="end_time"
                type="date"
                v-model="end_time"
                class="
                  block
                  w-full
                  px-4
                  py-3
                  mb-4
                  border border-2 border-transparent border-gray-200
                  rounded-lg
                  focus:ring focus:ring-blue-500 focus:outline-none
                "
                placeholder="end_time"
              />

              <label class="error" v-if="errors.images" for="images">{{
                errors.images
              }}</label>

              <label v-else for="images"
                >Paste exactly 5 image URLs e.g. Medical report etc.</label
              >

              <div class="flex">
                <input
                  type="text"
                  v-model="image1"
                  class="
                    block
                    w-1/2
                    mr-2
                    px-4
                    py-3
                    mb-4
                    border border-2 border-transparent border-gray-200
                    rounded-lg
                    focus:ring focus:ring-blue-500 focus:outline-none
                  "
                  placeholder="image 1"
                />

                <input
                  type="text"
                  v-model="image2"
                  class="
                    block
                    w-1/2
                    mr-2
                    px-4
                    py-3
                    mb-4
                    border border-2 border-transparent border-gray-200
                    rounded-lg
                    focus:ring focus:ring-blue-500 focus:outline-none
                  "
                  placeholder="image 2"
                />

                <input
                  type="text"
                  v-model="image3"
                  class="
                    block
                    w-1/2
                    mr-2
                    px-4
                    py-3
                    mb-4
                    border border-2 border-transparent border-gray-200
                    rounded-lg
                    focus:ring focus:ring-blue-500 focus:outline-none
                  "
                  placeholder="image 3"
                />

                <input
                  type="text"
                  v-model="image4"
                  class="
                    block
                    w-1/2
                    mr-2
                    px-4
                    py-3
                    mb-4
                    border border-2 border-transparent border-gray-200
                    rounded-lg
                    focus:ring focus:ring-blue-500 focus:outline-none
                  "
                  placeholder="image 4"
                />

                <input
                  type="text"
                  v-model="image5"
                  class="
                    block
                    w-1/2
                    mr-2
                    px-4
                    py-3
                    mb-4
                    border border-2 border-transparent border-gray-200
                    rounded-lg
                    focus:ring focus:ring-blue-500 focus:outline-none
                  "
                  placeholder="image 5"
                />
              </div>

              <label class="error" v-if="errors.tags" for="tags">{{
                errors.tags
              }}</label>

              <label v-else for="tags">Select Exactly 2 tags</label>

              <div class="my-3">
                <div
                  v-for="tag in [
                    'general',
                    'treatment',
                    'infrastructure',
                    'outreach',
                  ]"
                  :key="tag"
                  @click="selectTagHandler(tag)"
                  :class="{
                    'bg-white text-grey-200 border-2': !tags.includes(tag),
                    'text-white bg-green-500': tags.includes(tag),
                  }"
                  class="
                    items-center
                    px-3
                    py-2
                    mr-2
                    leading-none
                    rounded
                    text-xs
                    font-medium
                    uppercase
                    inline-block
                    tag
                    mt-3
                  "
                >
                  <span>{{ tag }}</span>
                </div>
              </div>
              <label
                class="error"
                v-if="errors.description"
                for="description"
                >{{ errors.description }}</label
              >

              <label v-else for="description">Why do you need the funds?</label>
              <textarea
                v-model="description"
                class="border-2 border-gray-200 w-full h-32"
              ></textarea>
              <div class="my-10"></div>
              <div class="block mt-2">
                <button
                  @click="submit()"
                  class="
                    w-full
                    px-3
                    py-4
                    font-medium
                    text-white
                    bg-blue-600
                    rounded-lg
                  "
                >
                  I'm done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </main>
</template>

<script>
import Header from '~/components/headers/Header.vue'
import Footer from '~/components/footers/Footer.vue'

import CeloMixin from '~/mixins/celo.js'

import Swal from 'sweetalert2'

export default {
  components: { Header, Footer },
  mixins: [CeloMixin],
  async mounted() {
    try {
      await this.connectToWallet()

      await this.getWalletBalance()
            this.walletConnected = true

    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      tags: [],
      email: '',
      title: '',
      goal: '',
      end_time: '',
      images: [],
      image1: null,
      image2: null,
      image3: null,
      image4: null,
      image5: null,
      description: '',
      errors: {
        email: null,
        title: null,
        goal: null,
        end_time: null,
        images: null,
        description: null,
      },
    }
  },
  methods: {
    uploadImagesHandler(event) {
      this.images = event.target.files
    },
    selectTagHandler(value) {
      const tags = this.tags

      if (tags.includes(value)) {
        this.tags = tags.filter(function (item) {
          return item != value
        })
      } else {
        if (tags.length >= 2) {
          this.tags.shift()
        }
        this.tags.push(value)
      }
    },
    async submit() {
      this.images = [
        this.image1,
        this.image2,
        this.image3,
        this.image4,
        this.image5,
      ]

      const email = this.email

      const title = this.title

      const goal = this.goal

      const end_time = this.end_time

      const images = this.images

      const description = this.description

      const tags = this.tags

      let error = []

      if (title.length > 10 && title.length < 100) {
        this.errors.title = null
      } else {
        this.errors.title = 'title must be between 10 and 100 characters'
        error.push(1)
      }

      if (goal.length > 0 && title.length < 1000000) {
        this.errors.goal = null
      } else {
        this.errors.goal = 'goal must be between 0 and 1000000'
        error.push(1)
      }

      if (tags.length == 2) {
        this.errors.tags = null
      } else {
        this.errors.tags = 'use exactly 2 tags'
        error.push(1)
      }

      images.filter((n) => n)

      if (images.length == 5) {
        this.errors.images = null
      } else {
        this.errors.images = 'upload exactly 5 images'
        error.push(1)
      }

      if (description.length > 50 && description.length < 1000) {
        this.errors.description = null
      } else {
        this.errors.description =
          'description should be between 50 and 1000 characters'
        error.push(1)
      }

      if (error.length > 0) {
        return false
      }

      const timeConverter = (date) => Date.parse(date)

      console.log(timeConverter(end_time))

      try {
        await this.startCampaign(
          title,
          images,
          tags,
          description,
          goal,
          timeConverter(end_time)
        )

        await Swal.fire(
          'Congratulations!',
          'You just made an attempt to save a live. We will send you a message once you have been approved!',
          'success'
        )
      } catch (error) {
        await this.startCampaign(
          title,
          images,
          tags,
          description,
          goal,
          timeConverter(end_time)
        )

        await Swal.fire('Oops! An error occurred', error, 'error')
      }
    },
  },
}
</script>

<style scoped>
label {
  color: #10b981;
}

.tag {
  cursor: pointer;
}

.error {
  color: red !important;
}

.tag:hover {
  color: white;
  background-color: #10b981;
  border: none;
}
</style>