<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";
import { Code } from "lucide-vue-next";
import type { RegistryItem } from "shadcn-vue/registry";

const props = defineProps<{
   class?: HTMLAttributes["class"];
   component: RegistryItem;
}>();

const dialog = ref(false);
</script>

<template>
   <div
      :class="
         cn(
            'bg-background relative flex flex-col items-center justify-center p-3 pb-5',
            props.class,
         )
      "
   >
      <div class="mb-3 flex w-full items-center justify-between">
         <Button class="invisible size-7 p-0" size="icon" variant="outline">
         </Button>

         <div class="text-muted-foreground text-sm text-center">
            <p>{{ component.description }}</p>
            <DevOnly>
               <span class="text-xs">{{
                  component.name
               }}</span>
            </DevOnly>
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
