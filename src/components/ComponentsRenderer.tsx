"use client";
import { exportedComponents } from "./themes";
import type { ComponentObj } from "./types";

const componentsMap = [...exportedComponents];

export default function ComponentRenderer({
  components,
}: {
  components: ComponentObj[];
}) {
  return (
    <div>
      {components.map((component, index) => {
        const Component = componentsMap.find(
          (el) => el.name === component.name
        )?.jsxElement;

        const props = component.fields.map((el) => ({
          [el.name]: el.value || "",
        }));
        const combinedProps = Object.assign({}, ...props);

        return Component ? (
          <Component key={`${component}-${index}`} {...combinedProps} />
        ) : null;
      })}
    </div>
  );
}
