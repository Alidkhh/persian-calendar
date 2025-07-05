<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";

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
   createCalendar,
   PersianCalendar,
   toCalendar,
} from "@internationalized/date";
import {
   CalendarRoot,
   type CalendarRootEmits,
   type CalendarRootProps,
   useForwardPropsEmits,
} from "reka-ui";

const props = withDefaults(
   defineProps<
      CalendarRootProps & {
         class?: HTMLAttributes["class"];
         showFooter?: boolean;
      }
   >(),
   {
      locale: "fa-IR",
      showFooter: false,
   },
);

const emits = defineEmits<CalendarRootEmits>();

const delegatedProps = reactiveOmit(props, "class");

const forwarded = useForwardPropsEmits(delegatedProps, emits);

const todayDate = toCalendar(
   today(getLocalTimeZone()),
   createCalendar("persian"),
);

const modelValue = ref(todayDate) as Ref<DateValue>;

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

const selectItemClasses =
   "data-[state=checked]:bg-primary justify-center px-2 data-[state=checked]:text-white [&_svg]:hidden";
</script>

<template>
   <div>
      <CalendarRoot
         data-slot="calendar"
         v-slot="{ weekDays, grid, weekStartsOn }"
         :class="
            cn(
               'bg-background rounded-lg border border-neutral-300 p-3',
               props.class,
            )
         "
         v-bind="forwarded"
         v-model="modelValue"
         :placeholder="placeholder"
      >
         <CalendarHeader class="flex justify-between">
            <div class="grid w-full grid-cols-2 items-center gap-2">
               <Select v-model="selectedDate.month">
                  <SelectTrigger size="sm" class="w-full">
                     <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem
                        v-for="(month, i) in monthNames"
                        :key="i"
                        :value="i + 1"
                        :class="selectItemClasses"
                     >
                        {{ month }}
                     </SelectItem>
                  </SelectContent>
               </Select>
               <Select v-model="selectedDate.year">
                  <SelectTrigger size="sm" class="w-full">
                     <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem
                        v-for="year in years"
                        :key="year"
                        :value="year"
                        :class="selectItemClasses"
                     >
                        {{ year }}
                     </SelectItem>
                  </SelectContent>
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
