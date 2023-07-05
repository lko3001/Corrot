"use client";
import All from "@/components/All";
import React, { useEffect, useRef, useState } from "react";
import { exportedComponents } from "@/components/themes";
import type { ComponentName } from "../../components/types/index";
import {
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/20/solid";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
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
  // USE STATES ------------------------------------------------------------------------------
  const [renderedComponents, setRenderedComponents] = useState<ComponentName[]>(
    []
  );
  const [keys, setKeys] = useState([]);
  const [device, setDevice] = useState<"desktop" | "tablet" | "smartphone">(
    "desktop"
  );

  // VARIABLES ------------------------------------------------------------------------------
  const everythingKeys: ComponentName[] = Object.keys(
    exportedComponents
  ) as ComponentName[];

  // FUNCTIONS ------------------------------------------------------------------------------
  // Pushes created component to renderedComponents
  const handleComponentClick = (component: ComponentName) => {
    setRenderedComponents((prevComponents) => [...prevComponents, component]);
  };

  function handleOnDragEnd(result: DropResult) {
    const items = Array.from(renderedComponents);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination!.index, 0, reorderedItem);

    setRenderedComponents(items);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setRenderedComponents((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
        {everythingKeys.map((compName, index) => (
          <button
            className="px-4 py-2 bg-neutral-700 rounded-md"
            key={compName + index}
            onClick={() => handleComponentClick(compName)}
          >
            {compName}
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
            {renderedComponents.map((el, index) => (
              <SortableItem
                key={el + index}
                id={el + (index + 0.5)}
                name={el}
              />
            ))}
          </SortableContext>
        </DndContext>
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
          <All components={renderedComponents} />
        </div>
      </section>
    </div>
  );
};

export default Test;
