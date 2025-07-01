<script setup lang="ts">
import { ConfigProvider } from "reka-ui";
</script>
<template>
   <div>
      <NuxtLayout>
         <ConfigProvider dir="rtl">
            <NuxtPage />
         </ConfigProvider>
      </NuxtLayout>
   </div>
</template>
