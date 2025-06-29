<script lang="ts" setup>
import {
   type DateValue,
   createCalendar,
   getLocalTimeZone,
   toCalendar,
   today,
} from "@internationalized/date";

const value = ref(
   toCalendar(today(getLocalTimeZone()), createCalendar("persian")),
) as Ref<DateValue>;

</script>

<template>
   <div
      class="xxl:grid-cols-4 bg-background mb-10 grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3"
   >
      <template v-for="i in 5">
         <ComponentPreview :componentName="`test-${i}`">
            <Calendar v-model="value" />
         </ComponentPreview>
      </template>
   </div>
</template>
