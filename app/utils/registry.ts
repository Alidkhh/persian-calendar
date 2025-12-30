import registry from "~~/registry.json";
import type { RegistryItem } from "shadcn-vue/registry";

export const components = [...registry.items] as unknown as RegistryItem[];

export function getComponentsByNames(names: string[]): RegistryItem[] {
   const componentsMap = new Map(components.map((comp) => [comp.name, comp]));

   return names
      .map((name) => componentsMap.get(name))
      .filter((comp): comp is RegistryItem => comp !== undefined);
}

export function getComponentByName(name: string): RegistryItem | undefined {
   return components.find((comp) => comp.name === name);
}
