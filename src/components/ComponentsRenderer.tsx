"use client";
import { exportedComponents } from "./themes";
import type { ComponentObj } from "./types";

const componentsMap = { ...exportedComponents };

export default function ComponentRenderer({
  components,
}: {
  components: ComponentObj[];
}) {
  return (
    <div>
      {components.map((component, index) => {
        const Component = componentsMap[component.name];
        return Component ? <Component key={`${component}-${index}`} /> : null;
      })}
    </div>
  );
}
