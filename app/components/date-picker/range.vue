<script lang="ts" setup>
import {
   DateFormatter,
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
import Comp5 from "@/registry/default/components/Comp-5.vue";

const todayDate = toCalendar(
   today(getLocalTimeZone()),
   createCalendar("persian"),
);

const start = todayDate;
const end = start.add({ days: 3 });

const modelValue = ref({ start, end }) as Ref<{
   start: typeof start;
   end: typeof end;
}>;

const formatDate = computed(() => {
   const formatter = new DateFormatter("fa-IR");
   return `${formatter.format(modelValue.value.start.toDate(getLocalTimeZone()))} - ${formatter.format(
      modelValue.value.end.toDate(getLocalTimeZone()),
   )}`;
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
            <Comp5 v-model="modelValue" />
         </PopoverContent>
      </Popover>
   </div>
</template>
