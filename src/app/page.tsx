"use client";
import ComponentRenderer from "@/components/ComponentsRenderer";
import React, { useState } from "react";
import { exportedComponents } from "@/components/themes";
import type { ComponentName, ComponentObj } from "@/components/types/index";
import {
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/20/solid";
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
import {
  restrictToParentElement,
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import SortableItem from "@/components/dnd/SortableItem";

export default function Home() {
  //
  // USE STATES ------------------------------------------------------------------------------
  const [renderedComponents, setRenderedComponents] = useState<ComponentObj[]>(
    []
  );
  const [device, setDevice] = useState<"desktop" | "tablet" | "smartphone">(
    "desktop"
  );

  // VARIABLES ------------------------------------------------------------------------------
  const componentNames: ComponentName[] = Object.keys(
    exportedComponents
  ) as ComponentName[];

  const componentList: ComponentObj[] = componentNames.map((name) => ({
    id: getRandom(),
    name: name,
  }));

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // FUNCTIONS ------------------------------------------------------------------------------
  function handleComponentClick(component: ComponentName) {
    setRenderedComponents((prevComponents) => [
      ...prevComponents,
      { id: getRandom(), name: component },
    ]);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;

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

  return (
    <div className="flex flex-row h-full">
      {/* Sidebar */}
      <section className="p-6 bg-neutral-800 h-full flex flex-col gap-4 min-w-[200px]">
        {/* ICONS - DEVICE */}
        <div className="flex flex-row justify-around relative">
          <input
            type="radio"
            className="peer/desktop hidden"
            id="desktop"
            checked={device === "desktop"}
            onChange={() => setDevice("desktop")}
          />
          <label
            htmlFor="desktop"
            className="hover:bg-neutral-700 transition-colors peer-checked/desktop:text-neutral-800 cursor-pointer peer-checked/desktop:bg-white rounded-full p-2"
          >
            <ComputerDesktopIcon className="h-5" />
          </label>
          <input
            type="radio"
            className="peer/tablet hidden"
            id="tablet"
            checked={device === "tablet"}
            onChange={() => setDevice("tablet")}
          />
          <label
            htmlFor="tablet"
            className="hover:bg-neutral-700 transition-colors peer-checked/tablet:text-neutral-800 cursor-pointer peer-checked/tablet:bg-white rounded-full p-2"
          >
            <DeviceTabletIcon className="h-5" />
          </label>
          <input
            type="radio"
            className="peer/smartphone hidden"
            id="smartphone"
            checked={device === "smartphone"}
            onChange={() => setDevice("smartphone")}
          />
          <label
            htmlFor="smartphone"
            className="hover:bg-neutral-700 transition-colors peer-checked/smartphone:text-neutral-800 cursor-pointer peer-checked/smartphone:bg-white rounded-full p-2"
          >
            <DevicePhoneMobileIcon className="h-5" />
          </label>
        </div>
        {/* Buttons to Create the Components */}
        {componentList.map((component) => (
          <button
            className="px-4 py-2 bg-neutral-700 rounded-md"
            key={component.id}
            onClick={() => handleComponentClick(component.name)}
          >
            {component.name}
          </button>
        ))}
        <div>
          <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
            modifiers={[
              restrictToVerticalAxis,
              restrictToParentElement,
              restrictToWindowEdges,
            ]}
          >
            <SortableContext
              items={renderedComponents}
              strategy={verticalListSortingStrategy}
            >
              {renderedComponents.map((component) => (
                <SortableItem
                  key={component.id}
                  id={component.id}
                  name={component.name}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </section>
      {/* Canvas */}
      <section
        className={`grow overflow-y-auto mx-auto h-full transition-all ${
          device === "smartphone"
            ? "max-w-sm py-5"
            : device === "tablet"
            ? "max-w-3xl py-5"
            : "max-w-none"
        }`}
      >
        <div
          className={`bg-neutral-700 h-full overflow-hidden overflow-y-auto @container ${
            device === "smartphone" || device === "tablet"
              ? "rounded-md"
              : "rounded-none"
          }`}
        >
          <ComponentRenderer components={renderedComponents} />
        </div>
      </section>
    </div>
  );
}
