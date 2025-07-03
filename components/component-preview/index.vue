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
      class="relative flex flex-col items-center justify-center rounded-lg bg-zinc-100 p-12 pb-5 md:p-8"
   >
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger as-child class="absolute end-0 top-0 m-3">
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

      <slot></slot>
      <div class="text-muted-foreground mt-4 text-xs">
         <p>{{ component.description }}</p>
      </div>
   </div>

   <ComponentInstallationDialog
      v-model:open="dialog"
      :component-name="component.name"
   />
</template>
