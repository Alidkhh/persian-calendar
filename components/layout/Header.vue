<script lang="ts" setup>
import GithubIcon from "~/components/GithubIcon.vue";
import { Menu } from "lucide-vue-next";

const route = useRoute();
const config = useRuntimeConfig();

const menuItems = [routes.introduction, routes.installation, routes.calendar];
</script>

<template>
   <div
      class="bg-background sticky top-0 z-40 flex justify-center border-b-1 px-2 py-3 shadow-md"
   >
      <div class="xxl:basis-7xl basis-full md:basis-11/12">
         <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
               <Drawer>
                  <DrawerTrigger class="block md:hidden">
                     <Button variant="ghost" size="icon">
                        <Menu class="size-4 md:size-5" />
                     </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                     <div class="my-5 flex flex-col gap-2 px-3">
                        <DrawerClose as-child v-for="item in menuItems">
                           <NuxtLink
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
                        </DrawerClose>
                     </div>
                  </DrawerContent>
               </Drawer>

               <NuxtLink to="/" class="font-heading text-xl sm:text-2xl"
                  >Persian Calendar</NuxtLink
               >
            </div>
            <a :href="config.public.github" target="_blank">
               <Button variant="ghost" size="icon">
                  <GithubIcon
                     class="text-foreground/60 hover:text-foreground/80 size-4 md:size-5"
                  />
               </Button>
            </a>
         </div>
      </div>
   </div>
</template>
