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
import { CalendarFooter } from "@/registry/default/ui/calendar";

import {
   type DateValue,
   createCalendar,
   getLocalTimeZone,
   toCalendar,
   today,
   CalendarDate,
   PersianCalendar,
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
   >
      <slot
         :weekDays="weekDays"
         :grid="grid"
         :modelValue="modelValue"
         :placeholder="placeholder"
      ></slot>
      <CalendarFooter
         v-if="showFooter"
         v-model="modelValue"
         v-model:selected-date="selectedDate"
      />
   </CalendarRoot>
</template>
