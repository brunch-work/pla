import { PlusButton } from "./PlusButton";
import { RadioButton } from "./RadioButton";
import { AnimatePresence, motion, stagger } from "motion/react";

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
    <li key={letter}>
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
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="poets-list"
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
              opacity: { duration: 0.2, delay: isOpen ? 0 : 0.2 },
              height: { duration: 0.4 },
              y: { duration: 0.2 },
              ease: [0, 0.55, 0.45, 1],
              type: "tween",
            }}
          >
            {poets.map((poet) => (
              <li key={poet._id}>
                <RadioButton
                  active={activePoet === poet.slug}
                  label={poet.title}
                  name="poetsList"
                  value={poet.slug}
                  url={`${pathname}?${searchParam}=${poet.slug}`}
                  ariaCurrent={activePoet === poet.slug ? "page" : undefined}
                />
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};
