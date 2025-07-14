<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

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
      <DrawerClose v-if="withDrawerClose" as-child v-for="item in menuItems">
         <RoutesMenuItem :title="item.title" :route="item.route" />
      </DrawerClose>

      <RoutesMenuItem
         v-else
         v-for="item in menuItems"
         :title="item.title"
         :route="item.route"
      />
   </div>
</template>
