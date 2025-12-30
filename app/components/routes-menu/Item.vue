<script lang="ts" setup>
import { NuxtLink } from "#components";

const route = useRoute();

const props = defineProps<{
   title: string;
   route: string;
   status?: "compeleted" | "not compeleted";
}>();
</script>

<template>
   <component
      :is="status == 'not compeleted' ? 'div' : NuxtLink"
      :to="props.route"
      :class="[
         'text-md flex w-full cursor-pointer justify-between rounded-lg px-2.5 py-1.5',
         route.fullPath == props.route
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-muted',
         status == 'not compeleted' ? 'text-primary/60' : '',
      ]"
   >
      {{ props.title }}
      <Badge v-if="status == 'not compeleted'" variant="secondary">Soon</Badge>
   </component>
</template>
