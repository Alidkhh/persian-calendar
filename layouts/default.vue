<script lang="ts" setup>
const route = useRoute();

const menuItems = [
   {
      title: routes.introduction.title,
      route: routes.introduction.route,
      icon: "",
   },
   {
      title: routes.installation.title,
      route: routes.installation.route,
      icon: "",
   },
   {
      title: "Calendar Components",
      route: routes.calendar.route,
      icon: "",
   },
];
</script>

<template>
   <div class="flex min-h-[100vh] flex-col">
      <LayoutHeader />

      <LayoutBody>
         <div class="relative flex flex-1 gap-5">
            <div
               class="border-foreground/20 sticky top-[6.5rem] hidden h-full max-h-[calc(100vh-7.5rem)] w-[15rem] flex-shrink-0 overflow-y-auto border-e pe-2 font-sans text-sm md:block"
            >
               <div class="flex flex-col gap-1">
                  <NuxtLink
                     v-for="item in menuItems"
                     :to="item.route"
                     class="hover:bg-muted-foreground/30 text-md w-full cursor-pointer justify-start rounded-lg px-2.5 py-1.5"
                     :class="
                        route.fullPath == item.route
                           ? 'bg-muted-foreground/40 hover:bg-muted-foreground/40 font-bold'
                           : ''
                     "
                  >
                     {{ item.title }}
                  </NuxtLink>
               </div>
            </div>
            <div class="flex-1">
               <slot></slot>
            </div>
         </div>
      </LayoutBody>
   </div>
</template>
