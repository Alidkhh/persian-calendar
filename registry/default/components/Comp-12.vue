<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import {
   RangeCalendarRoot,
   type RangeCalendarRootEmits,
   type RangeCalendarRootProps,
   useForwardPropsEmits,
   ConfigProvider,
} from "reka-ui";
import { cn } from "@/lib/utils";
import {
   getLocalTimeZone,
   today,
   toCalendar,
   createCalendar,
   type DateValue,
} from "@internationalized/date";
import type { DateRange } from "reka-ui";
import {
   RangeCalendarCell,
   RangeCalendarCellTrigger,
   RangeCalendarGrid,
   RangeCalendarGridBody,
   RangeCalendarGridHead,
   RangeCalendarGridRow,
   RangeCalendarHeadCell,
   RangeCalendarHeader,
   RangeCalendarHeading,
   RangeCalendarNextButton,
   RangeCalendarPrevButton,
} from "@/registry/default/ui/range-calendar";

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

const startDatePlaceholder = ref();
const endDatePlaceholder = ref();

function updatePlaceholder(date: DateValue) {
   const startDate = date.toDate(getLocalTimeZone());
   const endDate = date.add({ months: 1 }).toDate(getLocalTimeZone());

   const startDate_year = startDate?.toLocaleString("fa-IR", {
      year: "numeric",
   });
   const startDate_month = startDate?.toLocaleString("fa-IR", {
      month: "short",
   });
   const endDate_year = endDate?.toLocaleString("fa-IR", { year: "numeric" });
   const endDate_month = endDate?.toLocaleString("fa-IR", {
      month: "short",
   });

   startDatePlaceholder.value = `${startDate_month} ${startDate_year}`;
   endDatePlaceholder.value = `${endDate_month} ${endDate_year}`;
}
updatePlaceholder(start);
</script>

<template>
   <ConfigProvider dir="rtl">
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
         :numberOfMonths="2"
         :isDateUnavailable="isDateUnavailable"
         disableDaysOutsideCurrentView
         @update:placeholder="updatePlaceholder"
      >
         <RangeCalendarHeader class="mt-2 sm:mt-0">
            <RangeCalendarHeading class="w-full">
               <div class="dir-rtl hidden justify-around sm:flex">
                  <span>{{ startDatePlaceholder }}</span>
                  <span>{{ endDatePlaceholder }}</span>
               </div>
            </RangeCalendarHeading>

            <div class="flex items-center gap-1">
               <RangeCalendarPrevButton class="calendar-prev-btn z-10" />
               <RangeCalendarNextButton class="calendar-next-btn z-10" />
            </div>
         </RangeCalendarHeader>

         <div
            class="mt-4 flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 sm:gap-y-0"
         >
            <RangeCalendarGrid
               v-for="(month, index) in grid"
               :key="month.value.toString()"
               :class="['relative sm:mt-0', index != 0 ? 'mt-8' : 'mt-2']"
            >
               <RangeCalendarGridHead>
                  <RangeCalendarGridRow
                     :class="[
                        'absolute w-full justify-center sm:hidden',
                        index != 0 ? '-top-10 border-t pt-2' : '-top-8',
                     ]"
                  >
                     <th class="text-center text-sm font-medium">
                        <span>
                           {{
                              index == 0
                                 ? startDatePlaceholder
                                 : index == 1
                                   ? endDatePlaceholder
                                   : ""
                           }}
                        </span>
                     </th>
                  </RangeCalendarGridRow>
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
                        :class="[
                           '[&:has([data-highlighted])]:bg-muted-foreground/30 [&:has([data-selected])]:bg-muted-foreground/30 first:[&:has([data-selected])]:rounded-l-none last:[&:has([data-selected])]:rounded-r-none',
                           // Start
                           '[&:has([data-highlighted][data-highlighted-start])]:rounded-s-md [&:has([data-selected][data-selection-start])]:rounded-s-md',
                           // End
                           '[&:has([data-highlighted][data-highlighted-end])]:rounded-e-md [&:has([data-selected][data-selection-end])]:rounded-e-md',
                           // Outside and Disabled
                           '[&:has([data-outside-view][data-disabled])]:opacity-0',
                        ]"
                     >
                        <RangeCalendarCellTrigger
                           :day="weekDate"
                           :month="month.value"
                           :class="[
                              'hover:bg-unset',
                              // Selection Start
                              'data-[highlighted-start]:bg-primary data-[highlighted-start]:text-primary-foreground data-[highlighted-start]:not-data-[highlighted-end]:rounded-e-none data-[selection-start]:not-data-[highlighted]:not-data-[selection-end]:rounded-e-none',
                              // Selection End
                              'data-[highlighted-end]:bg-primary data-[highlighted-end]:text-primary-foreground data-[highlighted-end]:not-data-[highlighted-start]:rounded-s-none data-[selection-end]:not-data-[selection-start]:rounded-s-none',
                              // Today
                              `[&[data-today]:not([data-selected])]:bg-unset [&[data-today]:not([data-selected])]:text-unset data-[today]:after:content-[' '] data-[today]:after:bg-primary data-[today]:data-[selection-start]:after:bg-primary-foreground data-[today]:data-[selection-end]:after:bg-primary-foreground data-[today]:data-[highlighted]:hover:after:bg-primary-foreground data-[today]:after:absolute data-[today]:after:bottom-[5px] data-[today]:after:h-[3px] data-[today]:after:w-[3px] data-[today]:after:rounded-full`,
                           ]"
                        />
                     </RangeCalendarCell>
                  </RangeCalendarGridRow>
               </RangeCalendarGridBody>
            </RangeCalendarGrid>
         </div>
      </RangeCalendarRoot>
   </ConfigProvider>
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
