import { PlusButton } from "./PlusButton";
import { RadioButton } from "./RadioButton";

import { act, useEffect, useState } from "react";

export const AlphabeticalListSection = ({ letter, poets, activePoet }) => {
  // Determine if the section is open based on the active poet
  const [isOpen, setIsOpen] = useState(
    activePoet && activePoet[0].toLowerCase() === letter.toLowerCase()
      ? true
      : false
  );

  return (
    <li key={letter}>
      <h2 className="body-text radio-button" onClick={() => setIsOpen(!isOpen)}>
        <PlusButton isActive={isOpen} />
        <span className="letter">{letter}</span>
      </h2>
      {isOpen && (
        <ul>
          {poets.map((poet) => (
            <li key={poet._id}>
              <RadioButton
                active={activePoet === poet.slug}
                label={poet.name}
                name="poetsList"
                value={poet.slug}
              />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
