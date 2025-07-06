<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
</script>
<template>
   <div>
      <NuxtLayout>
         <SpeedInsights />
         <NuxtPage />
      </NuxtLayout>
   </div>
</template>
