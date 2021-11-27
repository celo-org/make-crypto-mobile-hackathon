<template>
  <div
    class="
      flex flex-col
      items-start
      col-span-12
      space-y-3
      sm:col-span-6
      xl:col-span-4
    "
  >
    <nuxt-link :to="`/campaigns/${index}/`" class="block">
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
        src="https://cdn.devdojo.com/images/may2021/fruit.jpg"
      />
    </nuxt-link>
    <div class="flex"><Tag v-for="tag in tags" :key="tag" :value="tag" /></div>
    <h2 class="text-lg font-bold sm:text-xl md:text-2xl">
      <a href="#_">{{ title }}</a>
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