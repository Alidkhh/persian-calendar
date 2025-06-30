<script lang="ts" setup>
const componenets = [
   { title: routes.calendar.title, route: routes.calendar.route, count: 5 },
];
</script>

<template>
   <div class="mt-10 flex flex-col">
      <div class="max-w-3xl max-sm:text-center">
         <h1
            class="font-heading text-foreground mb-4 text-4xl/[1.1] font-bold tracking-tight md:text-5xl/[1.1]"
         >
            Persian Calendar & Date picker components built with Tailwind CSS
            and Shadcn for
            <span class="text-vue-color">Vue</span>
         </h1>
         <p>
            An open-source collection of copy-and-paste Calendar components for
            quickly build application UIs
         </p>
      </div>

      <div class="mt-16 flex items-center justify-center gap-4">
         <NuxtLink :to="routes.calendar.route">
            <Button size="xl" class="text-md md:text-xl">Get Started</Button>
         </NuxtLink>

         <NuxtLink :to="routes.calendar.route">
            <Button size="xl" class="text-md md:text-xl" variant="outline"
               >Github</Button
            >
         </NuxtLink>
      </div>

      <!-- <div class="mt-12 grid w-full grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
         <template v-for="component in componenets">
            <NuxtLink
               class="group flex flex-col overflow-hidden rounded-xl border border-zinc-300 shadow-xl shadow-zinc-300 duration-300 hover:shadow-2xl hover:shadow-zinc-400"
               :to="component.route"
            >
               <NuxtPicture
                  src="/components/calendar-date-picker.png"
                  class="overflow-hidden bg-zinc-300"
                  :imgAttrs="{
                     class: 'group-hover:scale-110 duration-300 group-hover:rotate-6 w-full',
                  }"
               />
               <div class="flex flex-col items-center gap-3 p-4">
                  <span>Calendar & Date picker</span>
                  <span class="text-sm">{{ component.count }} components</span>
               </div>
            </NuxtLink>
         </template>
      </div> -->
   </div>
</template>
