"use client";
import All from "@/components/All";
import React, { useEffect, useRef, useState } from "react";
import { exportedComponents } from "@/components/themes";
import type { ComponentName } from "../components/types/index";
import { arrayMoveImmutable } from "array-move";
import {
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/20/solid";
import Draggable from "react-draggable";

const Test2 = () => {
  // USE STATES ------------------------------------------------------------------------------
  const [renderedComponents, setRenderedComponents] = useState<ComponentName[]>(
    []
  );
  const [device, setDevice] = useState<"desktop" | "tablet" | "smartphone">(
    "desktop"
  );
  const [containerChildrenOrder, setContainerChildrenOrder] = useState<
    HTMLParagraphElement[]
  >([]);
  const [ys, setYs] = useState<number[]>([]);
  const [indexes, setIndexes] = useState<{
    from: number | undefined;
    to: number | undefined;
  }>({ from: undefined, to: undefined });
  const [triggerUpdateChildren, setTriggerUpdateChildren] = useState(true);

  // VARIABLES ------------------------------------------------------------------------------
  const everythingKeys: ComponentName[] = Object.keys(
    exportedComponents
  ) as ComponentName[];
  const container = useRef<HTMLDivElement | null>(null);

  // FUNCTIONS ------------------------------------------------------------------------------
  // Pushes created component to renderedComponents
  const handleComponentClick = (component: ComponentName) => {
    setRenderedComponents((prevComponents) => [...prevComponents, component]);
  };

  // Calculates the middle of the element you're dragging, then, finds the index of the closest
  // number in the ys array to your number. It then sets the indexes with setIndexes
  function handleDrag(index: number) {
    const yOfDraggedEl = calculateMiddle(containerChildrenOrder[index]);
    const targetIndex = ys.indexOf(closestNumber(ys, yOfDraggedEl));
    if (containerChildrenOrder[targetIndex]) {
      setIndexes({ from: index, to: targetIndex });
    }
  }

  // It switches the components of the renderedComponents
  function handleStop() {
    if (indexes.from !== undefined && indexes.to !== undefined) {
      setRenderedComponents(
        arrayMoveImmutable(renderedComponents, indexes.from, indexes.to)
      );
    }
    setIndexes({ from: undefined, to: undefined });
  }

  // It takes all the children of the container and then calculates the height from
  // the top to the middle of the element and puts it in the ys array
  function updateContainerChildren() {
    const containerChildren = container.current?.children;
    const simpleYs = [];
    if (containerChildren) {
      setContainerChildrenOrder(
        container.current?.children as unknown as HTMLParagraphElement[]
      );
      for (let i = 0; i < containerChildren.length; i++) {
        simpleYs.push(calculateMiddle(containerChildren[i]));
      }
      setYs(simpleYs);
    }
  }

  // UTILS FUNCTIONS ------------------------------------------------------------------------------
  function calculateMiddle(element: Element): number {
    const elRect = element.getBoundingClientRect();
    return elRect.top + elRect.height / 2;
  }

  function closestNumber(numbers: number[], target: number): number {
    const differences = numbers.map((number) => ({
      number: number,
      diff: Math.abs(number - target),
    }));
    const inOrder = differences.sort((a, b) => a.diff - b.diff);
    const closestNumber = inOrder[0].number;
    return closestNumber;
  }

  useEffect(updateContainerChildren, [triggerUpdateChildren]);

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
            onClick={() => {
              handleComponentClick(compName);
              setTriggerUpdateChildren((prev) => !prev);
            }}
          >
            {compName}
          </button>
        ))}
        <div ref={container} className="flex flex-col gap-2 relative">
          {renderedComponents.map((el, index) => {
            const checkings =
              indexes.to !== undefined &&
              indexes.from !== undefined &&
              index === indexes.to &&
              index !== indexes.from;
            return (
              <Draggable
                key={el + index}
                axis="y"
                // bounds="parent"
                position={{ x: 0, y: 0 }}
                onDrag={(e) => {
                  handleDrag(index);
                  console.log(e);
                }}
                onStop={handleStop}
              >
                <div>
                  {checkings && index <= indexes.from! && (
                    <div className="h-1 bg-red-500 w-full"></div>
                  )}
                  <p className="bg-neutral-700 py-1 px-2 rounded-md active:z-10 active:opacity-50">
                    {el + index}
                  </p>
                  {checkings && index >= indexes.from! && (
                    <div className="h-1 bg-red-500 w-full"></div>
                  )}
                </div>
              </Draggable>
            );
          })}
        </div>
      </section>
      {/* Canvas */}
      <section
        className={`grow overflow-y-auto mx-auto h-full ${
          device === "smartphone"
            ? "max-w-sm py-5"
            : device === "tablet"
            ? "max-w-3xl py-5"
            : "max-w-none"
        }`}
      >
        <div
          className={`bg-neutral-700 h-full ${
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

export default Test2;
