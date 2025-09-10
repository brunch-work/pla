"use client";

import { Poet } from "../Poet";
import { useNavContext } from "@/utils/navContextProvider";
import { Sidebar } from "../Sidebar";

import { useMobile } from "@/hooks/useMobile";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Markdown from "react-markdown";

export default function ListPage({ list, pageDetails, pageType, searchParam }) {

  const searchParams = useSearchParams();
  const router = useRouter();
  const { setNavProps } = useNavContext();
  const isMobile = useMobile();
  const [activeItem, setActiveItem] = useState(searchParams.get(searchParam) || "");
  const [listOpen, setListOpen] = useState(
    !isMobile || (isMobile && !activeItem) ? true : false
  );
  let sortedList;

  console.log(list)

  // build alphabetical list for poets page
  if (pageType === "Poets") {
    sortedList = list.sort().reduce(function (acc, poet) {
      const firstLetter = poet.name[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(poet);
      return acc;
    }, {});
  } else {
    sortedList = list;
  }

  useEffect(() => {
    setNavProps({
      list: sortedList,
      subNavOpen: listOpen,
      setSubNavOpen: setListOpen,
      activeItem: activeItem
        ? list.find((p) => p.slug === activeItem).name
        : null,
      setActiveItem: setActiveItem,
      activeItemSlug: activeItem,
      itemType: "Poets",
    });
  }, [setNavProps, listOpen]);

  useEffect(() => {
    if (activeItem) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set(searchParam, activeItem);
      router.push(`?${current.toString()}`, { scroll: false });
    }

    if (isMobile && activeItem) {
      setListOpen(false);
    }
  }, [activeItem]);

  const handleSidebar = () => {
    if (!isMobile || (isMobile && !activeItem)) {
      return <Sidebar
        pageType={pageType}
        list={sortedList}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        listOpen={listOpen}
        setListOpen={setListOpen}
      />;
    }
  };

  return (
    <main className="list-page page subgrid">
      {handleSidebar()}

      {/* MAIN CONTENT */}
      <div className="main-content">
        {activeItem && <Poet poet={list.find((p) => p.slug === activeItem)} />}
        {!activeItem && pageDetails.pageContent && (
          <Markdown>{pageDetails.pageContent}</Markdown>
        )}
      </div>
    </main>
  );
}
