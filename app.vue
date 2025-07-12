<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
</script>
<template>
   <div vaul-drawer-wrapper id="app">
      <NuxtLayout>
         <SpeedInsights />
         <NuxtPage />
      </NuxtLayout>
   </div>
</template>
<style>
.page-enter-active,
.page-leave-active {
   transition: all 0.5s;
}
.page-enter-from,
.page-leave-to {
   opacity: 0;
   filter: blur(1px);
   transform: translate(40px);
}
</style>
