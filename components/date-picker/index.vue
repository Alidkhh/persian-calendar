<script lang="ts" setup>
import {
   DateFormatter,
   type DateValue,
   getLocalTimeZone,
} from "@internationalized/date";
import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from "@/registry/default/ui/popover";
import { Input } from "@/registry/default/ui/input";
import Comp14 from "@/registry/default/components/Comp-14.vue";

const modelValue = ref<DateValue>();

const formatDate = new DateFormatter("fa-IR");
</script>

<template>
   <div>
      <Popover>
         <PopoverTrigger as-child>
            <Input
               class="bg-white"
               type="text"
               placeholder="Pick a date"
               readonly
               :value="
                  modelValue
                     ? formatDate.format(modelValue.toDate(getLocalTimeZone()))
                     : null
               "
            />
         </PopoverTrigger>
         <PopoverContent class="w-auto border-none p-0 shadow-none">
            <Comp14 v-model="modelValue" />
         </PopoverContent>
      </Popover>
   </div>
</template>
