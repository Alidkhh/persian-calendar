<script setup lang="ts">
import type { RegistryItem } from "shadcn-vue/registry";
import { codeToHtml } from "shiki";
import { MagicString } from "vue/compiler-sfc";

const props = defineProps<{
   component: RegistryItem;
}>();

const html = shallowRef("");
const code = shallowRef("");

function transformImportPath(code: string) {
   const s = new MagicString(code);
   s.replaceAll(`@/registry/default`, "@/components");
   return s.toString();
}

onMounted(async () => {
   const rawCode = await import(
      `@/registry/default/components/${props.component.name}.vue?raw`
   ).then((res) => res.default.trim());

   const transformedCode = transformImportPath(rawCode);

   code.value = transformedCode;
   html.value = await codeToHtml(transformedCode, {
      lang: "vue",
      theme: "github-dark",
   });
});
</script>

<template>
   <div class="relative">
      <div
         class="[&_code]:font-mono [&_code]:text-[13px] [&_pre]:max-h-[450px] [&_pre]:overflow-auto [&_pre]:rounded-xl [&_pre]:bg-zinc-900! [&_pre]:p-4 [&_pre]:leading-snug  dark:[&_pre]:bg-zinc-900!"
         v-html="html"
      ></div>
      <CopyButton :text="code" class="absolute top-2 right-3" />
   </div>
</template>
