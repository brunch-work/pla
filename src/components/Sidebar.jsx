"use client"

import { PlusButton } from "./PlusButton";
import { AlphabeticalListSection } from "./AlphabeticalListSection";

export const Sidebar = ({ pageType, list, activeItem, setActiveItem, listOpen, setListOpen }) => {

  if (pageType === "poets" ) {
    return (
      <div className="sidebar">
        <div className="list">
          <h1
            className="body-text radio-button"
            onClick={() => setListOpen(!listOpen)}
          >
            <PlusButton isActive={listOpen} />
            <span>Poets</span>
          </h1>
          {listOpen && (
            <fieldset onChange={(e) => setActiveItem(e.target.value)}>
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
                      />
                    );
                  })}
              </ul>
            </fieldset>
          )}
        </div>
      </div>
    );
  }

  return null;
}