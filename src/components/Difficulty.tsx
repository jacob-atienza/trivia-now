/*
 * File: Difficulty.tsx
 * Programmer: Jacob Atienza
 * Date: 2/27/2025
 * Description: This file has the Tabgroup containing the difficulty selection
 */
import { Tab, TabGroup, TabList } from "@headlessui/react";
import { useState } from "react";
/*
 * Function: Difficulty
 * Description: This function returns the difficulty selection tab group
 */
function Difficulty() {
  const [selected, setSelected] = useState(0);
  return (
    <>
      <label className="text-headline mx-auto mt-5 text-lg font-semibold sm:text-xl md:text-2xl">
        Difficulty
      </label>
      <TabGroup selectedIndex={selected} onChange={setSelected}>
        <TabList className="flex justify-center space-x-4 p-2">
          <Tab className="data-[selected]:border-btn-text data-[selected]:bg-btn data-[selected]:text-btn-text rounded border-transparent px-4 py-2">
            Any Difficulty
          </Tab>
          <Tab className="data-[selected]:border-btn-text data-[selected]:bg-btn data-[selected]:text-btn-text rounded border-transparent px-4 py-2">
            Easy
          </Tab>
          <Tab className="data-[selected]:border-btn-text data-[selected]:bg-btn data-[selected]:text-btn-text rounded border-transparent px-4 py-2">
            Medium
          </Tab>
          <Tab className="data-[selected]:border-btn-text data-[selected]:bg-btn data-[selected]:text-btn-text rounded border-transparent px-4 py-2">
            Hard
          </Tab>
        </TabList>
      </TabGroup>
    </>
  );
}

export default Difficulty;
