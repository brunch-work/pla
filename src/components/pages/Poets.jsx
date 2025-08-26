"use client";

import { PlusButton } from "../PlusButton";
import { AlphabeticalListSection } from "../AlphabeticalListSection";
import { useMobile } from "@/hooks/useMobile";

import { useEffect, useState } from "react";

export default function Poets({ poets, poetsIndex }) {
  const isMobile = useMobile();
  const [poetsOpen, setPoetsOpen] = useState(isMobile ? false : true);
  const [poetActive, setPoetActive] = useState({});

  let poetsList = poets.sort().reduce(function (acc, poet) {
    const firstLetter = poet.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(poet);
    return acc;
  }, {});

  const handlePoetChange = (poetId) => {
    setPoetActive({
      ...poetActive,
      [poetId]: !poetActive[poetId],
    });
  };

  useEffect(() => {
    console.log(poetActive);
  }, [poetActive]);

  return (
    <main className="poets page subgrid">
      <div className="sidebar">
        <h1 onClick={() => setPoetsOpen(!poetsOpen)}>
          <PlusButton isActive={poetsOpen} />
          Poets
        </h1>
        {poetsOpen && (
          <ul>
            {Object.entries(poetsList).map(([letter, poets]) => (
              <li key={letter}>
                <AlphabeticalListSection
                  letter={letter}
                  poets={poets}
                  poetActive={poetActive}
                  setPoetActive={handlePoetChange}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
