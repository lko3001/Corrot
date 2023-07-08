import Hero, { HeroFields } from "./Hero";
import ImageSection, { ImageSectionFields } from "./ImageSection";

export const exportedComponents: {
  id?: string;
  jsxElement: (arg: any) => JSX.Element;
  fields: { name: string; value?: string }[];
  name: string;
}[] = [
  {
    jsxElement: ImageSection,
    name: "ImageSection",
    fields: ImageSectionFields.map((el) => ({ name: el })),
  },
  {
    jsxElement: Hero,
    name: "Hero",
    fields: HeroFields.map((el) => ({ name: el })),
  },
];
