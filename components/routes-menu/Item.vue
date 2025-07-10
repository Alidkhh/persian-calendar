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
      class="hover:bg-muted-foreground/30 text-md w-full cursor-pointer justify-start rounded-lg px-2.5 py-1.5"
      :class="
         route.fullPath == props.route
            ? 'bg-muted-foreground/40 hover:bg-muted-foreground/40 font-bold'
            : ''
      "
   >
      {{ props.title }}
   </NuxtLink>
</template>
