<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import {
   CalendarRoot,
   type CalendarRootEmits,
   type CalendarRootProps,
   useForwardPropsEmits,
} from "reka-ui";
import { cn } from "@/lib/utils";
import {
   CalendarCell,
   CalendarCellTrigger,
   CalendarGrid,
   CalendarGridBody,
   CalendarGridHead,
   CalendarGridRow,
   CalendarHeadCell,
   CalendarHeader,
   CalendarHeading,
   CalendarNextButton,
   CalendarPrevButton,
} from "@/registry/default/ui/calendar";
import {
   type DateValue,
   createCalendar,
   getLocalTimeZone,
   toCalendar,
   today,
   CalendarDate,
   PersianCalendar,
   isWeekend,
} from "@internationalized/date";

const props = withDefaults(
   defineProps<
      CalendarRootProps & {
         class?: HTMLAttributes["class"];
         showFooter?: boolean;
      }
   >(),
   {
      locale: "fa-IR",
      showFooter: true,
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
   year: todayDate.year,
   month: todayDate.month,
});

const placeholder = computed({
   get: () =>
      new CalendarDate(
         new PersianCalendar(),
         selectedDate.value.year,
         selectedDate.value.month,
         1,
      ),
   set: (newDate: DateValue) => {
      selectedDate.value = {
         year: newDate.year,
         month: newDate.month,
      };
   },
});

const isDateUnavailable = (date: DateValue) =>
   isWeekend(date, "fa") || date.day === 17 || date.day === 18;
</script>

<template>
   <CalendarRoot
      data-slot="calendar"
      v-slot="{ weekDays, grid }"
      :class="
         cn(
            'bg-background rounded-lg border border-neutral-300 p-3',
            props.class,
         )
      "
      v-bind="forwarded"
      v-model="modelValue"
      :placeholder="placeholder"
      :isDateUnavailable="isDateUnavailable"
   >
      <CalendarHeader>
         <CalendarHeading class="dir-ltr" />

         <div class="flex items-center gap-1">
            <CalendarPrevButton class="calendar-prev-btn" />
            <CalendarNextButton class="calendar-next-btn" />
         </div>
      </CalendarHeader>

      <div class="mt-4 flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
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
