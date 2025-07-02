<script lang="ts" setup>
import GithubIcon from "~/components/GithubIcon.vue";

const config = useRuntimeConfig();
</script>

<template>
   <div>
      <div
         class="bg-background sticky top-0 z-10 border-b-1 px-5 py-3 shadow-md md:px-[7rem]"
      >
         <div class="flex items-center justify-between">
            <NuxtLink to="/" class="font-heading text-2xl "
               >Persian Calendar</NuxtLink
            >
            <a :href="config.public.github" target="_blank">
               <GithubIcon
                  class="text-foreground/60 hover:text-foreground/80"
               />
            </a>
         </div>
      </div>
      <div class="px-5 pt-12 md:px-[7rem]">
         <slot></slot>
      </div>
   </div>
</template>
