<script lang="ts" setup>
import { categories } from "~/utils/components";
import { Loader } from "lucide-vue-next";

const getCategory = (slug: string) =>
   categories.find((category) => category.slug === slug);

const category = getCategory("calendar");

if (!category) {
   throw createError({
      statusCode: 404,
      message: ` not found`,
   });
}

const components = getComponentsByNames(
   category.components.map((item) => item.name),
);
</script>

<template>
   <div
      class="bg-foreground/20 mb-10 grid grid-cols-1 gap-[1px] lg:grid-cols-2 xl:grid-cols-3"
   >
      <template v-for="component in components">
         <ComponentPreview
            :component="component"
            :class="
               component.meta?.colSpan === 2
                  ? 'col-span-1 lg:col-span-2 xl:col-span-3'
                  : ''
            "
         >
            <div>
               <Suspense>
                  <template #default>
                     <div class="font-fa">
                        <ComponentLoader
                           :component="component"
                        ></ComponentLoader>
                     </div>
                  </template>
                  <template #fallback>
                     <div class="flex items-center justify-center p-34">
                        <Loader class="mx-auto size-5 animate-spin" />
                     </div>
                  </template>
               </Suspense>
            </div>
         </ComponentPreview>
      </template>
   </div>
</template>
