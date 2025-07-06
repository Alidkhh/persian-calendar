<script lang="ts" setup>
import { Button } from "@/registry/default/ui/button";
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
   CalendarHeading,
   CalendarNextButton,
   CalendarPrevButton,
} from "@/registry/default/ui/calendar";
import {
   getLocalTimeZone,
   today,
   type DateValue,
   createCalendar,
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

const presets = [
   {
      label: "امروز",
      value: todayDate,
   },
   {
      label: "هفته گذشته",
      value: todayDate.subtract({ days: 7 }),
   },
   {
      label: "هفته بعد",
      value: todayDate.add({ days: 7 }),
   },
   {
      label: "ماه گذشته",
      value: todayDate.subtract({ months: 1 }),
   },
   {
      label: "ماه بعد",
      value: todayDate.add({ months: 1 }),
   },
];
</script>

<template>
   <div>
      <div
         class="bg-background dir-rtl rounded-lg border border-neutral-300 p-3"
      >
         <div class="flex gap-4 max-sm:flex-col">
            <div class="relative max-sm:order-1 max-sm:border-t sm:w-32">
               <div class="flex h-full flex-col pe-2 sm:border-e">
                  <Button
                     v-for="preset in presets"
                     :key="preset.label"
                     :variant="
                        preset.value === modelValue ? 'default' : 'ghost'
                     "
                     size="sm"
                     class="w-full justify-start"
                     @click="modelValue = preset.value"
                  >
                     {{ preset.label }}
                  </Button>
               </div>
            </div>
            <CalendarRoot
               data-slot="calendar"
               v-slot="{ weekDays, grid }"
               :class="props.class"
               v-bind="forwarded"
               v-model="modelValue"
            >
               <CalendarHeader>
                  <CalendarHeading class="dir-ltr" />
                  <div class="flex items-center gap-1">
                     <CalendarPrevButton class="calendar-prev-btn" />
                     <CalendarNextButton class="calendar-next-btn" />
                  </div>
               </CalendarHeader>
               <div
                  class="mt-4 flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 sm:gap-y-0"
               >
                  <CalendarGrid
                     v-for="month in grid"
                     :key="month.value.toString()"
                  >
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
