import { PlusButton } from "./PlusButton";
import { RadioButton } from "./RadioButton";

import { useState } from "react";

export const AlphabeticalListSection = ({ letter, poets, activePoet, pathname, searchParam }) => {
  // Determine if the section is open based on the active poet
  const [isOpen, setIsOpen] = useState(
    activePoet && activePoet[0].toLowerCase() === letter.toLowerCase()
      ? true
      : false
  );

  return (
    <li key={letter}>
      <h2 className="body-text"
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(!isOpen);
          }
        }}>
        <PlusButton isActive={isOpen} />
        <span className="letter">{letter}</span>
      </h2>
      {isOpen && (
        <ul>
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
        </ul>
      )}
    </li>
  );
};
