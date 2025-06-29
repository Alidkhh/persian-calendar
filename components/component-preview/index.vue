<script lang="ts" setup>
import { Code } from "lucide-vue-next";

const props = defineProps<{
   componentName: string;
}>();

const dialog = ref(false);
</script>

<template>
   <div class="relative flex justify-center rounded-lg bg-zinc-100 p-8">
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger as-child class="absolute end-0 top-0 m-3">
               <Button
                  class="hover:bg-zinc-300"
                  size="sm"
                  variant="outline"
                  @click="dialog = true"
               >
                  <Code :size="20" />
               </Button>
            </TooltipTrigger>
            <TooltipContent>
               <span>Installation</span>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>

      <slot></slot>
   </div>

   <ComponentInstallationDialog
      v-model:open="dialog"
      :component-name="componentName"
   />
</template>
