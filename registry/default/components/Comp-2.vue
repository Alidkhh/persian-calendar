<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import {
   CalendarCell,
   CalendarCellTrigger,
   CalendarGrid,
   CalendarGridBody,
   CalendarGridHead,
   CalendarGridRow,
   CalendarHeadCell,
   CalendarHeader,
} from "@/registry/default/ui/calendar";
import { cn } from "@/lib/utils";
import {
   CalendarDate,
   getLocalTimeZone,
   today,
   type DateValue,
   PersianCalendar,
   toCalendar,
} from "@internationalized/date";
import { CalendarRoot, type CalendarRootProps } from "reka-ui";
import SelectContentGrid from "../ui/select/SelectContentGrid.vue";
import SelectItemButton from "../ui/select/SelectItemButton.vue";

const todayDate = toCalendar(today(getLocalTimeZone()), new PersianCalendar());

const props = defineProps<
   CalendarRootProps & { class?: HTMLAttributes["class"] }
>();
const selectedDate = ref({
   month: todayDate.month,
   year: todayDate.year,
});

const placeholder = computed({
   get: () =>
      new CalendarDate(selectedDate.value.year, selectedDate.value.month, 1),
   set: (newDate: DateValue) => {
      selectedDate.value = {
         year: newDate.year,
         month: newDate.month,
      };
   },
});

const monthNames = Array.from({ length: 12 }, (_, i) =>
   new CalendarDate(new PersianCalendar(), todayDate.year, i + 1, 1)
      .toDate(getLocalTimeZone())
      .toLocaleString("fa-IR", { month: "long" }),
);

const years = Array.from({ length: 40 }, (_, i) => todayDate.year - 20 + i);
</script>

<template>
   <div>
      <CalendarRoot
         v-slot="{ weekDays, grid, weekStartsOn }"
         data-slot="calendar"
         :placeholder="placeholder"
         :class="
            cn(
               'bg-background rounded-lg border border-neutral-300 p-3',
               props.class,
            )
         "
         locale="fa-IR"
      >
         <CalendarHeader class="flex justify-between">
            <div class="grid w-full grid-cols-2 items-center gap-2">
               <Select v-model="selectedDate.month">
                  <SelectTrigger size="sm" class="w-full">
                     <SelectValue />
                  </SelectTrigger>
                  <SelectContentGrid :grid-cols="3">
                     <SelectItemButton
                        v-for="(month, i) in monthNames"
                        :key="i"
                        :value="i + 1"
                     >
                        {{ month }}
                     </SelectItemButton>
                  </SelectContentGrid>
               </Select>
               <Select v-model="selectedDate.year">
                  <SelectTrigger size="sm" class="w-full">
                     <SelectValue />
                  </SelectTrigger>
                  <SelectContentGrid :grid-cols="3">
                     <SelectItemButton
                        v-for="year in years"
                        :key="year"
                        :value="year"
                     >
                        {{ year }}
                     </SelectItemButton>
                  </SelectContentGrid>
               </Select>
            </div>
         </CalendarHeader>
         <div
            class="mt-4 flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 sm:gap-y-0"
         >
            <CalendarGrid v-for="month in grid" :key="month.value.toString()">
               <CalendarGridHead>
                  <CalendarGridRow>
                     <CalendarHeadCell v-for="day in weekDays" :key="day">
                        {{ day }}
                     </CalendarHeadCell>
                  </CalendarGridRow>
               </CalendarGridHead>
               <CalendarGridBody>
                  <CalendarGridRow
                     v-for="(weekDates, index) in month.rows"
                     :key="`weekDate-${index}`"
                     class="mt-2 w-full"
                  >
                     <CalendarCell
                        v-for="weekDate in weekDates"
                        :key="weekDate.toString()"
                        :date="weekDate"
                     >
                        <CalendarCellTrigger
                           :day="weekDate"
                           :month="month.value"
                        />
                     </CalendarCell>
                  </CalendarGridRow>
               </CalendarGridBody>
            </CalendarGrid>
         </div>
      </CalendarRoot>
   </div>
</template>
