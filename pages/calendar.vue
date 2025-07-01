<script lang="ts" setup>
import {
   type DateValue,
   createCalendar,
   getLocalTimeZone,
   toCalendar,
   today,
} from "@internationalized/date";
import Comp2 from "~/registry/default/components/Comp-2.vue";

const value = ref(
   toCalendar(today(getLocalTimeZone()), createCalendar("persian")),
) as Ref<DateValue>;

const isDateUnavailable = (date) => {
   return date.day === 17 || date.day === 18;
};
</script>

<template>
   <div
      class="xxl:grid-cols-4 bg-background mb-10 grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3"
   >
      <template v-for="i in 5">
         <ComponentPreview :componentName="`test-${i}`">
            <Comp2 v-model="value" :is-date-unavailable="isDateUnavailable" />
         </ComponentPreview>
      </template>
   </div>
</template>
