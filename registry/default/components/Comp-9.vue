<script lang="ts" setup>
import { Button } from "@/registry/default/ui/button";
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
   type CalendarDate,
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

const todayDate = toCalendar(
   today(getLocalTimeZone()),
   createCalendar("persian"),
);

const start = todayDate;
const end = start.add({ days: 7 });

const modelValue = ref({
   start,
   end,
}) as Ref<DateRange>;

type Preset = {
   label: string;
   start: CalendarDate;
   end: CalendarDate;
};

const presets: Preset[] = [
   {
      label: "هفته آینده",
      start: todayDate,
      end: todayDate.add({ days: 7 }),
   },
   {
      label: "هفته گذشته",
      start: todayDate.subtract({ days: 7 }),
      end: todayDate,
   },
   {
      label: "ماه گذشته",
      start: todayDate.subtract({ months: 1 }),
      end: todayDate,
   },
   {
      label: "ماه آینده",
      start: todayDate,
      end: todayDate.add({ months: 1 }),
   },
];

function selectRange(preset: Preset) {
   modelValue.value = { start: preset.start, end: preset.end };
}

const dateString = computed(() => {
   const startDate = modelValue.value.start?.toDate(getLocalTimeZone());
   const endDate = modelValue.value.end?.toDate(getLocalTimeZone());

   const startDate_day = startDate?.toLocaleString("fa-IR", { day: "numeric" });
   const startDate_month = startDate?.toLocaleString("fa-IR", {
      month: "short",
   });
   const endDate_day = endDate?.toLocaleString("fa-IR", { day: "numeric" });
   const endDate_month = endDate?.toLocaleString("fa-IR", {
      month: "short",
   });

   console.log(startDate_day);

   return `${startDate_day} ${startDate_month} - ${endDate_day} ${endDate_month}`;
});
</script>

<template>
   <div>
      <div
         class="bg-background dir-rtl rounded-lg border border-neutral-300 p-3"
      >
         <div class="flex gap-4 max-sm:flex-col">
            <div
               class="relative flex flex-col justify-between max-sm:order-1 max-sm:border-t sm:w-32 sm:border-e sm:pe-2"
            >
               <div class="mt-1 flex h-full flex-col sm:mt-0">
                  <Button
                     v-for="preset in presets"
                     :key="preset.label"
                     size="sm"
                     class="w-full justify-start"
                     variant="ghost"
                     @click="selectRange(preset)"
                  >
                     {{ preset.label }}
                  </Button>
               </div>
               <div class="flex flex-col items-center justify-center">
                  <Separator class="mt-1 mb-2" />

                  <span class="text-muted-foreground text-xs">{{
                     dateString
                  }}</span>
               </div>
            </div>
            <RangeCalendarRoot
               data-slot="range-calendar"
               v-slot="{ weekDays, grid }"
               :class="props.class"
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
               <div
                  class="mt-4 flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 sm:gap-y-0"
               >
                  <RangeCalendarGrid
                     v-for="month in grid"
                     :key="month.value.toString()"
                  >
                     <RangeCalendarGridHead>
                        <RangeCalendarGridRow>
                           <RangeCalendarHeadCell
                              v-for="day in weekDays"
                              :key="day"
                           >
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
         </div>
      </div>
   </div>
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
