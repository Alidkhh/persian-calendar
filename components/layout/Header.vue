<script lang="ts" setup>
import { Moon, Sun, Menu } from "lucide-vue-next";

const config = useRuntimeConfig();
const colorMode = useColorMode();

function toggleTheme() {
   colorMode.preference = colorMode.value === "light" ? "dark" : "light";
}
</script>

<template>
   <div
      class="bg-background sticky top-0 z-40 flex justify-center border-b-1 px-2 py-2 shadow-md"
   >
      <div class="mx-auto w-full max-w-full md:w-11/12 2xl:w-[85rem]">
         <div class="flex items-center justify-between">
            <div class="flex items-center gap-1">
               <div class="block md:hidden">
                  <Drawer>
                     <DrawerTrigger>
                        <Button variant="ghost" size="icon">
                           <Menu class="size-5" />
                        </Button>
                     </DrawerTrigger>
                     <DrawerContent>
                        <RoutesMenu class="my-3 px-2" withDrawerClose />
                     </DrawerContent>
                  </Drawer>
               </div>

               <NuxtLink to="/" class="font-heading text-xl sm:text-2xl"
                  >Persian Calendar</NuxtLink
               >
            </div>
            <div class="flex items-center gap-2">
               <a :href="config.public.github" target="_blank">
                  <Button variant="ghost" size="icon">
                     <GithubIcon
                        class="text-foreground/60 hover:text-foreground/80 size-5"
                     />
                  </Button>
               </a>
               <Button variant="ghost" size="icon" @click="toggleTheme">
                  <Moon
                     v-if="colorMode.value === 'dark'"
                     class="text-foreground/60 hover:text-foreground/80 size-5"
                  />
                  <Sun
                     v-else
                     class="text-foreground/60 hover:text-foreground/80 size-5"
                  />
               </Button>
            </div>
         </div>
      </div>
   </div>
</template>
