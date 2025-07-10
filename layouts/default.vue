<script lang="ts" setup></script>

<template>
   <div class="flex min-h-[100vh] flex-col">
      <LayoutHeader />

      <LayoutBody>
         <div class="relative flex flex-1 gap-5">
            <div
               class="border-foreground/20 sticky top-[6.5rem] hidden h-full max-h-[calc(100vh-7.5rem)] w-[15rem] flex-shrink-0 overflow-y-auto border-e pe-2 font-sans text-sm md:block"
            >
               <RoutesMenu />
            </div>
            <div class="flex-1">
               <slot></slot>
            </div>
         </div>
      </LayoutBody>
   </div>
</template>
