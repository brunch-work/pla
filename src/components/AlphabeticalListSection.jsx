import { PlusButton } from "./PlusButton";
import { RadioButton } from "./RadioButton";
import { menuItemVariants } from "@/motion/menus";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export const AlphabeticalListSection = ({
  letter,
  poets,
  activePoet,
  pathname,
  searchParam,
}) => {
  // Determine if the section is open based on the active poet
  const [isOpen, setIsOpen] = useState(
    activePoet && activePoet[0].toLowerCase() === letter.toLowerCase()
      ? true
      : false
  );

  return (
    <motion.li key={letter} variants={menuItemVariants}>
      <h2
        className="body-text"
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsOpen(!isOpen);
          }
        }}
      >
        <PlusButton isActive={isOpen} />
        <span className="letter">{letter}</span>
      </h2>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.ul
            className="poets-list"
            variants={menuItemVariants}
            key={letter}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
              {poets.map((poet) => (
                <motion.li key={poet._id} variants={menuItemVariants}>
                  <RadioButton
                    active={activePoet === poet.slug}
                    label={poet.title}
                    name="poetsList"
                    value={poet.slug}
                    url={`${pathname}?${searchParam}=${poet.slug}`}
                    ariaCurrent={activePoet === poet.slug ? "page" : undefined}
                  />
                </motion.li>
              ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.li>
  );
};
