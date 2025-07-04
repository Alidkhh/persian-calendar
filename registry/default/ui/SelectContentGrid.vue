<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import {
   SelectContent,
   type SelectContentEmits,
   type SelectContentProps,
   SelectPortal,
   SelectViewport,
   useForwardPropsEmits,
} from "reka-ui";
import { cn } from "@/lib/utils";
import { SelectScrollDownButton, SelectScrollUpButton } from "./select";

defineOptions({
   inheritAttrs: false,
});

const props = withDefaults(
   defineProps<
      SelectContentProps & {
         class?: HTMLAttributes["class"];
         gridCols?: number;
      }
   >(),
   {
      position: "popper",
      gridCols: 3,
      align: "center",
   },
);
const emits = defineEmits<SelectContentEmits>();

const delegatedProps = reactiveOmit(props, "class");

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
   <SelectPortal>
      <SelectContent
         data-slot="select-content"
         v-bind="{ ...forwarded, ...$attrs }"
         :class="
            cn(
               'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--reka-select-content-available-height) min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border shadow-md',
               position === 'popper' &&
                  'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
               props.class,
            )
         "
      >
         <SelectScrollUpButton />
         <SelectViewport
            :class="
               cn(
                  'p-1',
                  position === 'popper' &&
                     'grid h-[var(--reka-select-trigger-height)] w-full min-w-[var(--reka-select-trigger-width)] scroll-my-1 gap-2',
                  {
                     'grid-cols-1': gridCols === 1,
                     'grid-cols-2': gridCols === 2,
                     'grid-cols-3': gridCols === 3,
                     'grid-cols-4': gridCols === 4,
                     'grid-cols-5': gridCols === 5,
                     'grid-cols-6': gridCols === 6,
                  },
               )
            "
         >
            <slot />
         </SelectViewport>
         <SelectScrollDownButton />
      </SelectContent>
   </SelectPortal>
</template>
