<script lang="ts" setup>
import { Code } from "lucide-vue-next";
import type { RegistryItem } from "shadcn-vue/registry";

const props = defineProps<{
   component: RegistryItem;
}>();

const dialog = ref(false);
</script>

<template>
   <div
      class="bg-background relative flex flex-col items-center justify-center p-8"
   >
      <div class="mb-3 flex w-full items-center justify-between">
         <Button class="invisible size-7 p-0" size="icon" variant="outline">
         </Button>

         <div class="text-muted-foreground text-xs">
            <p>{{ component.description }}</p>
         </div>

         <TooltipProvider>
            <Tooltip>
               <TooltipTrigger as-child class="">
                  <Button
                     class="border-muted-foreground/50 size-7 p-0 hover:bg-zinc-300"
                     size="icon"
                     variant="outline"
                     @click="dialog = true"
                  >
                     <Code />
                  </Button>
               </TooltipTrigger>
               <TooltipContent>
                  <span>Installation</span>
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>
      </div>

      <slot></slot>
   </div>

   <ComponentInstallationDialog v-model:open="dialog" :component="component" />
</template>
