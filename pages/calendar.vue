<script lang="ts" setup>
import {
   type DateValue,
   createCalendar,
   getLocalTimeZone,
   toCalendar,
   today,
} from "@internationalized/date";
import { Code, Clipboard } from "lucide-vue-next";

const value = ref(
   toCalendar(today(getLocalTimeZone()), createCalendar("persian")),
) as Ref<DateValue>;

const showDialog = ref(false);

type PackageManager = {
   name: string;
   command: string;
   isActive: boolean;
};

const packageManagers = ref<PackageManager[]>([
   {
      name: "pnpm",
      command:
         "pnpm dlx shadcn-vue@latest add https://www.originui-vue.com/r/comp-488.json",
      isActive: true,
   },
   {
      name: "yarn",
      command:
         "npx shadcn-vue@latest add https://www.originui-vue.com/r/comp-488.json",
      isActive: false,
   },
   {
      name: "npm",
      command:
         "npx shadcn-vue@latest add https://www.originui-vue.com/r/comp-488.json",
      isActive: false,
   },
   {
      name: "bun",
      command:
         "bunx --bun shadcn-vue@latest add https://www.originui-vue.com/r/comp-488.json",
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
   <div
      class="xxl:grid-cols-4 bg-background mb-10 grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3"
   >
      <div
         v-for="i in 4"
         class="relative flex justify-center rounded-lg bg-zinc-100 p-8"
      >
         <TooltipProvider>
            <Tooltip>
               <TooltipTrigger as-child class="absolute end-0 top-0 m-3">
                  <Button
                     class="hover:bg-zinc-300"
                     size="sm"
                     variant="outline"
                     @click="showDialog = true"
                  >
                     <Code :size="20" />
                  </Button>
               </TooltipTrigger>
               <TooltipContent>
                  <span>Installation code</span>
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>

         <Calendar v-model="value" />
      </div>
   </div>

   <Dialog v-model:open="showDialog">
      <DialogContent class="sm:max-w-2xl">
         <DialogHeader>
            <DialogTitle>Installation</DialogTitle>
         </DialogHeader>
         <div class="flex flex-col rounded-xl bg-zinc-200 px-3 py-2">
            <div class="flex items-center justify-between">
               <div class="flex items-center gap-3">
                  <span
                     v-for="item in packageManagers"
                     :key="item.name"
                     :class="[
                        'relative cursor-pointer',
                        item.isActive
                           ? `text-foreground after:content-[' '] after:bg-foreground after:absolute after:start-0 after:-bottom-2 after:h-[2px] after:w-full`
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
                        >
                           <Clipboard :size="20" />
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent>
                        <span>Copy</span>
                     </TooltipContent>
                  </Tooltip>
               </TooltipProvider>
            </div>

            <Separator class="bg-muted-foreground mt-1" />

            <div class="mt-4 mb-2">
               <p
                  v-for="item in packageManagers"
                  :key="item.name"
                  :class="[!item.isActive ? 'hidden' : '', 'text-sm font-bold']"
               >
                  {{ item.command }}
               </p>
            </div>
         </div>
         <!-- <DialogFooter class="sm:justify-start">
            <DialogClose as-child>
               <Button type="button" variant="secondary"> Close </Button>
            </DialogClose>
         </DialogFooter> -->
      </DialogContent>
   </Dialog>
</template>
