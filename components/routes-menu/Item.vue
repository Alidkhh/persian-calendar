<script lang="ts" setup>
const route = useRoute();

const props = defineProps<{
   title: string;
   route: string;
}>();
</script>

<template>
   <NuxtLink
      :to="props.route"
      class="text-md w-full cursor-pointer justify-start rounded-lg px-2.5 py-1.5"
      :class="
         route.fullPath == props.route
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-muted'
      "
   >
      {{ props.title }}
   </NuxtLink>
</template>
