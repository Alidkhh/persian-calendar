<script lang="ts" setup>
import { categories } from "~/utils/components";

const route = useRoute();
const categorySlug = route.name as string;

const getCategory = (slug: string) =>
   categories.find((category) => category.slug === slug);

const category = getCategory(categorySlug);

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
      class="xxl:grid-cols-4 bg-foreground/20 mb-10 grid grid-cols-1 gap-[1px] md:grid-cols-2 lg:grid-cols-3"
   >
      <template v-for="component in components">
         <ComponentPreview :component="component">
            <div>
               <ComponentLoader :component="component"></ComponentLoader>
            </div>
         </ComponentPreview>
      </template>
   </div>
</template>
