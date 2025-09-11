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
  setActiveItem,
  pathname,
  searchParam,
  pageType,
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
                  pathname={pathname}
                  searchParam={searchParam}
                />
              );
            })}
        </ul>
      );
    } else {
      return (
        <ul>
          {list.map((item) => (
            <li key={item._id}>
              <RadioButton
                label={item.title}
                name="active-item"
                value={item.slug}
                active={item.slug === activeItemSlug}
                url={`${pathname}?${searchParam}=${item.slug}`}
                ariaCurrent={item.slug === activeItemSlug ? "page" : undefined}
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
            url={`${pathname}?${searchParam}=${activeItemSlug}`}
            ariaCurrent="page"
          />
        )}
        {list && subNavOpen && (
          <nav onChange={(e) => setActiveItem(e.target.value)} aria-labelledby={`${pageType} navigation`}>
            {renderList()}
          </nav>
        )}
      </div>
    </div>
  );
};
