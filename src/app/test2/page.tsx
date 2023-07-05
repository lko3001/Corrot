"use client";
import React, { useState } from "react";
import { exportedComponents } from "@/components/themes";
import type { ComponentName, ComponentObj } from "../../components/types/index";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "@/components/dnd/SortableItem";

const Test = () => {
  const [renderedComponents, setRenderedComponents] = useState<ComponentObj[]>(
    []
  );

  const componentNames: ComponentName[] = Object.keys(
    exportedComponents
  ) as ComponentName[];

  const componentList: ComponentObj[] = componentNames.map((name) => ({
    id: getRandom(),
    name: name,
  }));

  console.log(componentList);

  const handleComponentClick = (component: ComponentName) => {
    setRenderedComponents((prevComponents) => [
      ...prevComponents,
      { id: getRandom(), name: component },
    ]);
  };

  function handleDragEnd(event: any) {
    const { active, over } = event;
    console.log(active, over, renderedComponents);

    if (active.id !== over.id) {
      setRenderedComponents((items) => {
        const oldIndex = items.findIndex(
          (component) => component.id === active.id
        );
        const newIndex = items.findIndex(
          (component) => component.id === over.id
        );

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function getRandom() {
    return Math.random().toString().split(".")[1];
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="flex flex-row h-full">
      <section className="p-6 bg-neutral-800 h-full flex flex-col gap-4 min-w-[200px]">
        {componentList.map((component, index) => (
          <button
            className="px-4 py-2 bg-neutral-700 rounded-md"
            key={component.id}
            onClick={() => handleComponentClick(component.name)}
          >
            {component.name}
          </button>
        ))}
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
        >
          <SortableContext
            items={renderedComponents}
            strategy={verticalListSortingStrategy}
          >
            {renderedComponents.map((component, index) => (
              <SortableItem
                key={component.id}
                id={component.id}
                name={component.name}
              />
            ))}
          </SortableContext>
        </DndContext>
      </section>
    </div>
  );
};

export default Test;
