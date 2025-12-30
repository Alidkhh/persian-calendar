<script lang="ts" setup>
import datePicker from "@/components/date-picker/index.vue?raw";
import datePickerRange from "@/components/date-picker/range.vue?raw";
</script>

<template>
   <div class="mb-25 w-full md:w-8/12">
      <HeadTitle>{{ routes.datepicker.title }}</HeadTitle>
      <div class="[&>p]:my-6">
         <p>
            The Date Picker is built using a composition of the Popover and
            Calendar or Range Calendar components.
         </p>
         <p>
            See installations instructions for the
            <a
               href="https://www.shadcn-vue.com/docs/components/popover"
               class="text-blue-600 underline"
               target="_blank"
               >Popover</a
            >
            and
            <NuxtLink
               :to="routes.installation.route"
               class="text-blue-600 underline"
               >Calendars</NuxtLink
            >
            components.
         </p>
         <BlockViewerCode title="Date Picker" :rawCode="datePicker">
            <DatePicker class="font-fa" />
         </BlockViewerCode>
         <!-- <p>and use popover for Range Calendars.</p> -->
         <BlockViewerCode
            title="Date Range Picker"
            :rawCode="datePickerRange"
            class="mt-10"
         >
            <DatePickerRange class="font-fa" />
         </BlockViewerCode>
      </div>
   </div>
</template>
