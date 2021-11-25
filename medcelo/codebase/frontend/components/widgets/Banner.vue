<template>
  <section class="py-32 bg-white md:px-0">
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
    <div class="flex flex-wrap items-center sm:-mx-3">
      <div class="w-full md:w-1/2">
        <div class="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
          <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
            <span class="block xl:inline pb-3">Everyone Deserves to Live.</span>
            <span class="block text-green-600 xl:inline">Tell Your Story Now!</span>
          </h1>
          <p class="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">Start raising funds for medical infrastructures, patient's treatment, and medical outreach.</p>
          <div class="relative flex flex-col sm:flex-row sm:space-x-4">
            <a href="#_" class="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-green-600 rounded-md sm:mb-0 hover:bg-green-700 sm:w-auto">
              Start Campaign
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <a href="#_" class="flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600">
              Learn More
            </a>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/2">
        <div class="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
            <img src="https://cdn.devdojo.com/images/november2020/hero-image.jpeg">
          </div>
      </div>
    </div>
  </div>
</section>

</template>

<script>
export default {
    name: "Banner",
}
</script>

<style>

</style>