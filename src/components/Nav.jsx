"use client";

import { Link } from "next-view-transitions";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useMobile } from "../hooks/useMobile";
import { motion } from "motion/react";

import { Logo } from "./Logo";
import { RadioButton } from "./RadioButton";
import { PlusButton } from "./PlusButton";
import { SubNav } from "./SubNav";
import { Search } from "./Search";
import { useNavContext } from "@/utils/navContextProvider";
import { menuVariants, menuItemVariants } from "@/motion/menus";

export const Nav = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeItem, setActiveItem] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const [subNavOpen, setSubNavOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { navProps } = useNavContext();

  const searchDialogRef = useRef(null);
  const isMobile = useMobile();

  const menu = isMobile
    ? [
        { name: "Home", route: "/" },
        { name: "Poets", route: "/poets" },
        { name: "Interviews", route: "/interviews" },
        { name: "Series", route: "/series" },
        { name: "Documentaries", route: "/documentaries" },
        { name: "Resources", route: "/resources" },
        { name: "About", route: "/about" },
        { name: "Donate", route: "https://www.patreon.com/PoetryLA" },
        { name: "Search", route: "/search" },
      ]
    : [
        { name: "Poets", route: "/poets" },
        { name: "Interviews", route: "/interviews" },
        { name: "Series", route: "/series" },
        { name: "Documentaries", route: "/documentaries" },
        { name: "Resources", route: "/resources" },
        { name: "About", route: "/about" },
        { name: "Donate", route: "https://www.patreon.com/PoetryLA" },
        { name: "Search", route: "/search" },
      ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setNavOpen(false);
    }

    // reset active item when search param changes
    if (isMobile && navProps.searchParam) {
      setActiveItem(searchParams.get(navProps.searchParam));
      setSubNavOpen(false);
    }
  }, [pathname, isMobile, searchParams]);

  useEffect(() => {
    if (navOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }, [navOpen]);

  useEffect(() => {
    if (isMobile && activeItem) {
      document.body.classList.add("has-active-subnav");
    } else {
      document.body.classList.remove("has-active-subnav");
    }
  }, [activeItem, isMobile]);

  const openSearch = () => {
    if (searchDialogRef.current) {
      searchDialogRef.current.showModal();
      searchDialogRef.current.querySelector('input[type="search"]').focus();
    }
  };

  const closeSearch = () => {
    if (searchDialogRef.current) {
      searchDialogRef.current.close();
    }
  };

  const renderNavItem = (item) => {
    if (item.name === "Search") {
      return (
        <motion.li
          key={item.name}
          className="menu-item"
          variants={menuItemVariants}
        >
          <button className="radio-button" onClick={openSearch}>
            {item.name}
          </button>
        </motion.li>
      );
    }

    if (item.name === "Donate") {
      return (
        <motion.li
          key={item.name}
          className="menu-item"
          variants={menuItemVariants}
        >
          <a
            href={item.route}
            className="radio-button"
            target="_blank"
            rel="noreferrer"
          >
            {item.name}
          </a>
        </motion.li>
      );
    }
    return (
      <motion.li
        key={item.name}
        className="menu-item"
        variants={menuItemVariants}
      >
        <RadioButton
          label={item.name}
          ariaCurrent={pathname === item.route ? "page" : undefined}
          url={item.route}
        />
      </motion.li>
    );
  };

  if (!mounted) {
    return (
      <nav className="nav loading grid">
        <div className="subgrid"></div>
      </nav>
    );
  }

  if (isMobile) {
    return (
      <>
        <Search ref={searchDialogRef} closeSearch={closeSearch} />
        <nav
          className={`nav grid${navOpen ? " open" : ""}${
            subNavOpen && activeItem ? " subnav-open" : ""
          }`}
          aria-labelledby="main navigation"
        >
          <div className="subgrid">
            <div className="logo-wrapper" onClick={() => setNavOpen(!navOpen)}>
              <PlusButton isActive={navOpen} />
              <Logo />
            </div>
            {navOpen && (
              <motion.ul
                className="menu"
                initial="hidden"
                animate="visible"
                variants={menuVariants}
              >
                {menu.map((item, index) => renderNavItem(item, index))}
              </motion.ul>
            )}
          </div>
          {activeItem && !navOpen && (
            <SubNav
              {...navProps}
              pathname={pathname}
              activeItemSlug={activeItem}
              subNavOpen={subNavOpen}
              setSubNavOpen={setSubNavOpen}
            />
          )}
        </nav>
      </>
    );
  }

  return (
    <>
      <Search ref={searchDialogRef} closeSearch={closeSearch} />
      <nav className="nav grid" aria-labelledby="main navigation">
        <div className="subgrid">
          <Link href="/">
            <Logo />
          </Link>

          <ul className="menu">
            {menu.map((item, index) => renderNavItem(item, index))}
          </ul>
        </div>
      </nav>
    </>
  );
};
