"use client";

import { Poet } from "../Poet";
import { useNavContext } from "@/utils/navContextProvider";
import { Sidebar } from "../Sidebar";
import { VideoPlayer } from "../VideoPlayer";

import { useMobile } from "@/hooks/useMobile";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Markdown from "react-markdown";

export default function ListPage({ list, pageDetails, searchParam, sidebarLabel }) {

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { setNavProps } = useNavContext();
  const isMobile = useMobile();
  const [activeItem, setActiveItem] = useState(searchParams.get(searchParam) || "");
  const [listOpen, setListOpen] = useState(
    !isMobile || (isMobile && !activeItem) ? true : false
  );
  let sortedList;

  // build alphabetical list for poets page
  if (sidebarLabel === "Poets") {
    sortedList = list.sort().reduce(function (acc, poet) {
      const firstLetter = poet.title[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(poet);
      return acc;
    }, {});
  } else {
    sortedList = list;
  }

  // props for mobile nav
  useEffect(() => {
    setNavProps({
      list: sortedList,
      subNavOpen: listOpen,
      setSubNavOpen: setListOpen,
      activeItem: activeItem
        ? list.find((p) => p.slug === activeItem).title
        : null,
      setActiveItem: setActiveItem,
      activeItemSlug: activeItem,
      itemType: sidebarLabel,
      pathname: pathname,
      searchParam: searchParam,
      pageType: sidebarLabel,
    });
  }, [setNavProps, listOpen, router, searchParams]);

  // handle search param change
  useEffect(() => {
    const newActiveItem = searchParams.get(searchParam);
    console.log(newActiveItem);
    if (newActiveItem !== activeItem) {
      setActiveItem(newActiveItem);
    }
  }, [searchParams, isMobile]);

  // handle sidebar toggle
  const renderSidebar = () => {
    if (!isMobile || (isMobile && !activeItem)) {
      return <Sidebar
        pageType={sidebarLabel}
        list={sortedList}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        listOpen={listOpen}
        setListOpen={setListOpen}
        pathname={pathname}
        searchParam={searchParam}
      />;
    }
  };

  return (
    <main className="list-page page subgrid">
      {renderSidebar()}

      {/* MAIN CONTENT */}
      <div className="main-content">
        {activeItem && sidebarLabel !== "Documentaries" && <Poet poet={list.find((p) => p.slug === activeItem)} />}
        {activeItem && sidebarLabel === "Documentaries" && <VideoPlayer video={list.find((d) => d.slug === activeItem)} />}
        {!activeItem && pageDetails?.pageContent && (
          <Markdown>{pageDetails.pageContent}</Markdown>
        )}
      </div>
    </main>
  );
}
