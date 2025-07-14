<script lang="ts" setup>
import { Code, Eye } from "lucide-vue-next";
import { codeToHtml } from "shiki";
import { MagicString } from "vue/compiler-sfc";

const props = defineProps<{
   title: string;
   rawCode: string;
}>();

const html = shallowRef("");
const code = shallowRef("");

function transformImportPath(code: string) {
   const s = new MagicString(code);
   s.replaceAll(`@/registry/default/ui`, "@/components");
   s.replaceAll(`@/registry/default/components`, "@/components");
   return s.toString();
}

onBeforeMount(async () => {
   const transformedCode = transformImportPath(props.rawCode);

   code.value = transformedCode;
   html.value = await codeToHtml(transformedCode, {
      lang: "vue",
      theme: "github-dark",
   });
});
</script>

<template>
   <div>
      <h3 class="text-xl font-bold mb-2">{{ title }}</h3>
      <Tabs default-value="preview" class="">
         <TabsList class="grid grid-cols-2">
            <TabsTrigger value="preview"> <Eye /> Preview </TabsTrigger>
            <TabsTrigger value="code"> <Code /> Code </TabsTrigger>
         </TabsList>
         <Separator />
         <TabsContent value="preview">
            <div
               class="bg-muted flex min-h-[25rem] w-full flex-col items-center justify-center rounded-xl border px-2 py-5"
            >
               <div>
                  <slot></slot>
               </div>
            </div>
         </TabsContent>
         <TabsContent value="code">
            <div class="relative">
               <div
                  class="[&_code]:font-mono [&_code]:text-[13px] [&_pre]:max-h-[25rem] [&_pre]:overflow-auto [&_pre]:rounded-xl [&_pre]:bg-zinc-900! [&_pre]:p-4 [&_pre]:leading-snug dark:[&_pre]:bg-zinc-900!"
                  v-html="html"
               ></div>
               <CopyButton :text="code" class="absolute top-2 right-3" />
            </div>
         </TabsContent>
      </Tabs>
   </div>
</template>
