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
      components: [{ name: "Comp-1" }, { name: "Comp-2" }, { name: "Comp-5" }],
   },
];
