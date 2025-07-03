<script lang="ts" setup>
const open = defineModel<boolean>("open", { default: false });

const props = defineProps<{
   componentName: string;
}>();
</script>

<template>
   <Dialog v-model:open="open" :component-name="componentName">
      <DialogContent class="rounded-xl p-2 pt-4 pb-3 sm:max-w-2xl lg:p-4">
         <DialogHeader>
            <DialogTitle>Installation</DialogTitle>
         </DialogHeader>

         <ComponentInstallation class="mt-5" :component-name="componentName" />
      </DialogContent>
   </Dialog>
</template>
