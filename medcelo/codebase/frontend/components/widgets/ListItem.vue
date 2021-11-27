<template>
  <section class="bg-white">
    <div
      class="
        w-full
        px-5
        py-6
        mx-auto
        space-y-5
        sm:py-8
        md:py-12
        sm:space-y-8
        md:space-y-16
        max-w-7xl
      "
    >
      <div class="flex grid grid-cols-12 pb-10 sm:px-5 gap-x-8 gap-y-16">
        <Card
          v-for="item in items"
          :key="item.index"
          :index="item.index"
          :title="item.title"
          :excerpt="item.excerpt"
          :tags="item.tags"
          :fundraiser="item.fundraiser"
          :goal="item.goal"
          :raised="item.raised"
          :end_time="item.end_time"
        />
      </div>
    </div>
  </section>
</template>
<script>
import Card from '../cards/Card'

export default {
  name: 'ListItem',
  components: { Card },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>
