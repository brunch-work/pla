"use client"

import { PlusButton } from "./PlusButton";
import { RadioButton } from "./RadioButton";
import { AlphabeticalListSection } from "./AlphabeticalListSection";
import { AnimatePresence, motion } from "motion/react";

export const Sidebar = ({ pageType, list, activeItem, listOpen, setListOpen, pathname, searchParam }) => {

  const renderList = () => {

    // Alphabetical list for poets page only
    if (pageType === "Poets") {
      return (
        <ul>
          {Object.keys(list)
            .sort()
            .map((letter) => {
              const poets = list[letter];
              return (
                <AlphabeticalListSection
                  key={letter}
                  letter={letter}
                  poets={poets}
                  activePoet={activeItem}
                  pathname={pathname}
                  searchParam={searchParam}
                />
              );
            })}
        </ul>
      );
    }

    return (
      <ul>
        {list.map((item) => (
          <li key={item._id}>
            <RadioButton
              active={activeItem === item.slug}
              label={item.title}
              name="poetsList"
              value={item.slug}
              url={`${pathname}?${searchParam}=${item.slug}`}
              ariaCurrent={activeItem === item.slug ? "page" : undefined}
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="sidebar">
      <div className="list">
        <h1
          className="body-text"
          onClick={() => setListOpen(!listOpen)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setListOpen(!listOpen);
            }
          }}
          tabIndex={0}
          id="sidebar-heading"
        >
          <PlusButton isActive={listOpen} />
          <span>{pageType}</span>
        </h1>
        <AnimatePresence>
          {listOpen && (
            <motion.nav
              initial={{
                opacity: 0,
                height: 0,
                y: -25,
              }}
              animate={{
                opacity: 1,
                height: "auto",
                y: 0,
              }}
              exit={{ opacity: 0, height: 0, y: -25 }}
              transition={{
                opacity: { duration: 0.2, delay: listOpen ? 0 : 0.2 },
                height: { duration: 0.4 },
                y: { duration: 0.2 },
                ease: [0, 0.55, 0.45, 1],
                type: "tween",
              }}
              aria-labelledby="sidebar-heading"
            >
              {renderList()}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}