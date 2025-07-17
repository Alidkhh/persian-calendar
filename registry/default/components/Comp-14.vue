<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { Button } from "@/registry/default/ui/button";
import { cn } from "~/lib/utils";
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
   CalendarNextButton,
   CalendarPrevButton,
} from "@/registry/default/ui/calendar";
import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";
import {
   CalendarDate,
   getLocalTimeZone,
   today,
   type DateValue,
   createCalendar,
   toCalendar,
   PersianCalendar,
} from "@internationalized/date";
import { useTimeoutFn } from "@vueuse/core";
import { LucideChevronDown } from "lucide-vue-next";
import {
   CalendarRoot,
   type CalendarRootEmits,
   type CalendarRootProps,
   useForwardPropsEmits,
   ConfigProvider,
} from "reka-ui";

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

const modelValue = ref(
   props.modelValue ? props.modelValue : todayDate,
) as Ref<DateValue>;

const placeholderDate = ref({
   year: modelValue.value.year,
   month: modelValue.value.month,
});

const placeholder = computed({
   get: () =>
      new CalendarDate(
         new PersianCalendar(),
         placeholderDate.value.year,
         placeholderDate.value.month,
         1,
      ),
   set: (newDate: DateValue) => {
      placeholderDate.value = {
         year: newDate.year,
         month: newDate.month,
      };
   },
});

const collapsibleOpen = ref(false);
const years_state = ref(true);
const months_state = ref(false);

watch(collapsibleOpen, (isOpen) => {
   if (isOpen) {
      years_state.value = true;
      months_state.value = false;
      start();
   }
});

function selectYear(year: number) {
   placeholderDate.value = { year: year, month: placeholderDate.value.month };

   years_state.value = false;
   months_state.value = true;
}

const selectMonth = (month: number) => {
   placeholderDate.value = { year: placeholderDate.value.year, month: month };

   collapsibleOpen.value = false;
};

function placeholderUpdated(date: DateValue) {
   placeholderDate.value = { year: date.year, month: date.month };
}

const getMonthName = (month: number) => {
   return new CalendarDate(new PersianCalendar(), todayDate.year, month, 1)
      .toDate(getLocalTimeZone())
      .toLocaleString("fa-IR", { month: "short" });
};

const scrollToCurrentYear = () => {
   const currentYearElement = document.querySelector(
      `[data-year="${placeholderDate.value.year}"]`,
   );

   if (currentYearElement) {
      currentYearElement.scrollIntoView({
         behavior: "smooth",
         block: "nearest",
      });
   }
};

const { start } = useTimeoutFn(scrollToCurrentYear, 0);

const years = Array.from({ length: 40 }, (_, i) => todayDate.year - 20 + i);
</script>

<template>
   <ConfigProvider dir="rtl">
      <CalendarRoot
         data-slot="calendar"
         v-slot="{ weekDays, grid }"
         :class="
            cn(
               'bg-background relative w-fit overflow-hidden rounded-lg border border-neutral-300 p-3',
               props.class,
            )
         "
         v-bind="forwarded"
         v-model="modelValue"
         :placeholder="placeholder"
         @update:placeholder="placeholderUpdated"
      >
         <CalendarHeader class="static flex justify-between pt-0">
            <CalendarPrevButton class="static rotate-180" />

            <Collapsible v-model:open="collapsibleOpen">
               <CollapsibleTrigger asChild>
                  <Button
                     class="flex items-center gap-2 text-sm font-medium hover:bg-transparent [&[data-state=open]>svg]:rotate-180"
                     variant="ghost"
                     size="sm"
                  >
                     <CalendarHeading class="dir-ltr flex-1" />
                     <LucideChevronDown
                        class="text-muted-foreground/80 size-4 shrink-0 transition-transform duration-200"
                        aria-hidden="true"
                     />
                  </Button>
               </CollapsibleTrigger>
               <CollapsibleContent
                  class="bg-background absolute inset-x-0 top-15 bottom-0 z-10"
               >
                  <ScrollArea class="h-full">
                     <div
                        :class="[
                           'grid grid-cols-3 gap-2 px-3',
                           !years_state ? 'hidden' : '',
                        ]"
                     >
                        <Button
                           v-for="year in years"
                           :key="year"
                           :variant="
                              year === placeholderDate.year
                                 ? 'default'
                                 : 'ghost'
                           "
                           @click="selectYear(year)"
                           :data-year="year"
                        >
                           {{ year }}
                        </Button>
                     </div>

                     <div
                        :class="[
                           'grid grid-cols-3 gap-2 px-3',
                           !months_state ? 'hidden' : '',
                        ]"
                     >
                        <Button
                           v-for="month in 12"
                           :key="month"
                           :variant="
                              month === placeholderDate.month
                                 ? 'default'
                                 : 'ghost'
                           "
                           @click="selectMonth(month)"
                        >
                           {{ getMonthName(month) }}
                        </Button>
                     </div>
                  </ScrollArea>
               </CollapsibleContent>
            </Collapsible>

            <CalendarNextButton class="static rotate-180" />
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
                           class="[&[data-today]:not([data-selected])]:bg-unset [&[data-today]:not([data-selected])]:text-unset data-[today]:after:content-[' '] data-[today]:after:bg-primary data-[today]:data-[selected]:after:bg-primary-foreground data-[today]:after:absolute data-[today]:after:bottom-[5px] data-[today]:after:h-[3px] data-[today]:after:w-[3px] data-[today]:after:rounded-full"
                        />
                     </CalendarCell>
                  </CalendarGridRow>
               </CalendarGridBody>
            </CalendarGrid>
         </div> </CalendarRoot
   ></ConfigProvider>
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
