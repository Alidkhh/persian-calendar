<script lang="ts" setup></script>

<template>
   <div class="mt-16 flex flex-col items-center justify-center gap-4 text-xl">
      <p>this is SUI or vue persian calendar</p>
      <p>i dont know</p>
      <NuxtLink :to="routes.calendar.route">
         <Button>{{ routes.calendar.title }}</Button>
      </NuxtLink>
   </div>
</template>
