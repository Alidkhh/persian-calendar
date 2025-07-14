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
   <div class="mb-20 w-full md:w-8/12">
      <Header>{{ routes.installation.title }}</Header>

      <div class="mt-5 [&>p]:my-6">
         <p>
            To install the components, you need to follow the
            <a
               href="https://www.shadcn-vue.com/docs/installation.html"
               class="text-blue-600 underline"
               >shadcn/vue installation guide</a
            >.
         </p>
         <p>After that you can install components with CLI.</p>
         <ComponentInstallation class="my-7" componentName="Comp-1" />
         <p>Or copy the source code of the component you want.</p>
         <ComponentInstallationCode class="my-7" :component="component" />
         <p>
            It's best to remember that you can combine the features of different
            calendars and create new calendars.
         </p>
      </div>
   </div>
</template>
