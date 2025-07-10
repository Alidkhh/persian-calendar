<script lang="ts" setup>
const libraries = [
   { title: "Reka-ui", link: "https://reka-ui.com/" },
   {
      title: "Internationalized/date",
      link: "https://react-spectrum.adobe.com/internationalized/date/index.html",
   },
   { title: "shadcn/vue", link: "https://www.shadcn-vue.com/" },
   { title: "shadcn-ui", link: "https://ui.shadcn.com/" },
];
</script>

<template>
   <div class="w-full md:w-9/12">
      <Header>Introduction</Header>

      <div class="mt-5 mb-20 [&>p]:my-6">
         <p>
            A collection of Calendar & Datepicker components for building
            high-quality, accessible design systems and web apps using Vue.js.
         </p>
         <p>
            This is NOT a component library (yet). It's a collection of
            re-usable components that you can copy and paste or use the CLI to
            add to your apps.
         </p>
         <p class="font-bold">What do you mean not a component library?</p>
         <p>
            It means you do not install it as a dependency. It is not available
            or distributed via npm, with no plans to publish it. Pick the
            components you need. Use the CLI to automatically add the
            components, or copy and paste the code into your project and
            customize to your needs. The code is yours.
         </p>

         <p>
            In this project we follow the idea of shadcn and use tailwindCSS for
            styling.
         </p>
         <p>
            We mainly use or take ideas from the following libraries in this
            project:
         </p>
         <div class="mt-1 inline-flex flex-col gap-3">
            <a
               v-for="lib in libraries"
               :key="lib.title"
               target="_blank"
               :href="lib.link"
               class="text-blue-600 hover:underline"
               >{{ lib.title }}</a
            >
         </div>
      </div>
   </div>
</template>
