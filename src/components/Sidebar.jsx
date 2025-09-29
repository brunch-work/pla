"use client"

import { PlusButton } from "./PlusButton";
import { RadioButton } from "./RadioButton";
import { AlphabeticalListSection } from "./AlphabeticalListSection";
import { AnimatePresence, motion } from "motion/react";

export const Sidebar = ({ pageType, list, activeItem, listOpen, setListOpen, pathname, searchParam }) => {

   const menuVariants = {
     hidden: {
       opacity: 0,
     },
     visible: {
       opacity: 1,
       transition: {
         staggerChildren: 0.01,
         ease: [0, 0.55, 0.45, 1],
         type: "tween",
         duration: 0.5,
       },
     },
   };

   const menuItemVariants = {
     hidden: {
       opacity: 0,
       y: -5,
       transition: {
         ease: [0, 0.55, 0.45, 1],
         type: "tween",
         duration: 0.3,
       },
     },
     visible: {
       opacity: 1,
       y: 0,
       transition: {
         staggerChildren: 0.01,
         ease: [0, 0.55, 0.45, 1],
         type: "tween",
         duration: 0.3,
       },
     },
   };

  const renderList = () => {

    // Alphabetical list for poets page only
    if (pageType === "Poets") {
      return (
        <motion.ul variants={menuVariants} initial="hidden" animate="visible">
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
        </motion.ul>
      );
    }

    return (
      <motion.ul variants={menuVariants} initial="hidden" animate="visible">
        {list.map((item) => (
          <motion.li key={item._id} variants={menuItemVariants}>
            <RadioButton
              active={activeItem === item.slug}
              label={item.title}
              name="poetsList"
              value={item.slug}
              url={`${pathname}?${searchParam}=${item.slug}`}
              ariaCurrent={activeItem === item.slug ? "page" : undefined}
            />
          </motion.li>
        ))}
      </motion.ul>
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
          {listOpen && (
            <nav
              aria-labelledby="sidebar-heading"
            >
              {renderList()}
            </nav>
          )}
      </div>
    </div>
  );
}