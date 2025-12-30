<script lang="ts" setup></script>

<template>
   <div class="flex min-h-[100vh] flex-col">
      <LayoutHeader />
      <LayoutBody>
         <div class="flex-1">
            <slot></slot>
         </div>
      </LayoutBody>
   </div>
</template>
