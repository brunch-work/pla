import { PlusButton } from "./PlusButton";
import { RadioButton } from "./RadioButton";

import { useState } from "react";

export const AlphabeticalListSection = ({ letter, poets, poetActive, setPoetActive }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section key={letter}>
      <h2 onClick={() => setIsOpen(!isOpen)}>
        <PlusButton isActive={isOpen} />
        {letter}
      </h2>
      {isOpen && (
        <ul>
          {poets.map((poet) => (
            <li key={poet._id} onClick={() => setPoetActive(poet._id)}>
              <RadioButton
                active={poetActive[poet._id] || false}
                label={poet.name}
                name="poetsList"
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

