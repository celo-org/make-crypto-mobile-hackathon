<template>
  <main id="app">
    <Topbar name="Naffy" />
    <div class="container">
      <router-view />
    </div>
  </main>
</template>

<script>
import Topbar from "@/components/Topbar.vue"

export default {
  components: {
    Topbar,
  },
}
</script>
