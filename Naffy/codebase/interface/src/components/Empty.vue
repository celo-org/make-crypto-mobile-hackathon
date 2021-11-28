<template>
  <p class="text-light text-center">{{ msg }}</p>
</template>

<script>
export default {
  props: {
    msg: String,
  },
}
</script>

<style scoped>
img {
  height: 100px !important;
  width: 100px !important;
}
</style>
