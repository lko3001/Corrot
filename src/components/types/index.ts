import { exportedComponents } from "../themes";
export type ComponentName = keyof typeof exportedComponents;
export interface ComponentObj {
  id: string;
  name: ComponentName;
}
