import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
   compatibilityDate: "2025-05-15",
   devtools: { enabled: true },
   css: ["~/assets/css/main.css"],
   vite: {
      plugins: [tailwindcss()],
   },

   modules: ["@nuxt/fonts", "shadcn-nuxt", "@nuxt/image"],

   shadcn: {
      prefix: "",
      componentDir: "./registry/default/ui",
   },

   runtimeConfig: {
      public: {
         GITHUB: process.env.NUXT_GITHUB,
      },
   },
});
