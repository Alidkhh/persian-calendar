<script lang="ts" setup>
import { getComponentByName } from "../../utils/registry";
import type { RegistryItem } from "shadcn-vue/registry";

const component: RegistryItem | undefined = getComponentByName("Comp-1");

if (!component) {
   throw createError({
      statusCode: 404,
      message: ` not found`,
   });
}
</script>

<template>
   <div class="w-full md:w-8/12">
      <Header>Installation</Header>

      <div class="mt-5 mb-10 [&>p]:my-6">
         <p>
            To install the components, you need to follow the
            <a
               href="https://www.shadcn-vue.com/docs/installation.html"
               class="text-blue-600 underline"
               >shadcn/vue installation guide</a
            >.
         </p>
         <p>After that you can install components with CLI.</p>
         <div class="max-w-[90vw]">
            <ComponentInstallation class="my-7" componentName="Comp-1" />
         </div>
         <p>Or copy the source code of the component you want.</p>
         <div class="max-w-[90vw]">
            <ComponentInstallationCode class="my-7" :component="component" />
         </div>
         <p>
            It's best to remember that you can combine the features of different
            calendars and create new calendars.
         </p>
      </div>
   </div>
</template>
