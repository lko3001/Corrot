import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ComponentObj } from "../types";
import { ReactNode } from "react";

export default function SortableItem({
  id,
  component,
  children,
}: {
  id: string;
  component: ComponentObj;
  children?: ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-neutral-600 rounded-md py-1 px-2 mb-2 touch-none"
    >
      <h3 className="mb-1 font-semibold text-lg" {...attributes} {...listeners}>
        {component.name}
      </h3>
      {children}
    </div>
  );
}
