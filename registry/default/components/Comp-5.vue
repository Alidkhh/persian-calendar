<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import {
   RangeCalendarRoot,
   type RangeCalendarRootEmits,
   type RangeCalendarRootProps,
   useForwardPropsEmits,
} from "reka-ui";
import { cn } from "@/lib/utils";
import {
   getLocalTimeZone,
   today,
   toCalendar,
   createCalendar,
} from "@internationalized/date";
import type { DateRange } from "reka-ui";

const props = withDefaults(
   defineProps<RangeCalendarRootProps & { class?: HTMLAttributes["class"] }>(),
   { locale: "fa-IR" },
);

const emits = defineEmits<RangeCalendarRootEmits>();

const delegatedProps = reactiveOmit(props, "class");

const forwarded = useForwardPropsEmits(delegatedProps, emits);

const start = toCalendar(today(getLocalTimeZone()), createCalendar("persian"));
const end = start.add({ days: 6 });

const modelValue = ref({
   start,
   end,
}) as Ref<DateRange>;
</script>

<template>
   <RangeCalendarRoot
      data-slot="range-calendar"
      v-slot="{ grid, weekDays }"
      :class="
         cn(
            'bg-background rounded-lg border border-neutral-300 p-3',
            props.class,
         )
      "
      v-bind="forwarded"
      v-model="modelValue"
   >
      <RangeCalendarHeader>
         <RangeCalendarHeading class="dir-ltr" />

         <div class="flex items-center gap-1">
            <RangeCalendarPrevButton class="calendar-prev-btn" />
            <RangeCalendarNextButton class="calendar-next-btn" />
         </div>
      </RangeCalendarHeader>

      <div class="mt-4 flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
         <RangeCalendarGrid v-for="month in grid" :key="month.value.toString()">
            <RangeCalendarGridHead>
               <RangeCalendarGridRow>
                  <RangeCalendarHeadCell v-for="day in weekDays" :key="day">
                     {{ day }}
                  </RangeCalendarHeadCell>
               </RangeCalendarGridRow>
            </RangeCalendarGridHead>
            <RangeCalendarGridBody>
               <RangeCalendarGridRow
                  v-for="(weekDates, index) in month.rows"
                  :key="`weekDate-${index}`"
                  class="mt-2 w-full"
               >
                  <RangeCalendarCell
                     v-for="weekDate in weekDates"
                     :key="weekDate.toString()"
                     :date="weekDate"
                     class="[&:has([data-selected])]:bg-muted-foreground/40 first:[&:has([data-selected])]:rounded-s-md first:[&:has([data-selected])]:rounded-l-none last:[&:has([data-selected])]:rounded-e-md last:[&:has([data-selected])]:rounded-r-none [&:has([data-selected][data-selection-end])]:rounded-e-md [&:has([data-selected][data-selection-end])]:rounded-r-none [&:has([data-selected][data-selection-start])]:rounded-s-md [&:has([data-selected][data-selection-start])]:rounded-l-none"
                  >
                     <RangeCalendarCellTrigger
                        :day="weekDate"
                        :month="month.value"
                     />
                  </RangeCalendarCell>
               </RangeCalendarGridRow>
            </RangeCalendarGridBody>
         </RangeCalendarGrid>
      </div>
   </RangeCalendarRoot>
</template>
<style scoped>
.calendar-prev-btn {
   left: unset !important;
   right: 0;
   rotate: 180deg;
}

.calendar-next-btn {
   right: unset !important;
   left: 0;
   rotate: 180deg;
}
.dir-rtl {
   direction: rtl;
}

.dir-ltr {
   direction: ltr;
}
</style>
