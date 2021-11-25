<template>
  <div
    :class="`
      bg-${color}-500
      flex
      items-center
      px-3
      py-2
      mr-2
      leading-none
      rounded-full
      text-xs
      font-medium
      uppercase
      text-white
      inline-block
    `"
  >
    <span>{{ value }}</span>
  </div>
</template>


<script>
export default {
    name: "Tag",
    props: {
        value: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            default: 'green',
        }
    }
}
</script>