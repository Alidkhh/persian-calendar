export interface ComponentCategory {
   slug: string;
   name: string;
   components: { name: string }[];
   isNew?: boolean;
}

export const categories: ComponentCategory[] = [
   {
      slug: "calendar",
      name: "Calendar & Date picker",
      components: [
         { name: "Comp-1" },
         { name: "Comp-5" },
         { name: "Comp-2" },
         { name: "Comp-3" },
         { name: "Comp-13" },
         { name: "Comp-11" },
         { name: "Comp-4" },
         { name: "Comp-7" },
         { name: "Comp-6" },
         { name: "Comp-8" },
         { name: "Comp-9" },
         { name: "Comp-10" },
         { name: "Comp-12" },
      ],
   },
];
