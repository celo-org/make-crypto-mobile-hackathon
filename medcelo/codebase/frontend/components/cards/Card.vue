<template>
  <div
    class="
      flex flex-col
      items-start
      col-span-12
      max-width-56
      space-y-3
      sm:col-span-6
      xl:col-span-4
    "
  >
    <nuxt-link :to="`/campaign/${index}/`" class="block">
      <img
        class="
          object-cover
          w-full
          mb-2
          overflow-hidden
          rounded-lg
          shadow-sm
          max-h-56
        "
        :src="images[0]"
      />
    </nuxt-link>
    <div class="flex"><Tag v-for="tag in tags" :key="tag" :value="tag" /></div>
    <h2 class="text-lg font-bold sm:text-xl md:text-2xl">
      <a class="title" :href="`/campaign/${index}`">{{ title }}</a>
    </h2>
    <p class="text-sm text-gray-500">
      {{ excerpt }}
    </p>
    <p class="pt-2 text-xs font-medium">
      <a href="#_" class="mr-1 underline">{{ fundraiser }}</a> ·
      <span class="mx-1">{{ end_time }}</span> ·
      <span class="mx-1 text-green-300">${{ raised }}</span> of
      <span class="mx-1 text-green-500">${{ goal }}</span> ·
    </p>
  </div>
</template>

<script>
import Tag from '../tags/Tag'

export default {
  name: 'Card',
  components: { Tag },
  props: {
    index: {
      type: Number,
      required: true,
    },
    tags: {
      type: Array,
    },
    images: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    fundraiser: {
      type: String,
      required: true,
    },
    end_time: {
      type: String,
      required: true,
    },
    raised: {
      type: Number,
      required: true,
    },
    goal: {
      type: Number,
      required: true,
    },
  },
}
</script>
<style scoped>
.title {
  word-break: break-all;
  word-wrap: break-word;
}
</style>