import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({

   app: {
      pageTransition: { name: "page", mode: "out-in" },
      head: {
         charset: "utf-8",
         viewport: "width=device-width, initial-scale=1",
      },
   },

   nitro: {
    devProxy: {
      '/sw.js': { target: '/sw.js' }
    }
  },

   compatibilityDate: "2025-12-30",
   devtools: { enabled: true },
   css: ["~/assets/css/main.css"],
   vite: {
      plugins: [tailwindcss()],
   },

   modules: ["@nuxt/fonts", "shadcn-nuxt", "@nuxt/image", "@nuxtjs/color-mode"],

   fonts: {
      families: [
         { name: "Inter", provider: "google", global: true },
         { name: "Outfit", provider: "google", global: true },
      ],
   },

   shadcn: {
      prefix: "",
      componentDir: "./app/registry/default/ui",
   },

   runtimeConfig: {
      public: {
         github: "",
         baseUrl: "",
      },
   },

   routeRules: {
      "/": { prerender: true },
      "/docs/**": { prerender: true },
   },

   colorMode: {
      preference: "system",
      fallback: "light",
      classSuffix: "",
   },
});
