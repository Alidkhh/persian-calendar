<script lang="ts" setup>
import { Star, ArrowRight } from "lucide-vue-next";

definePageMeta({
   layout: "home",
});

const config = useRuntimeConfig();
</script>

<template>
   <div class="mt-16 flex flex-col">
      <div class="max-w-3xl max-sm:text-center sm:ms-10">
         <h1
            class="font-heading text-foreground mb-4 text-4xl/[1.1] font-bold tracking-tight md:text-5xl/[1.1]"
         >
            Persian Calendar & Date picker components for
            <span class="text-vue-color">Vue</span>
         </h1>
         <p class="font-sans">
            An open-source collection of copy-and-paste Calendar components
            built with Tailwind CSS and Shadcn
         </p>
      </div>

      <div class="mt-16 flex items-center justify-center gap-4">
         <NuxtLink :to="routes.introduction.route">
            <Button
               class="text-md group h-12 rounded-lg px-7 font-sans has-[>svg]:px-5 md:text-xl"
            >
               Get Started
               <ArrowRight
                  class="size-5 duration-300 group-hover:translate-x-1"
               />
            </Button>
         </NuxtLink>

         <a :href="config.public.github" target="_blank">
            <Button
               class="text-md group border-muted-foreground h-12 rounded-lg px-7 font-sans has-[>svg]:px-5 md:text-xl"
               variant="outline"
            >
               <Star
                  class="size-5 fill-amber-500 text-amber-500 duration-300 group-hover:scale-[120%]"
               />
               Star on GitHub
            </Button>
         </a>
      </div>
   </div>
</template>
