"use client";

import { PlusButton } from "./PlusButton";
import { RadioButton } from "./RadioButton";
import { AlphabeticalListSection } from "./AlphabeticalListSection";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { SWRfetch } from "@/utils/client";
import { GET_POETS_LIST, GET_INTERVIEWS_LIST, GET_SERIES_LIST, GET_DOCUMENTARIES_LIST } from "@/gql/queries";

export const SubNav = ({
  subNavOpen,
  setSubNavOpen,
  activeItem,
  itemType,
  activeItemTitle,
  pathname,
  searchParam,
  pageType,
}) => {

  let query;
  const [list, setList] = useState([]);

  if (itemType === "Poets") {
    query = GET_POETS_LIST;
  } else if (itemType === "Interviews") {
    query = GET_INTERVIEWS_LIST;
  } else if (itemType === "Series") {
    query = GET_SERIES_LIST;
  } else if (itemType === "Documentaries") {
    query = GET_DOCUMENTARIES_LIST;
  }

  const { data, error, mutate, isLoading } = useSWR(query, (query, variables) =>
    SWRfetch(query)
  );

  useEffect(() => {
    if (data) {
      mutate(data);

      if (itemType === "Poets") {
        setList(data.list.items.reduce(function (acc, poet) {
          const firstLetter = poet.title[0].toUpperCase();
          if (!acc[firstLetter]) {
            acc[firstLetter] = [];
          }
          acc[firstLetter].push(poet);
          return acc;
        }, {}));
      } else {
        setList(data.list.items);
      }
    }

  }, [searchParam, data]);

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
                  activePoet={activeItem}
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
            label={activeItemTitle}
            name="active-item"
            value={activeItem}
            active={true}
            url={`${pathname}?${searchParam}=${activeItem}`}
            ariaCurrent="page"
          />
        )}
        {list && subNavOpen && (
          <nav aria-labelledby={`${pageType} navigation`}>
            {renderList()}
          </nav>
        )}
      </div>
    </div>
  );
};
