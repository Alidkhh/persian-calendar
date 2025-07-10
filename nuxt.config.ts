import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
   $development: {
      debug: true,
   },
   app: {
      pageTransition: { name: "page", mode: "out-in" },
      head: {
         charset: "utf-8",
         viewport: "width=device-width, initial-scale=1",
      },
   },

   compatibilityDate: "2025-05-15",
   devtools: { enabled: true },
   css: ["~/assets/css/main.css"],
   vite: {
      plugins: [tailwindcss()],
   },

   modules: ["@nuxt/fonts", "shadcn-nuxt", "@nuxt/image"],

   fonts: {
      families: [
         { name: "Inter", provider: "google", global: true },
         { name: "Outfit", provider: "google", global: true },
      ],
   },

   shadcn: {
      prefix: "",
      componentDir: "./registry/default/ui",
   },

   runtimeConfig: {
      public: {
         github: "",
         baseUrl: "",
      },
   },

   routeRules: {
      "/": { prerender: true },
      "/docs/Introduction": { prerender: true },
      "/docs/Installation": { prerender: true },
      "/docs/calendar": { prerender: true },
      "/docs/persianCalendar": { prerender: true },
   },
});
