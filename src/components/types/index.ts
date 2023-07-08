import { exportedComponents } from "../themes";
export type ComponentName = keyof typeof exportedComponents;
export interface ComponentObj {
  id: string;
  jsxElement: (arg: any) => JSX.Element;
  fields: { name: string; value?: string }[];
  name: string;
}
