"use client";
import { exportedComponents } from "./themes";
import type { ComponentName } from "./types";

const componentsMap = { ...exportedComponents };

const All = ({ components }: { components: ComponentName[] }) => {
  return (
    <div>
      {components.map((component, index) => {
        const Component = componentsMap[component];
        return Component ? <Component key={`${component}-${index}`} /> : null;
      })}
    </div>
  );
};

export default All;
