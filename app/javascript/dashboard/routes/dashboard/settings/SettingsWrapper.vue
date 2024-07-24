<script setup>
defineProps({
  keepAlive: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div
<<<<<<< HEAD
    class="flex flex-col w-full h-full m-0 p-6 sm:py-8 lg:px-16 overflow-auto bg-white dark:bg-slate-900 font-inter"
=======
    class="flex flex-col w-full h-full m-0 px-8 lg:px-16 py-8 overflow-auto bg-white dark:bg-slate-900"
>>>>>>> 8b1d98af5 (feat: Update the design for integration page (#9825))
  >
    <div class="flex items-start w-full max-w-6xl mx-auto">
      <keep-alive v-if="keepAlive">
        <router-view />
      </keep-alive>
      <router-view v-else />
    </div>
  </div>
</template>
