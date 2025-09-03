"use client";

import { PlusButton } from "../PlusButton";
import { AlphabeticalListSection } from "../AlphabeticalListSection";
import { Poet } from "../Poet";
import { useNavContext } from "@/utils/navContextProvider";

import { useMobile } from "@/hooks/useMobile";

import { act, use, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Markdown from "react-markdown";

export default function Poets({ poets, poetsIndex }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setNavProps } = useNavContext();
  const isMobile = useMobile();
  const [activePoet, setActivePoet] = useState(searchParams.get("poet") || "");
  const [poetsOpen, setPoetsOpen] = useState(!isMobile ? true : false);

  // place each poet in the correct alphabetical list
  let poetsList = poets.sort().reduce(function (acc, poet) {
    const firstLetter = poet.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(poet);
    return acc;
  }, {});

  useEffect(() => {
    setNavProps({
      list: poetsList,
      subNavOpen: poetsOpen,
      setSubNavOpen: setPoetsOpen,
      activeItem: activePoet ? poets.find((p) => p.slug === activePoet).name : null,
      setActiveItem: setActivePoet,
      activeItemSlug: activePoet,
      itemType: "Poets"
    })
  }, [setNavProps, poetsOpen])

  useEffect(() => {
    if (activePoet) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set("poet", activePoet);
      router.push(`?${current.toString()}`, { scroll: false });
    }

    if (isMobile && activePoet) {
      setPoetsOpen(false);
    }
  }, [activePoet]);

  return (
    <main className="poets page subgrid">

      {!isMobile && (
        <div className="sidebar">
          <div className="list">
            <h1
              className="body-text radio-button"
              onClick={() => setPoetsOpen(!poetsOpen)}
            >
              <PlusButton isActive={poetsOpen} />
              <span>Poets</span>
            </h1>
            {poetsOpen && (
              <fieldset onChange={(e) => setActivePoet(e.target.value)}>
                <ul>
                  {Object.keys(poetsList).sort().map((letter) => {
                    const poets = poetsList[letter];
                    return (
                      <AlphabeticalListSection
                        key={letter}
                        letter={letter}
                        poets={poets}
                        activePoet={activePoet}
                      />
                    );
                  })}
                </ul>
              </fieldset>
            )}
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="main-content">
        {activePoet && (
          <Poet poet={poets.find((p) => p.slug === activePoet)} />
        )}
        {!activePoet && poetsIndex.pageDescription && (
          <Markdown>{poetsIndex.pageDescription}</Markdown>
        )}
      </div>
    </main>
  );
}
