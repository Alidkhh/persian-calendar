<script lang="ts" setup>
import { Github } from "lucide-vue-next";
</script>

<template>
   <div>
      <div
         class="bg-background sticky top-0 z-10 border-b-1 px-5 py-3 shadow-md md:px-[7rem]"
      >
         <div class="flex items-center justify-between">
            <NuxtLink to="/" class="text-3xl font-bold">SUI</NuxtLink>
            <NuxtLink to="https://github.com/Alidkhh/SUI" target="_blank">
               <Github class="text-primary"></Github>
            </NuxtLink>
         </div>
      </div>
      <div class="px-5 pt-12 md:px-[7rem]">
         <slot></slot>
      </div>
   </div>
</template>
