<script lang="ts" setup>
import { components } from "#imports";

// const isDateUnavailable = (date: any) => {
//    return date.day === 17 || date.day === 18;
// };
</script>

<template>
   <div
      class="xxl:grid-cols-4 bg-background mb-10 grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3"
   >
      <template v-for="component in components">
         <ComponentPreview :component="component">
            <div>
               <ComponentLoader :component="component"></ComponentLoader>
            </div>
         </ComponentPreview>
      </template>
   </div>
</template>
