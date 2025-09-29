import { PlusButton } from "./PlusButton";
import { RadioButton } from "./RadioButton";
import { motion } from "motion/react";
import { useMobile } from "@/hooks/useMobile";

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

  const menuVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
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

  return (
    <motion.li key={letter} variants={menuVariants} initial="hidden" animate="visible">
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
      {isOpen && (
        <motion.ul
          className="poets-list"
          variants={menuItemVariants}
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
    </motion.li>
  );
};
