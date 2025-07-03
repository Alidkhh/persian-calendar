<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import {
   SelectItem,
   type SelectItemProps,
   SelectItemText,
   useForwardProps,
} from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps<
   SelectItemProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = reactiveOmit(props, "class");

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
   <SelectItem
      data-slot="select-item"
      v-bind="forwardedProps"
      as="button"
      :class="
         cn(
            `focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground relative flex w-full cursor-default items-center justify-center gap-2 rounded-sm px-5 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2`,
            props.class,
         )
      "
   >
      <SelectItemText>
         <slot />
      </SelectItemText>
   </SelectItem>
</template>
