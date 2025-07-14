<script lang="ts" setup>
import datePicker from "@/components/date-picker/index.vue?raw";
</script>

<template>
   <div class="mb-25 w-full md:w-8/12">
      <Header>{{ routes.datepicker.title }}</Header>
      <div class="[&>p]:my-6">
         <p>
            for use calendar components as Date Picker you can use shadcn/vue or
            reka-ui popover.
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
         <BlockViewerCode :rawCode="datePicker">
            <DatePicker class="font-fa" />
         </BlockViewerCode>
      </div>
   </div>
</template>
