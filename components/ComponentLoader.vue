<script setup lang="ts">
import { ConfigProvider } from "reka-ui";
import type { RegistryItem } from "shadcn-vue/registry";

const props = defineProps<{
   component: RegistryItem;
}>();

const component = await import(
   `~/registry/default/components/${props.component.name}.vue`
).then((res) => res.default);
</script>
<template>
   <ConfigProvider dir="rtl">
      <component :is="component" />
   </ConfigProvider>
</template>
