"use client"

import { PlusButton } from "./PlusButton";
import { RadioButton } from "./RadioButton";
import { AlphabeticalListSection } from "./AlphabeticalListSection";

export const Sidebar = ({ pageType, list, activeItem, setActiveItem, listOpen, setListOpen }) => {

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
          className="body-text radio-button"
          onClick={() => setListOpen(!listOpen)}
        >
          <PlusButton isActive={listOpen} />
          <span>{pageType}</span>
        </h1>
        {listOpen && (
          <fieldset onChange={(e) => setActiveItem(e.target.value)}>
            {renderList()}
          </fieldset>
        )}
      </div>
    </div>
  );
}