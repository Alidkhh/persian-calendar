<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";
import { DrawerClose } from "@/registry/default/ui/drawer";

const props = withDefaults(
   defineProps<{
      class?: HTMLAttributes["class"];
      withDrawerClose?: boolean;
   }>(),
   {
      withDrawerClose: false,
   },
);

const menuItems = [
   routes.introduction,
   routes.installation,
   { ...routes.calendar },
   { ...routes.datepicker },
   { ...routes.persianCalendar, title: "<PersinaCalendar />" },
];
</script>

<template>
   <div :class="cn('flex flex-col gap-3', props.class)">
      <component
         :is="withDrawerClose ? DrawerClose : 'div'"
         v-for="item in menuItems"
         :key="item.route"
         v-bind="withDrawerClose ? { asChild: true } : { class: 'flex' }"
      >
         <RoutesMenuItem :title="item.title" :route="item.route" />
      </component>
   </div>
</template>
