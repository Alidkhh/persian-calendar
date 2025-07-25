<script lang="ts" setup>
import { ref, computed, type HTMLAttributes, type Ref } from "vue";
import { Button } from "@/registry/default/ui/button";
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
   CalendarRoot,
   type CalendarRootEmits,
   type CalendarRootProps,
   useForwardPropsEmits,
   ConfigProvider,
} from "reka-ui";
import {
   type DateValue,
   createCalendar,
   getLocalTimeZone,
   toCalendar,
   today,
   PersianCalendar,
   CalendarDateTime,
} from "@internationalized/date";
import { reactiveOmit } from "@vueuse/core";

const props = withDefaults(
   defineProps<
      CalendarRootProps & {
         class?: HTMLAttributes["class"];
      }
   >(),
   {
      locale: "fa-IR",
   },
);

const emits = defineEmits<CalendarRootEmits>();

const delegatedProps = reactiveOmit(props, "class");

const forwarded = useForwardPropsEmits(delegatedProps, emits);

const todayDate = toCalendar(
   today(getLocalTimeZone()),
   createCalendar("persian"),
);

const model: DateValue = props.modelValue
   ? (props.modelValue as DateValue)
   : todayDate;

const modelValue = ref(
   new CalendarDateTime(
      new PersianCalendar(),
      model.year,
      model.month,
      model.day,
      12,
      30,
      0,
   ),
) as Ref<DateValue>;

const timeSlots = [
   { time: "09:00", available: false },
   { time: "09:30", available: false },
   { time: "10:00", available: true },
   { time: "10:30", available: true },
   { time: "11:00", available: true },
   { time: "11:30", available: true },
   { time: "12:00", available: false },
   { time: "12:30", available: true },
   { time: "13:00", available: true },
   { time: "13:30", available: true },
   { time: "14:00", available: true },
   { time: "14:30", available: false },
   { time: "15:00", available: false },
   { time: "15:30", available: true },
   { time: "16:00", available: true },
   { time: "16:30", available: true },
   { time: "17:00", available: true },
   { time: "17:30", available: true },
];

const handleTimeClick = (time: string) => {
   const [hours, minutes] = time.split(":").map(Number);
   modelValue.value = new CalendarDateTime(
      new PersianCalendar(),
      modelValue.value.year,
      modelValue.value.month,
      modelValue.value.day,
      hours,
      minutes,
   );
};

const isSelectedTime = (time: string) => {
   const [hours, minutes] = time.split(":").map(Number);

   if ("hour" in modelValue.value && "minute" in modelValue.value) {
      return (
         modelValue.value.hour === hours && modelValue.value.minute === minutes
      );
   }

   return false;
};

const formatter = new Intl.DateTimeFormat("fa-IR", {
   day: "numeric",
   weekday: "short",
   month: "long",
});

const formatDate = computed(() =>
   formatter.format(modelValue.value.toDate(getLocalTimeZone())),
);
</script>

<template>
   <ConfigProvider dir="rtl">
      <div
         class="bg-background dir-rtl border-border w-fit rounded-lg border p-3"
      >
         <div class="flex gap-4 max-sm:flex-col">
            <CalendarRoot
               data-slot="calendar"
               v-slot="{ grid, weekDays }"
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
                                 class="[&[data-today]:not([data-selected])]:bg-unset [&[data-today]:not([data-selected])]:text-unset data-[today]:after:content-[' '] data-[today]:after:bg-primary data-[today]:data-[selected]:after:bg-primary-foreground data-[today]:after:absolute data-[today]:after:bottom-[5px] data-[today]:after:h-[3px] data-[today]:after:w-[3px] data-[today]:after:rounded-full"
                              />
                           </CalendarCell>
                        </CalendarGridRow>
                     </CalendarGridBody>
                  </CalendarGrid>
               </div>
            </CalendarRoot>
            <div class="relative w-full max-sm:h-48 sm:w-40">
               <div class="absolute inset-0 pt-2 max-sm:border-t sm:pt-0">
                  <ScrollArea class="h-full sm:border-s" type="always">
                     <div class="space-y-3">
                        <div
                           class="flex h-5 shrink-0 items-center justify-center px-5"
                        >
                           <p class="text-sm font-medium">
                              {{ formatDate }}
                           </p>
                        </div>
                        <div class="grid gap-1.5 px-5 max-sm:grid-cols-2">
                           <Button
                              v-for="time in timeSlots"
                              :key="time.time"
                              :variant="
                                 isSelectedTime(time.time)
                                    ? 'default'
                                    : 'outline'
                              "
                              size="sm"
                              class="w-full"
                              :disabled="!time.available"
                              @click="handleTimeClick(time.time)"
                           >
                              {{ time.time }}
                           </Button>
                        </div>
                     </div>
                  </ScrollArea>
               </div>
            </div>
         </div>
      </div>
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
