<script lang="ts" setup>
const props = defineProps<{
   componentName: string;
}>();

const config = useRuntimeConfig();

type PackageManager = {
   name: string;
   command: string;
   isActive: boolean;
};

const packageManagers = ref<PackageManager[]>([
   {
      name: "pnpm",
      command: `pnpm dlx shadcn-vue@latest add ${config.public.baseUrl}/r/${props.componentName}.json`,
      isActive: true,
   },
   {
      name: "yarn",
      command: `npx shadcn-vue@latest add ${config.public.baseUrl}/r/${props.componentName}.json`,
      isActive: false,
   },
   {
      name: "npm",
      command: `npx shadcn-vue@latest add ${config.public.baseUrl}/r/${props.componentName}.json`,
      isActive: false,
   },
   {
      name: "bun",
      command: `bunx --bun shadcn-vue@latest add ${config.public.baseUrl}/r/${props.componentName}.json`,
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
   <div class="flex w-full flex-col overflow-hidden rounded-xl bg-zinc-900">
      <div class="flex items-center justify-between px-3 pt-2">
         <div class="flex items-center gap-1">
            <span
               v-for="item in packageManagers"
               :key="item.name"
               :class="[
                  'relative w-14 cursor-pointer text-center select-none',
                  item.isActive
                     ? `after:content-[' '] text-white after:absolute after:start-1/2 after:-bottom-[calc(0.8rem-1px)] after:h-[2px] after:w-[110%] after:-translate-x-1/2 after:bg-white`
                     : 'text-zinc-400',
               ]"
               @click="setActivePackageManager(item)"
               >{{ item.name }}</span
            >
         </div>

         <CopyButton
            :text="packageManagers.find((item) => item.isActive)?.command || ''"
         />
      </div>
      <Separator class="mt-2 bg-zinc-700" />

      <div class="px-1">
         <ScrollArea class="w-full px-2 pb-2">
            <p
               v-for="item in packageManagers"
               :key="item.name"
               :class="[
                  !item.isActive ? 'hidden' : '',
                  'install-command dir-ltr px-2 pt-4 pb-2 font-mono text-sm  text-nowrap text-white',
               ]"
            >
               {{ item.command }}
            </p>
            <ScrollBar orientation="horizontal" />
         </ScrollArea>
      </div>
   </div>
</template>
<style scoped>
.install-command {
   word-spacing: 0.5rem;
}
</style>
