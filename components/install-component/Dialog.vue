<script lang="ts" setup>
import type { RegistryItem } from "shadcn-vue/registry";

const open = defineModel<boolean>("open", { default: false });

const props = defineProps<{
   component: RegistryItem;
}>();
</script>

<template>
   <Dialog v-model:open="open" :component="component">
      <DialogContent class="rounded-xl p-2 pt-4 pb-3 sm:max-w-2xl lg:p-4">
         <DialogHeader>
            <DialogTitle>Installation</DialogTitle>
         </DialogHeader>

         <div class="flex w-full flex-col gap-4 overflow-hidden">
            <InstallComponentCLI
               class="mt-5"
               :component-name="component.name"
            />

            <InstallComponentCodes :component="component" />
         </div>
      </DialogContent>
   </Dialog>
</template>
