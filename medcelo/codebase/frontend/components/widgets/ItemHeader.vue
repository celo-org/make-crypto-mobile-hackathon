<template>
  
<section class="py-8 leading-7 text-gray-900 bg-white sm:py-12 md:py-16 lg:py-24">
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
        <div class="flex flex-col items-start leading-7 text-gray-900 border-0 border-gray-200 lg:items-center lg:flex-row">
            <div class="box-border flex-1 text-center border-solid sm:text-left">
                <h2 class="m-0 text-4xl font-semibold leading-tight tracking-tight text-left text-black border-0 border-gray-200 sm:text-5xl">
                    {{ title }}
                </h2>
                <p class="mt-4 text-lg text-left text-gray-900 border-0 border-gray-200 sm:text-2xl">
                    {{ tagline }}
                </p>
            </div>
        </div>
    </div>
</section>

</template>

<script>
export default {
    name: "ListItemHeader",
    props: {
        title: {
            type: String,
            required: true,
        },
        tagline: {
            type: String,
            required: true,
        },
    },
}
</script>

<style>

</style>