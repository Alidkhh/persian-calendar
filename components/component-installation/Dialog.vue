<script lang="ts" setup>
const open = defineModel<boolean>("open", { default: false });

const props = defineProps<{
   componentName: string;
}>();
</script>

<template>
   <Dialog v-model:open="open" :component-name="componentName">
      <DialogContent class="sm:max-w-2xl">
         <DialogHeader>
            <DialogTitle>Installation</DialogTitle>
         </DialogHeader>

         <ComponentInstallation :component-name="componentName" />
      </DialogContent>
   </Dialog>
</template>
