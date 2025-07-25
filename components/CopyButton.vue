<script setup lang="ts">
import { Copy, Check } from "lucide-vue-next";
import type { HTMLAttributes } from "vue";
import { useClipboard } from "@vueuse/core";

const props = defineProps<{
   class?: HTMLAttributes["class"];
   text?: string;
}>();

const { copied, copy } = useClipboard();
</script>
<template>
   <div :class="props.class">
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger as-child>
               <Button
                  class="text-white"
                  size="sm"
                  variant="ghost"
                  @click="copy(props.text ?? '')"
               >
                  <template v-if="copied">
                     <Check :size="20" class="text-green-500" />
                  </template>
                  <template v-else>
                     <Copy :size="20" />
                  </template>
               </Button>
            </TooltipTrigger>
            <TooltipContent>
               <span>Copy</span>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   </div>
</template>
