<script lang="ts" setup>
import { components } from "#imports";

// import {
//    type DateValue,
//    createCalendar,
//    getLocalTimeZone,
//    toCalendar,
//    today,
// } from "@internationalized/date";

// const value = ref(
//    toCalendar(today(getLocalTimeZone()), createCalendar("persian")),
// ) as Ref<DateValue>;

// const isDateUnavailable = (date: any) => {
//    return date.day === 17 || date.day === 18;
// };
</script>

<template>
   <div
      class="xxl:grid-cols-4 bg-background mb-10 grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3"
   >
      <template v-for="component in components">
         <ComponentPreview :componentName="`test-`">
            <!-- <Comp2 v-model="value" :is-date-unavailable="isDateUnavailable" /> -->
            <ComponentLoader :component="component"></ComponentLoader>
         </ComponentPreview>
      </template>
   </div>
</template>
