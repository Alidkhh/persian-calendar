<script lang="ts" setup>
import { Clipboard, Check } from "lucide-vue-next";
import { useClipboard } from "@vueuse/core";

const props = defineProps<{
   componentName: string;
}>();

const { text, copy, copied, isSupported } = useClipboard();

type PackageManager = {
   name: string;
   command: string;
   isActive: boolean;
};

const packageManagers = ref<PackageManager[]>([
   {
      name: "pnpm",
      command: `pnpm dlx shadcn-vue@latest add https://www.originui-vue.com/r/${props.componentName}.json`,
      isActive: true,
   },
   {
      name: "yarn",
      command: `npx shadcn-vue@latest add https://www.originui-vue.com/r/${props.componentName}.json`,
      isActive: false,
   },
   {
      name: "npm",
      command: `npx shadcn-vue@latest add https://www.originui-vue.com/r/${props.componentName}.json`,
      isActive: false,
   },
   {
      name: "bun",
      command: `bunx --bun shadcn-vue@latest add https://www.originui-vue.com/r/${props.componentName}.json`,
      isActive: false,
   },
]);
const setActivePackageManager = (clickedItem: PackageManager) => {
   packageManagers.value.forEach((item) => {
      item.isActive = item.name === clickedItem.name;
   });
};
</script>

<template>
   <div class="flex flex-col rounded-xl bg-zinc-200 px-3 py-2">
      <div class="flex items-center justify-between">
         <div class="flex items-center gap-7 px-4">
            <span
               v-for="item in packageManagers"
               :key="item.name"
               :class="[
                  'relative cursor-pointer',
                  item.isActive
                     ? `text-foreground after:content-[' '] after:bg-foreground after:absolute after:start-1/2 after:-bottom-[calc(0.8rem-1px)] after:h-[1px] after:w-[140%] after:-translate-x-1/2`
                     : 'text-muted-foreground',
               ]"
               @click="setActivePackageManager(item)"
               >{{ item.name }}</span
            >
         </div>

         <TooltipProvider>
            <Tooltip>
               <TooltipTrigger as-child>
                  <Button
                     class="hover:bg-zinc-300"
                     size="sm"
                     variant="ghost"
                     @click="
                        copy(
                           packageManagers.find((item) => item.isActive)
                              ?.command || '',
                        )
                     "
                  >
                     <template v-if="copied">
                        <Check :size="20" class="text-green-700" />
                     </template>
                     <template v-else>
                        <Clipboard :size="20" />
                     </template>
                  </Button>
               </TooltipTrigger>
               <TooltipContent>
                  <span>Copy</span>
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>
      </div>
      <Separator class="bg-muted-foreground mt-2" />

      <div class="mt-4 mb-2">
         <p
            v-for="item in packageManagers"
            :key="item.name"
            :class="[
               !item.isActive ? 'hidden' : '',
               'install-command px-2 text-sm font-bold',
            ]"
         >
            {{ item.command }}
         </p>
      </div>
   </div>
</template>
<style scoped>
.install-command {
   word-spacing: 0.7rem;
}
</style>
