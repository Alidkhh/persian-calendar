<script lang="ts" setup>
import {
   type DateValue,
   createCalendar,
   getLocalTimeZone,
   toCalendar,
   today,
   parseDate,
} from "@internationalized/date";

const todayDate = toCalendar(
   today(getLocalTimeZone()),
   createCalendar("persian"),
);

const model = defineModel<DateValue>({
   required: true,
});

const selectedDate = defineModel<any>("selected-date", {
   required: true,
});

const footerDateString = computed(() => {
   if (model.value) {
      return toCalendar(
         parseDate(String(model.value)),
         createCalendar("persian"),
      )
         .toDate(getLocalTimeZone())
         .toLocaleString("fa-IR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
         });
   }
});

const setToday = () => {
   model.value = todayDate;
   selectedDate.value = {
      year: todayDate.year,
      month: todayDate.month,
   };
};
</script>

<template>
   <Separator class="my-3" />
   <div class="flex items-center justify-between">
      <span class="text-xs">{{ footerDateString }}</span>
      <Button class="text-xs" size="xs" @click="setToday">اکنون</Button>
   </div>
</template>
