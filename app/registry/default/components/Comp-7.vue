<script lang="ts" setup>
import { ref, type HTMLAttributes, type Ref } from "vue";
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

const years = Array.from({ length: 40 }, (_, i) => todayDate.year - 20 + i);

const getMonthName = (month: number) => {
   return new CalendarDate(new PersianCalendar(), todayDate.year, month, 1)
      .toDate(getLocalTimeZone())
      .toLocaleString("fa-IR", { month: "short" });
};

const isCurrentYear = (year: number) => {
   return year === modelValue.value.year;
};

const collapsibleOpen = ref(false);

const scrollToCurrentYear = () => {
   const currentYearElement = document.querySelector(
      `[data-year="${modelValue.value.year}"]`,
   );

   if (currentYearElement) {
      currentYearElement.scrollIntoView({
         behavior: "smooth",
         block: "nearest",
      });
   }
};

const { start } = useTimeoutFn(scrollToCurrentYear, 0);

watch(collapsibleOpen, (isOpen) => {
   if (isOpen) {
      start();
   }
});

const selectMonth = (year: number, month: number) => {
   modelValue.value = new CalendarDate(
      new PersianCalendar(),
      year,
      month,
      modelValue.value.day,
   );
   collapsibleOpen.value = false;
};
</script>

<template>
   <ConfigProvider dir="rtl">
      <CalendarRoot
         data-slot="calendar"
         v-slot="{ weekDays, grid }"
         :class="
            cn(
               'bg-background border-border relative w-fit overflow-hidden rounded-lg border p-3',
               props.class,
            )
         "
         v-bind="forwarded"
         v-model="modelValue"
      >
         <CalendarHeader class="static flex justify-between pt-0">
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
                     <Collapsible
                        v-for="year in years"
                        :key="year"
                        class="border-t px-2 py-1.5"
                        :defaultOpen="isCurrentYear(year)"
                        :data-year="year"
                     >
                        <CollapsibleTrigger asChild>
                           <Button
                              variant="ghost"
                              size="sm"
                              class="flex w-full justify-between gap-2 text-sm font-medium hover:bg-transparent [&[data-state=open]>svg]:rotate-180"
                           >
                              <span>{{ year }}</span>
                              <LucideChevronDown
                                 class="text-muted-foreground/80 size-4 shrink-0 transition-transform duration-200"
                                 aria-hidden="true"
                              />
                           </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent
                           class="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden py-1 text-sm transition-all"
                        >
                           <div class="grid grid-cols-3 gap-2">
                              <Button
                                 v-for="month in 12"
                                 :key="month"
                                 :variant="
                                    modelValue.year === year &&
                                    modelValue.month === month
                                       ? 'default'
                                       : 'outline'
                                 "
                                 size="sm"
                                 class="h-7"
                                 @click="selectMonth(year, month)"
                              >
                                 {{ getMonthName(month) }}
                              </Button>
                           </div>
                        </CollapsibleContent>
                     </Collapsible>
                  </ScrollArea>
               </CollapsibleContent>
            </Collapsible>

            <div class="flex items-center gap-1">
               <CalendarPrevButton class="static rotate-180" />
               <CalendarNextButton class="static rotate-180" />
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
.dir-ltr {
   direction: ltr;
}
</style>
