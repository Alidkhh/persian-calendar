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
   <div>
      <div class="flex">
         <Calendar v-model="value" class="rounded-md border" />
      </div>
   </div>
</template>
