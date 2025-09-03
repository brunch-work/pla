"use client";

import { PlusButton } from "./PlusButton";
import { RadioButton } from "./RadioButton";
import { AlphabeticalListSection } from "./AlphabeticalListSection";

export const SubNav = ({
  subNavOpen,
  setSubNavOpen,
  list,
  activeItem,
  itemType,
  activeItemSlug,
  setActiveItem
}) => {

  const renderList = () => {
    if (itemType === "Poets") {
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
                  activePoet={activeItemSlug}
                />
              );
            })}
        </ul>
      );
    } else {
      return (
        <ul>
          {list.map((item) => (
            <li key={item.id}>
              <RadioButton
                label={item.name}
                name="active-item"
                value={item.id}
                active={item.id === activeItem}
              />
            </li>
          ))}
        </ul>
      )
    }
  };

  return (
    <div className="subgrid">
      <div className={`subnav ${subNavOpen ? "open" : ""}`}>
        <h1
          className="body-text radio-button"
          onClick={() => setSubNavOpen(!subNavOpen)}
        >
          <PlusButton isActive={subNavOpen} />
          <span>{itemType}</span>
        </h1>
        {activeItem && !subNavOpen && (
          <RadioButton
            label={activeItem}
            name="active-item"
            value={activeItemSlug}
            active={true}
          />
        )}
        {list && subNavOpen && (
          <fieldset onChange={(e) => setActiveItem(e.target.value)}>
            {renderList()}
          </fieldset>
        )}
      </div>
    </div>
  );
};

//  <div className={`sidebar ${poetsOpen ? "open" : ""}`}>
//    <div className="list">
//      <h1
//        className="body-text radio-button"
//        onClick={() => setPoetsOpen(!poetsOpen)}
//      >
//        <PlusButton isActive={poetsOpen} />
//        <span>Poets</span>
//      </h1>
//      {activePoet && !poetsOpen && (
//        <RadioButton
//          label={poets.find((p) => p.slug === activePoet).name}
//          name="active-poet"
//          value={poets.find((p) => p.slug === activePoet).slug}
//          active={true}
//        />
//      )}
//      {poetsOpen && (
//        <fieldset onChange={(e) => setActivePoet(e.target.value)}>
//          <ul>
//            {Object.keys(poetsList)
//              .sort()
//              .map((letter) => {
//                const poets = poetsList[letter];
//                return (
//                  <AlphabeticalListSection
//                    key={letter}
//                    letter={letter}
//                    poets={poets}
//                    activePoet={activePoet}
//                  />
//                );
//              })}
//          </ul>
//        </fieldset>
//      )}
//    </div>
//  </div>;
