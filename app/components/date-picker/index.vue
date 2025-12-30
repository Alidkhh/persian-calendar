<script lang="ts" setup>
import {
   DateFormatter,
   type DateValue,
   getLocalTimeZone,
   today,
   toCalendar,
   createCalendar,
} from "@internationalized/date";
import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from "@/registry/default/ui/popover";
import { Input } from "@/registry/default/ui/input";
import Comp14 from "@/registry/default/components/Comp-14.vue";

const todayDate = toCalendar(
   today(getLocalTimeZone()),
   createCalendar("persian"),
);

const modelValue = ref(todayDate) as Ref<DateValue>;

const formatDate = computed(() => {
   return new DateFormatter("fa-IR").format(
      modelValue.value.toDate(getLocalTimeZone()),
   );
});
</script>

<template>
   <div>
      <Popover>
         <PopoverTrigger as-child>
            <Input
               class="!bg-primary-foreground text-center"
               type="text"
               placeholder="Pick a date"
               readonly
               v-model="formatDate"
            />
         </PopoverTrigger>
         <PopoverContent class="w-auto border-none p-0 shadow-none">
            <Comp14 v-model="modelValue" />
         </PopoverContent>
      </Popover>
   </div>
</template>
