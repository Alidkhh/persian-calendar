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
